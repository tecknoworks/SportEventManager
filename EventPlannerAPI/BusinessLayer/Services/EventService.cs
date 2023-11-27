using AutoMapper;
using BusinessLayer.DTOs;
using BusinessLayer.Hubs;
using BusinessLayer.Interfaces;
using DataAccessLayer.Exceptions;
using DataAccessLayer.Helpers;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace BusinessLayer.Services
{
    public class EventService : IEventService
    {

        private readonly IEventRepository _eventRepository;
        private readonly IChatRepository _chatRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly Serilog.ILogger _logger;
        private readonly IMailService _mailService;
        private readonly IConfiguration _configuration;
        private readonly IHubContext<NotificationHub> _hubContext;

        public EventService(IEventRepository eventRepository, IUserRepository userRepository, IChatRepository chatRepository, IMapper mapper, Serilog.ILogger logger, IMailService mailService, IConfiguration configuration, IHubContext<NotificationHub> hubContext)
        {
            _eventRepository = eventRepository;
            _userRepository = userRepository;
            _chatRepository = chatRepository;
            _mapper = mapper;
            _logger = logger;
            _mailService = mailService;
            _configuration = configuration;
            _hubContext = hubContext;
        }

        public async Task<Guid> CreateEventAsync(CreateEventDto newEvent)
        {
            try
            {
                var errorMessage = await ValidateCreateEventDtoAsync(newEvent);
                if (!errorMessage.IsNullOrEmpty()) throw new EventPlannerException(errorMessage);

                if (newEvent.EventPositions.Count != 0)
                {
                    newEvent.MaximumParticipants = 0;
                    foreach (var eventPosition in newEvent.EventPositions)
                    {
                        newEvent.MaximumParticipants += eventPosition.AvailablePositions;
                    }
                }


                var eventEntity = _mapper.Map<Event>(newEvent);
                var result = await _eventRepository.CreateEventAsync(eventEntity);
                await LinkEventToChat(eventEntity);
                return result;
            }

            catch (Exception ex)
            {
                _logger.Error(ex, $"An error occurred while creating the event {newEvent.Name}");
                throw;
            }
        }

        private async Task<string> LinkEventToChat(Event createdEvent)
        {
            var sportType = await _eventRepository.GetEventSportTypeAsync(createdEvent.Id);
            var newChatEvent = new ChatEvent()
            {
                EventID = createdEvent.Id,
                IsClosed = false,
                Name = createdEvent.Name,
                ImageUrl = sportType.ImageUrl
            };
            return await _chatRepository.SaveChatEventAsync(newChatEvent);
        }

        public async Task<GetEventWithDetailsDto> GetEventByIdAsync(Guid eventId)
        {
            try
            {
                var eventEntity = await _eventRepository.GetEventByIdAsync(eventId);
                return _mapper.Map<GetEventWithDetailsDto>(eventEntity);
            }

            catch (Exception ex)
            {
                _logger.Error(ex, $"An error occurred while getting the event with id {eventId}");
                throw;
            }
        }

        public async Task<IList<SportTypeDto>> GetAvailableSportTypesAsync()
        {
            try
            {
                var sportTypesEntities = await _eventRepository.GetAvailableSportTypesAsync();
                return _mapper.Map<IList<SportTypeDto>>(sportTypesEntities);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"An error occurred while getting the available sport types");
                throw;
            }
        }

        public async Task<IList<PositionDto>> GetPositionsForSportTypeAsync(Guid sportTypeId)
        {

            try
            {
                var positionEntities = await _eventRepository.GetPositionsForSportTypeAsync(sportTypeId);
                return _mapper.Map<IList<PositionDto>>(positionEntities);
            }
 
            catch (Exception ex)
            {
                _logger.Error(ex, $"An error occurred while getting the available position for sport type with id {sportTypeId}");
                throw;
            }
        }

        public async Task<PaginatedResult<GetEventForBrowse>> GetEventsAsync(PaginationFilter filters)
        {
            try
            {
                var eventEntities = await _eventRepository.GetEventsAsync(filters.PageNumber, filters.PageSize, filters.SearchData, filters.SportTypeId, filters.StartDate, filters.MaximumDuration, filters.Location, filters.AuthorUserName, filters.SkillLevel, filters.AuthorId);

                return _mapper.Map<PaginatedResult<GetEventForBrowse>>(eventEntities);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "An error occurred while getting the events");
                throw;
            }
        }

        public async Task<string> UpdateEventAsync(Guid eventId, UpdateEventDto updateEventDto)
        {
            try
            {
                var eventEntity = await _eventRepository.GetEventByIdAsync(eventId);
                var errorMessage = await ValidateUpdateEventDtoAsync(eventEntity.SportTypeId, updateEventDto);
                if (!errorMessage.IsNullOrEmpty()) throw new EventPlannerException(errorMessage);
                _mapper.Map(updateEventDto, eventEntity);
                return await _eventRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"An error occurred while updating the event with id {eventId}");
                throw ex;
            }
        }

        public async Task<string> CloseEventAsync(Guid eventId)
        {
            try
            {
                var eventEntity = await _eventRepository.GetEventByIdAsync(eventId);

                if (eventEntity != null)
                {
                    eventEntity.IsClosed = true;
                    foreach (var participant in eventEntity.Participants)
                    {
                        if(participant.Status == ParticipantStatus.Accepted)
                        {
                            var baseUrl = _configuration[SolutionConfigurationConstants.FrontendBaseUrl];
                            var reviewLink = baseUrl + "/review-event?user=" + participant.User.Id + "&event=" + eventEntity.Id;
                            var mail = MailRequest.CloseEventNotification(participant.User.Email, participant.User.UserName, eventEntity.Name, reviewLink);
                            await _mailService.SendEmailAsync(mail);
                        }
                    }
                }

                var saveChanges = await _eventRepository.SaveChangesAsync();
                return saveChanges;
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"An error occurred while closing the event with id {eventId}");
                throw ex;
            }
        }

        private async Task<string> ValidateEventPositionsAsync(Guid sportTypeId, IEnumerable<UpsertEventPositionDto> eventPositions)
        {
            foreach (var position in eventPositions)
            {
                if (!await _eventRepository.PositionExistsAsync(position.PositionId))
                {
                    return $"Position with ID {position.PositionId} does not exist.";
                }

                if (!await _eventRepository.PositionBelongsToSportTypeAsync(position.PositionId, sportTypeId))
                {
                    return $"Position with ID {position.PositionId} does not belong to the sport type with ID {sportTypeId}.";
                }
            }

            return string.Empty;
        }

        private async Task<string> ValidateCreateEventDtoAsync(CreateEventDto dto)
        {
            if (!await _userRepository.UserExistsAsync(dto.AuthorUserId))
            {
                return $"User with ID {dto.AuthorUserId} does not exist.";
            }

            if (!await _eventRepository.SportTypeExistsAsync(dto.SportTypeId))
            {
                return $"SportType with ID {dto.SportTypeId} does not exist.";
            }


            if (!dto.EventPositions.IsNullOrEmpty())
            {
                return await ValidateEventPositionsAsync(dto.SportTypeId, dto.EventPositions);
            }
            return string.Empty;
        }

        public async Task<string> ValidateReview(PostReviewDto postReview)
        {
            if (!await _userRepository.UserExistsAsync(postReview.AuthorUserId))
            {
                return $"Author with ID {postReview.AuthorUserId} does not exist.";
            }

            if (!await _userRepository.UserExistsAsync(postReview.UserId))
            {
                return $"SportType with ID {postReview.UserId} does not exist.";
            }

            return string.Empty;
        }

        private async Task<string> ValidateUpdateEventDtoAsync(Guid sportTypeId, UpdateEventDto dto)
        {
            if (!dto.EventPositions.IsNullOrEmpty())
            {
                string positionValidationResult = await ValidateEventPositionsAsync(sportTypeId, dto.EventPositions);

                if (!string.IsNullOrEmpty(positionValidationResult))
                {
                    return positionValidationResult;
                }
            }

            return string.Empty;
        }

        public async Task<string> JoinEvent(JoinEventDto joinEventDto)
        {
            var baseUrl = _configuration[SolutionConfigurationConstants.FrontendBaseUrl];
            try
            {
                string userId = joinEventDto.UserId;
                Guid eventId = joinEventDto.EventId;
                Guid? eventPositionId = await _eventRepository.GetEventPositionIdForEvent(joinEventDto.EventId, joinEventDto.EventPositionId);

                var fullEvent = await _eventRepository.GetEventByIdAsync(eventId);
                if (fullEvent == null)
                {
                    _logger.Error($"Event with id {eventId} not found.");
                    throw new KeyNotFoundException("Event not found");
                }

                var authorId = fullEvent.AuthorUserId;
                var author = await _userRepository.GetUserByIdAsync(authorId);
                if (author == null)
                {
                    _logger.Error($"Author with id {authorId} not found.");
                    throw new KeyNotFoundException("Author not found");
                }

                var user = await _userRepository.GetUserByIdAsync(userId);
                if (user == null)
                {
                    _logger.Error($"User with id {userId} not found.");
                    throw new KeyNotFoundException("User not found");
                }

                var userDetails = await _userRepository.GetUserProfileDetailsAsync(userId);
                if (userDetails == null)
                {
                    _logger.Error($"User details for user id {userId} not found.");
                    throw new KeyNotFoundException("User details not found");
                }

                var profileLink = $"{baseUrl}/profile/{userId}";

                var joinResult = await _eventRepository.JoinEventAsync(userId, eventId, eventPositionId);

                var mail = MailRequest.JoinEventNotification(author.Email, user.UserName, userDetails.ProfilePhoto, profileLink);
                await _mailService.SendEmailAsync(mail);
                return joinResult;
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"An error occurred while joining the event");
                throw;
            }
        }

        public async Task<string> ChangeUserStatusAsync(UpdatedParticipant updatedParticipant)
        {
            var baseUrl = _configuration[SolutionConfigurationConstants.FrontendBaseUrl];
            try
            {

                var evnt = await _eventRepository.GetEventByIdAsync(updatedParticipant.EventId);
                if (evnt == null)
                {
                    _logger.Error($"Event with id {updatedParticipant.EventId} not found.");
                    throw new KeyNotFoundException("Event not found");
                }

                var user = await _userRepository.GetUserByIdAsync(updatedParticipant.UserId);
                if (user == null)
                {
                    _logger.Error($"User with id {updatedParticipant.UserId} not found.");
                    throw new KeyNotFoundException("User not found");
                }

                var userDetails = await _userRepository.GetUserProfileDetailsAsync(updatedParticipant.UserId);
                if (userDetails == null)
                {
                    _logger.Error($"User details for user id {updatedParticipant.UserId} not found.");
                    throw new KeyNotFoundException("User details not found");
                }

                var participants = evnt.Participants.Where(participant => participant.Status == ParticipantStatus.Accepted).ToList();

                var participantEntity = await _eventRepository.GetParticipant(updatedParticipant.EventId, updatedParticipant.UserId);
                _mapper.Map(updatedParticipant, participantEntity);
                

                var profileLink = $"{baseUrl}/profile/{user.Id}";

                if(updatedParticipant.Status == ParticipantStatus.Accepted)
                {
                    foreach (var participant in participants)
                    {
                        var participantData = await _userRepository.GetUserByIdAsync(participant.UserId);
                        if (participantData == null)
                        {
                            _logger.Error($"User with id {participantData.Id} not found.");
                            throw new KeyNotFoundException("User not found");
                        }

                        var mail = MailRequest.AcceptedToEventNotification(participantData.Email, participantData.UserName, user.UserName, evnt.Name, userDetails.ProfilePhoto, profileLink);
                        await _mailService.SendEmailAsync(mail);
                    }

                    await _hubContext.Clients.Group(evnt.Id.ToString().ToUpper()).SendAsync("ReceiveNotification", $"User {user.UserName} has joined the event {evnt.Name}!");
                }

                return await _eventRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"An error occurred while changing the user status");
                throw;
            }
        }

        public async Task<string> DeleteParticipantAsync(string userId, Guid eventId)
        {
            try
            {
                return await _eventRepository.DeleteParticipantAsync(userId, eventId);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"An error occurred while deleting the participant");
                throw;
            }
        }

        public async Task<string> PostReviewAsync(PostReviewDto postReview)
        {
            try
            {
                var errorMessage = await ValidateReview(postReview);
                if (!errorMessage.IsNullOrEmpty()) throw new EventPlannerException(errorMessage);
                var review = new Review
                {
                    Id = Guid.NewGuid(),
                    AuthorUserId = postReview.AuthorUserId,
                    UserId = postReview.UserId,
                    Rating = postReview.Rating,
                };

                if (!string.IsNullOrEmpty(postReview.Comment))
                {
                    review.Comment = new Comment
                    {
                        Id = Guid.NewGuid(),
                        Message = postReview.Comment
                    };
                }

                var result = await _eventRepository.PostReviewAsync(review);
                return result;
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"An error occurred while deleting the participant");
                throw;
            }
        }
    }
}