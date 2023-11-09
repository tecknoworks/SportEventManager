using DataAccessLayer.Contexts;
using DataAccessLayer.Exceptions;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System.Data.Entity.Core.Objects;

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

        public async Task<PaginatedResult<Event>> GetEventsAsync(int pageNumber, int pageSize, string searchData, Guid sportTypeId, DateTime startDate, double maximumDuration, string location, string authorUserName, int skillLevel)
        {
            var query = (IQueryable<Event>)_eventPlannerContext.Events
                .Include(evnt => evnt.SportType)
                .Include(evnt => evnt.Author);

            if (!string.IsNullOrEmpty(searchData))
            {
                query = query.Where(evnt => evnt.Name.Contains(searchData) || evnt.Description.Contains(searchData));
            }

            if (sportTypeId != Guid.Empty)
            {
                query = query.Where(evnt => evnt.SportTypeId == sportTypeId);
            }

            if (startDate != DateTime.MinValue)
            {
                query = query.Where(evnt => evnt.StartDate >= startDate);
            }

            if (maximumDuration > 0)
            {
                var x = Int32.Parse(maximumDuration.ToString());
                query = query.Where(evnt => evnt.EndDate <= evnt.StartDate.AddHours(x));
            }

            if (!string.IsNullOrEmpty(location))
            {
                query = query.Where(evnt => evnt.LocationName.Contains(location));
            }

            if (!string.IsNullOrEmpty(authorUserName))
            {
                query = query.Where(evnt => evnt.Author.UserName.Contains(authorUserName));
            }

            if (skillLevel != 0)
            {
                query = query.Where(evnt => evnt.SkillLevel == skillLevel);
            }

            var totalEvents = await query.CountAsync();

            var paginatedEvents = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PaginatedResult<Event>
            {
                TotalEvents = totalEvents,
                Events = paginatedEvents
            };
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
