using BusinessLayer.DTOs;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace BusinessLayer.Interfaces
{
    public interface IEventService
    {
        Task<string> CreateEventAsync(CreateEventDto newEvent);
        Task<GetEventWithDetailsDto> GetEventByIdAsync(Guid eventId);
        Task<IList<SportTypeDto>> GetAvailableSportTypesAsync();
        Task<IList<PositionDto>> GetPositionsForSportTypeAsync(Guid sportTypeId);
        Task<IList<GetEventDto>> GetEventsAsync(PaginationFilter filters);
        Task<string> UpdateEventAsync(Guid eventId, UpdateEventDto updateEventDto);
    }
}
