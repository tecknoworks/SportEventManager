using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace DataAccessLayer.Interfaces
{
    public interface IEventRepository
    {
        Task<string> CreateEventAsync(Event newEvent);
        Task<Event> GetEventByIdAsync(Guid eventId);
        Task<IList<SportType>> GetAvailableSportTypesAsync();
        Task<IList<Position>> GetPositionsForSportTypeAsync(Guid sportTypeId);
        Task<PaginatedResult<Event>> GetEventsAsync(int pageNumber, int pageSize, string searchData, Guid sportTypeId, DateTime startDate, double maximumDuration, string location, string authorUser, int skillLevel);
        Task<string> SaveChangesAsync();
        Task<bool> PositionExistsAsync(Guid positionId);
        Task<bool> SportTypeExistsAsync(Guid sportTypeId);
        Task<bool> PositionBelongsToSportTypeAsync(Guid positionId, Guid sportTypeId);
        Task<string> JoinEventAsync(string userId, Guid eventId, Guid? eventPositionId);
    }
}
