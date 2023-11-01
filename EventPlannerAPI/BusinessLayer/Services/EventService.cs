using AutoMapper;
using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using DataAccessLayer.Exceptions;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;

namespace BusinessLayer.Services
{
    public class EventService : IEventService
    {

        private readonly IEventRepository _eventRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly Serilog.ILogger _logger;

        public EventService(IEventRepository eventRepository, IUserRepository userRepository, IMapper mapper, Serilog.ILogger logger)
        {
            _eventRepository = eventRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<string> CreateEventAsync(CreateEventDto newEvent)
        {
            try
            {
                var errorMessage = await ValidateCreateEventDtoAsync(newEvent);
                if (errorMessage != null) throw new EventPlannerException(errorMessage);
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

        public async Task<IList<GetEventDto>> GetEventsAsync()
        {
            try
            {
                var eventEntities = await _eventRepository.GetEventsAsync();
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
                var errorMessage = await ValidateUpdateEventDtoAsync(updateEventDto);
                if (errorMessage != null) throw new EventPlannerException(errorMessage);
                var eventEntity = await _eventRepository.GetEventByIdAsync(eventId);
                _mapper.Map(updateEventDto, eventEntity);
                return await _eventRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"An error occurred while updating the event with id {eventId}");
                throw;
            }
        }

        private async Task<string> ValidateEventPositionsAsync(IEnumerable<UpsertEventPositionDto> eventPositions)
        {
            foreach (var position in eventPositions)
            {
                if (!await _eventRepository.PositionExistsAsync(position.PositionId))
                {
                    return $"Position with ID {position.PositionId} does not exist.";
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

            return await ValidateEventPositionsAsync(dto.EventPositions);
        }

        private async Task<string> ValidateUpdateEventDtoAsync(UpdateEventDto dto)
        {
            string positionValidationResult = await ValidateEventPositionsAsync(dto.EventPositions);
            if (!string.IsNullOrEmpty(positionValidationResult))
            {
                return positionValidationResult;
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
    }
}
