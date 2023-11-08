using AutoMapper;
using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using DataAccessLayer.Exceptions;
using DataAccessLayer.Helpers;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace BusinessLayer.Services
{
    public class EventService : IEventService
    {

        private readonly IEventRepository _eventRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly Serilog.ILogger _logger;
        private readonly IMailService _mailService;
        private readonly IConfiguration _configuration;


        public EventService(IEventRepository eventRepository, IUserRepository userRepository, IMapper mapper, Serilog.ILogger logger, IMailService mailService, IConfiguration configuration)
        {
            _eventRepository = eventRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _logger = logger;
            _mailService = mailService;
            _configuration = configuration;
        }

        public async Task<string> CreateEventAsync(CreateEventDto newEvent)
        {
            try
            {
                var errorMessage = await ValidateCreateEventDtoAsync(newEvent);
                if (!errorMessage.IsNullOrEmpty()) throw new EventPlannerException(errorMessage);
                var eventEntity = _mapper.Map<Event>(newEvent);
                return await _eventRepository.CreateEventAsync(eventEntity);
            }
            catch (Exception ex) 
            {
                _logger.Error(ex, $"An error occurred while creating the event {newEvent.Name}");
                throw;
            }
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

        public async Task<IList<GetEventDto>> GetEventsAsync(PaginationFilter filters)
        {
            try
            {
                var eventEntities = await _eventRepository.GetEventsAsync(filters.PageNumber, filters.PageSize, filters.SearchData, filters.SportTypeId, filters.StartDate, filters.MaximumDuration, filters.Location, filters.AuthorUserId, filters.SkillLevel);
                return _mapper.Map<IList<GetEventDto>>(eventEntities);
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
            
            foreach (var participant in dto.Participants)
            {
                if (!await _userRepository.UserExistsAsync(participant.UserId))
                {
                    return $"Participant with ID {participant.UserId} does not exist.";
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
                Guid? eventPositionId = joinEventDto.EventPositionId;

                var joinResult= await _eventRepository.JoinEventAsync(userId, eventId, eventPositionId);

                var fullEvent =await _eventRepository.GetEventByIdAsync(eventId);
                if (fullEvent == null)
                {
                    _logger.Error($"Event with id {eventId} not found.");
                    throw new KeyNotFoundException("Event not found");
                }

                var authorId = fullEvent.AuthorUserId;
                var author=await _userRepository.GetUserByIdAsync(authorId);
                if (author == null)
                {
                    _logger.Error($"Author with id {authorId} not found.");
                    throw new KeyNotFoundException("Author not found");
                }

                var user =await _userRepository.GetUserByIdAsync(userId);
                if (user == null)
                {
                    _logger.Error($"User with id {userId} not found.");
                    throw new KeyNotFoundException("User not found");
                }

                var userDetails=await _userRepository.GetUserProfileDetailsAsync(userId);
                if (userDetails == null)
                {
                    _logger.Error($"User details for user id {userId} not found.");
                    throw new KeyNotFoundException("User details not found");
                }
                 
                var profileLink = $"{baseUrl}/profile/{userId}";

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
    }
}