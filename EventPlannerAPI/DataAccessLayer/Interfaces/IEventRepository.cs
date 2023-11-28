using DataAccessLayer.Models;

namespace DataAccessLayer.Interfaces
{
    public interface IEventRepository
    {
        Task<Guid> CreateEventAsync(Event newEvent);
        Task<Event> GetEventByIdAsync(Guid eventId);
        Task<IList<SportType>> GetAvailableSportTypesAsync();
        Task<IList<Position>> GetPositionsForSportTypeAsync(Guid sportTypeId);
        Task<PaginatedResult<Event>> GetEventsAsync(int pageNumber, int pageSize, string searchData, Guid sportTypeId, DateTime startDate, double maximumDuration, string location, string authorUser, int skillLevel, string authorId);
        Task<string> SaveChangesAsync();
        Task<bool> PositionExistsAsync(Guid positionId);
        Task<bool> SportTypeExistsAsync(Guid sportTypeId);
        Task<bool> PositionBelongsToSportTypeAsync(Guid positionId, Guid sportTypeId);
        Task<string> JoinEventAsync(string userId, Guid eventId, Guid? eventPositionId);
        Task<SportType?> GetEventSportTypeAsync(Guid eventId);
        Task<Participant> GetParticipant(Guid eventId, string userId);
        Task<string> DeleteParticipantAsync(string userId, Guid eventId);
        Task <string> PostReviewAsync(Review review);
        Task<IList<Guid>> GetUserCreatedOrJoinedEvents(string userId);
        Task<Guid> GetEventPositionIdForEvent(Guid eventId, Guid? positionId);
    }
}
