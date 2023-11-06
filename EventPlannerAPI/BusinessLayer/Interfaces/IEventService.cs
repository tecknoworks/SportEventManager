using BusinessLayer.DTOs;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace BusinessLayer.Interfaces
{
    public interface IEventService
    {
        Task<string> CreateEventAsync(CreateEventDto newEvent);
        Task<GetEventWithDetailsDto> GetEventByIdAsync(Guid eventId);
        Task<IList<GetEventDto>> GetPagedEventsAsyncLogic(PaginationFilter filters);
        Task<IList<SportTypeDto>> GetAvailableSportTypesAsync();
        Task<IList<PositionDto>> GetPositionsForSportTypeAsync(Guid sportTypeId);
        Task<IList<GetEventDto>> GetEventsAsync();
        Task<string> UpdateEventAsync(Guid eventId, UpdateEventDto updateEventDto);
    }
}
