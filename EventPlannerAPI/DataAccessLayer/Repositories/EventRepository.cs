using DataAccessLayer.Contexts;
using DataAccessLayer.Exceptions;
using DataAccessLayer.Helpers;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DataAccessLayer.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly EventPlannerContext _eventPlannerContext;

        public EventRepository(EventPlannerContext eventPlannerContext)
        {
            _eventPlannerContext = eventPlannerContext;
        }

        public async Task<string> CreateEventAsync(Event newEvent)
        {
            _eventPlannerContext.Events.Add(newEvent);
            await _eventPlannerContext.SaveChangesAsync();
            return "Event was created successfuly.";
        }

        public async Task<Event> GetEventByIdAsync(Guid eventId)
        {
            var eventEntity = await _eventPlannerContext.Events
                .Include(evnt => evnt.Participants)
                .Include(evnt => evnt.SportType)
                .Include(evnt => evnt.Author)
                .Include(evnt => evnt.EventPositions)
                .ThenInclude(ep => ep.Position)
                .FirstOrDefaultAsync(evnt => evnt.Id == eventId);

            if (eventEntity == null)
            {
                throw new EventPlannerException($"Event with id {eventId} does not exist.");
            }
            return eventEntity;
        }

        public async Task<IList<Event>> GetEventsAsync(int pageNumber, int pageSize, string searchData, Guid sportTypeId, DateTime startDate, double maximumDuration, string location, string authorUserId, int skillLevel)
        {
            return await _eventPlannerContext.Events
                .Include(evnt => evnt.SportType)
                .Include(evnt => evnt.Author)
                .Where(evnt =>
                    (string.IsNullOrEmpty(searchData) || evnt.Name.Contains(searchData) || evnt.Description.Contains(searchData)) &&
                    (sportTypeId == Guid.Empty || evnt.SportTypeId == sportTypeId) &&
                    (startDate == DateTime.MinValue || evnt.StartDate >= startDate) &&
                    ((maximumDuration <= 0) || (evnt.EndDate - evnt.StartDate).TotalHours <= maximumDuration) &&
                    (string.IsNullOrEmpty(location) || evnt.Location.Contains(location)) &&
                    (string.IsNullOrEmpty(authorUserId) || evnt.Author.Id == authorUserId) &&
                    evnt.SkillLevel == skillLevel) 
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }


        public async Task<IList<SportType>> GetAvailableSportTypesAsync()
        {
            return await _eventPlannerContext.SportTypes.ToListAsync();
        }

        public async Task<IList<Position>> GetPositionsForSportTypeAsync(Guid sportTypeId)
        {
            return await _eventPlannerContext.Positions.Where(position => position.SportTypeId == sportTypeId).ToListAsync();
        }

        public async Task<string> SaveChangesAsync()
        {
            await _eventPlannerContext.SaveChangesAsync();
            return "Changes saved to the database";
        }

        public async Task<bool> PositionExistsAsync(Guid positionId)
        {
            return await _eventPlannerContext.Positions.AnyAsync(position => position.Id == positionId);
        }
        public async Task<bool> SportTypeExistsAsync(Guid sportTypeId)
        {
            return await _eventPlannerContext.SportTypes.AnyAsync(sportType => sportType.Id == sportTypeId);
        }
        public async Task<bool> PositionBelongsToSportTypeAsync(Guid positionId, Guid sportTypeId)
        {
            return await _eventPlannerContext.Positions.AnyAsync(p => p.Id == positionId && p.SportTypeId == sportTypeId);
        }

        public async Task<string> JoinEventAsync(string userId, Guid eventId, Guid? eventPositionId)
        {
            var participant = new Participant()
            {
                EventId = eventId,
                UserId = userId,
                Status = ParticipantStatus.Pending,
                EventPositionId = eventPositionId
            };


            try
            {
                participant.User = await _eventPlannerContext.Users.FirstOrDefaultAsync(user => user.Id == userId);
                participant.EventPosition = await _eventPlannerContext.EventPositions.FirstOrDefaultAsync(x => x.Id == eventPositionId);
                participant.Event = await _eventPlannerContext.Events.FirstOrDefaultAsync(x => x.Id == eventId);


                var eventPosition = eventPositionId.HasValue
                                    ? await _eventPlannerContext.EventPositions.FirstOrDefaultAsync(x => x.Id == eventPositionId.Value)
                                    : null;

                if (eventPosition != null && eventPosition.AvailablePositions > 0)
                {
                    eventPosition.AvailablePositions -= 1;
                }
                else
                {
                    throw new EventPlannerException("No available positions.");
                }
                await _eventPlannerContext.Participants.AddAsync(participant);
                await _eventPlannerContext.SaveChangesAsync();


            }
            catch (Exception ex)
            {
                throw;
            };

            return "User joined the event successfully.";
        }
    }
}
