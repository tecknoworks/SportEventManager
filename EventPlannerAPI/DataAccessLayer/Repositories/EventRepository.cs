using DataAccessLayer.Contexts;
using DataAccessLayer.Exceptions;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task<IList<Event>> GetEventsAsync()
        {
            return await _eventPlannerContext.Events
                .Include(evnt => evnt.SportType)
                .Include(evnt => evnt.Author)
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
    }
}
