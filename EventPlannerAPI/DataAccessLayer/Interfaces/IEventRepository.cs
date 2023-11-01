using DataAccessLayer.Models;

namespace DataAccessLayer.Interfaces
{
    public interface IEventRepository
    {
        Task<string> CreateEventAsync(Event newEvent);
        Task<Event> GetEventByIdAsync(Guid eventId);
        Task<IList<SportType>> GetAvailableSportTypesAsync();
        Task<IList<Position>> GetPositionsForSportTypeAsync(Guid sportTypeId);
        Task<IList<Event>> GetEventsAsync();
        Task<string> SaveChangesAsync();
        Task<bool> PositionExistsAsync(Guid positionId);
    }
}
