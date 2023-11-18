using BusinessLayer.DTOs;
using DataAccessLayer.Helpers;
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
        Task<PaginatedResult<GetEventForBrowse>> GetEventsAsync(PaginationFilter filters);
        Task<string> UpdateEventAsync(Guid eventId, UpdateEventDto updateEventDto);
        Task<string> JoinEvent(JoinEventDto joinEventDto);
        Task<string> ChangeUserStatusAsync(UpdatedParticipant updatedParticipant);
        Task<string> DeleteParticipantAsync(string userId, Guid eventId);
        Task<double> GetAverageRatingForUserAsync(string userId);
    }
}
