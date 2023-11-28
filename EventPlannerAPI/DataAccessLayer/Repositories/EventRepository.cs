using DataAccessLayer.Contexts;
using DataAccessLayer.Exceptions;
using DataAccessLayer.Helpers;
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

        public async Task<Guid> CreateEventAsync(Event newEvent)
        {
            _eventPlannerContext.Events.Add(newEvent);
            await _eventPlannerContext.SaveChangesAsync();
            return newEvent.Id;
        }

        public async Task<string> PostReviewAsync(Review review)
        {
            _eventPlannerContext.Reviews.Add(review);
            await _eventPlannerContext.SaveChangesAsync();
            return "Review was added successfuly.";
        }

        public async Task<Event> GetEventByIdAsync(Guid eventId)
        {
            var eventEntity = await _eventPlannerContext.Events
                .Include(evnt => evnt.Participants)
                    .ThenInclude(participant => participant.User)
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

        public async Task<PaginatedResult<Event>> GetEventsAsync(int pageNumber, int pageSize, string searchData, Guid sportTypeId, DateTime startDate, double maximumDuration, string location, string authorUserName, int skillLevel, string authorId)
        {
            var query = (IQueryable<Event>)_eventPlannerContext.Events
                .Include(evnt => evnt.SportType)
                .Include(evnt => evnt.Author)
                .Include(evnt => evnt.EventPositions)
                    .ThenInclude(ep => ep.Position)
                .Include(evnt => evnt.Participants)
                         .ThenInclude(part => part.User)
                            .ThenInclude(user => user.Profile);

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

            if(!string.IsNullOrEmpty(authorId))
            {
                query = query.Where(evnt => evnt.AuthorUserId ==  authorId);
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

        public async Task<string> JoinEventAsync(string userId, Guid eventId, Guid? eventPositionId)
        {
            var existingParticipant = await _eventPlannerContext.Participants
                .AnyAsync(p => p.UserId == userId && p.EventId == eventId);

            if (existingParticipant)
            {
                throw new EventPlannerException($"You already joined this event.");
            }

            var participant = new Participant()
            {
                EventId = eventId,
                UserId = userId,
                Status = ParticipantStatus.Pending,
                EventPositionId = eventPositionId == Guid.Empty ? null : eventPositionId
            };

            try
            {
                participant.User = await _eventPlannerContext.Users.FirstOrDefaultAsync(user => user.Id == userId);
                if (eventPositionId.HasValue && eventPositionId.Value != Guid.Empty)
                {
                    participant.EventPosition = await _eventPlannerContext.EventPositions.FirstOrDefaultAsync(x => x.Id == eventPositionId.Value);
                }
                participant.Event = await _eventPlannerContext.Events.FirstOrDefaultAsync(x => x.Id == eventId);

                var eventPosition = eventPositionId.HasValue
                                    ? await _eventPlannerContext.EventPositions.FirstOrDefaultAsync(x => x.Id == eventPositionId.Value)
                                    : null;

                if (eventPosition == null) {
                    participant.Event.MaximumParticipants -= 1;
                }
                else if (eventPosition != null && eventPosition.AvailablePositions > 0 && participant.Event.MaximumParticipants > 0)
                {
                    eventPosition.AvailablePositions -= 1;
                    participant.Event.MaximumParticipants -= 1;
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
            return await Task.FromResult("User joined the event successfully.");
        }

        public async Task<Participant> GetParticipant(Guid eventId, string userId)
        {

            var participantEntity = await _eventPlannerContext.Participants
                .Where(participant => participant.UserId == userId)
                .FirstOrDefaultAsync(participant => participant.EventId == eventId);

            if (participantEntity == null)
            {
                throw new EventPlannerException($"Participant with user id {userId} and event id {eventId} does not exist.");
            }
            return participantEntity;
        }

        public async Task<string> DeleteParticipantAsync(string userId, Guid eventId)
        {
            var participantEntity = await _eventPlannerContext.Participants
               .Where(participant => participant.UserId == userId)
               .FirstOrDefaultAsync(participant => participant.EventId == eventId);

            if (participantEntity == null)
            {
                throw new EventPlannerException($"Participant with user id {userId} and event id {eventId} does not exist.");
            }

            var currentEvent = await GetEventByIdAsync(eventId);

            if (participantEntity.Event.SportType.HasPositions)
            {
                var currentPositionOccupied = currentEvent.EventPositions.FirstOrDefault(position => position.Id == participantEntity.EventPositionId);
                currentPositionOccupied.AvailablePositions += 1;
            }

            currentEvent.MaximumParticipants += 1;

            _eventPlannerContext.Participants.Remove(participantEntity);
            await _eventPlannerContext.SaveChangesAsync();
            return "Participant deleted successfully";
        }

        public async Task<SportType?> GetEventSportTypeAsync(Guid eventId)
        {
            return await _eventPlannerContext.Events
                        .Where(evnt => evnt.Id == eventId)
                        .Include(evnt => evnt.SportType)
                        .Select(evnt => evnt.SportType)
                        .FirstOrDefaultAsync();
        }

        public async Task<Guid> GetEventPositionIdForEvent(Guid eventId, Guid? positionId)
        {
            return await _eventPlannerContext.EventPositions
                    .Where(ep => ep.EventId == eventId && ep.PositionId == positionId)
                    .Select(ep => ep.Id)
                    .FirstOrDefaultAsync();
        }
        public async Task<IList<Guid>> GetUserCreatedOrJoinedEvents(string userId)
        {
            var joined = await _eventPlannerContext.Participants
                    .Where(participant => participant.UserId == userId && participant.Status == ParticipantStatus.Accepted)
                    .Select(participant => participant.EventId)
                    .ToListAsync();

            var createdEventIds = await _eventPlannerContext.Users
                .Where(user => user.Id == userId)
                .SelectMany(user => user.Events.Select(eventItem => eventItem.Id))
                .ToListAsync();

            var result = joined.Union(createdEventIds).ToList();
            return result;
        }     }
}