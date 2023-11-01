using BusinessLayer.DTOs;
using DataAccessLayer.Models;

namespace BusinessLayer.Interfaces
{
    public interface IEventService
    {
        Task<string> CreateEventAsync(CreateEventDto newEvent);
        Task<GetEventWithDetailsDto> GetEventByIdAsync(Guid eventId);
        Task<IList<SportTypeDto>> GetAvailableSportTypesAsync();
        Task<IList<PositionDto>> GetPositionsForSportTypeAsync(Guid sportTypeId);
        Task<IList<GetEventDto>> GetEventsAsync();
        Task<string> UpdateEventAsync(Guid eventId, UpdateEventDto updateEventDto);
    }
}
