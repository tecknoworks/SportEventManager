using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace DataAccessLayer.Interfaces
{
    public interface IEventRepository
    {
        Task<string> CreateEventAsync(Event newEvent);
        Task<Event> GetEventByIdAsync(Guid eventId);
        Task<IList<Event>> GetPagedEventsAsync(int pageSize, int pageNumber);
        Task<IList<SportType>> GetAvailableSportTypesAsync();
        Task<IList<Position>> GetPositionsForSportTypeAsync(Guid sportTypeId);
        Task<IList<Event>> GetEventsAsync();
        Task<string> SaveChangesAsync();
        Task<bool> PositionExistsAsync(Guid positionId);
        Task<bool> SportTypeExistsAsync(Guid sportTypeId);
        Task<bool> PositionBelongsToSportTypeAsync(Guid positionId, Guid sportTypeId);
    }
}
