using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using DataAccessLayer.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DataAccessLayer.Helpers;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using DataAccessLayer.Models;

namespace EventPlannerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [HttpPost("GetEvents")]
        public async Task<ActionResult<PaginatedResult<GetEventForBrowse>>> GetEvents([FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Allow)] PaginationFilter filters)
        {
            try
            {
                return Ok(await _eventService.GetEventsAsync(filters));
            }
            catch (EventPlannerException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return Problem("Something went wrong.");
            }
        }

        [HttpGet("GetEvent/{eventId}")]
        public async Task<ActionResult<GetEventWithDetailsDto>> GetEventById(Guid eventId)
        {
            try
            {
                return Ok(await _eventService.GetEventByIdAsync(eventId));
            }
            catch (EventPlannerException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return Problem("Something went wrong.");
            }
        }

        [HttpGet("GetAvailableSportTypes")]
        public async Task<ActionResult<IList<SportTypeDto>>> GetAvailableSportTypes()
        {
            try
            {
                return Ok(await _eventService.GetAvailableSportTypesAsync());
            }
            catch (EventPlannerException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return Problem("Something went wrong.");
            }
        }

        [HttpGet("GetPositionsForSportType/{sportTypeId}")]
        public async Task<ActionResult<IList<PositionDto>>> GetPositionsForSportType(Guid sportTypeId)
        {
            try
            {
                return Ok(await _eventService.GetPositionsForSportTypeAsync(sportTypeId));
            }
            catch (EventPlannerException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return Problem("Something went wrong.");
            }
        }

        [Authorize]
        [HttpPost("CreateEvent")]
        public async Task<ActionResult<Guid>> CreateEvent([FromBody] CreateEventDto newEventDto)
        {
            try
            {
                return Ok(await _eventService.CreateEventAsync(newEventDto));
            }
            catch (EventPlannerException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return Problem("Something went wrong.");
            }
        }

        [Authorize]
        [HttpPut("UpdateEvent/{eventId}")]
        public async Task<ActionResult> UpdateEvent(Guid eventId, [FromBody] UpdateEventDto updateEventDto)
        {
            try
            {
                var currentUserId = HttpContext.User.FindFirstValue(SolutionConfigurationConstants.JwtIdClaim);
                var eventToUpdate = await _eventService.GetEventByIdAsync(eventId);

                if (eventToUpdate.AuthorUserId != currentUserId)
                {
                    return StatusCode(StatusCodes.Status403Forbidden, "Only the creator can update the event.");
                }

                return Ok(await _eventService.UpdateEventAsync(eventId, updateEventDto));
            }
            catch (EventPlannerException ex)
            {
                return BadRequest(ex.Message);  
            }
            catch (Exception)
            {
                return Problem("Something went wrong.");
            }
        }

        [Authorize]
        [HttpPost("CloseEvent")]
        public async Task<ActionResult> CloseEvent([FromBody] CloseEventDto closeEventDto)
        {
            try
            {
                var currentUserId = HttpContext.User.FindFirstValue(SolutionConfigurationConstants.JwtIdClaim);
                var eventToUpdate = await _eventService.GetEventByIdAsync(closeEventDto.EventId);

                if (eventToUpdate.AuthorUserId != currentUserId)
                {
                    return StatusCode(StatusCodes.Status403Forbidden, "Only the creator can update the event.");
                }

                return Ok(await _eventService.CloseEventAsync(closeEventDto.EventId));
            }
            catch (EventPlannerException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return Problem("Something went wrong.");
            }
        }

        [Authorize]
        [HttpPost("JoinEvent")]
        public async Task<ActionResult> JoinEvent([FromBody] JoinEventDto joinEventDto)
        {
            try
            {
                var response = await _eventService.JoinEvent(joinEventDto);
                return Ok(response);
            }
            catch (EventPlannerException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return Problem("An unexpected error occurred.");
            }
        }

        [Authorize]
        [HttpPost("ChangeUserStatus")]
        public async Task<ActionResult> ChangeUserStatus([FromBody] UpdatedParticipant updatedParticipant)
        {
            try
            {
                var response = await _eventService.ChangeUserStatusAsync(updatedParticipant);
                return Ok(response);
            }
            catch (EventPlannerException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return Problem("An unexpected error occurred.");
            }
        }

        [Authorize]
        [HttpDelete("DeleteParticipant")]
        public async Task<ActionResult> DeleteParticipant(string userId, Guid eventId)
        {
            try
            {
                var response = await _eventService.DeleteParticipantAsync(userId, eventId);
                return Ok(response);
            }
            catch (EventPlannerException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return Problem("An unexpected error occurred.");
            }
        }

        [Authorize]
        [HttpPost("PostReview")]
        public async Task<ActionResult> PostReview([FromBody] PostReviewDto postReview)
        {
            try
            {
                var response = await _eventService.PostReviewAsync(postReview);
                return Ok(response);
            }
            catch (EventPlannerException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return Problem("An unexpected error occurred.");
            }
        }
    }
}