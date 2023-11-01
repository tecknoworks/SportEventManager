using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using DataAccessLayer.Exceptions;
using Microsoft.AspNetCore.Mvc;

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


        [HttpGet("GetEvents")]
        public async Task<ActionResult<IList<GetEventDto>>> GetEvents()
        {
            try
            {
                return Ok(await _eventService.GetEventsAsync());
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

        [HttpPost("CreateEvent")]
        public async Task<ActionResult> CreateEvent([FromBody] CreateEventDto newEventDto)
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

        [HttpPut("UpdateEvent/{eventId}")]
        public async Task<ActionResult> UpdateEvent(Guid eventId, [FromBody] UpdateEventDto updateEventDto)
        {
            try
            {
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
    }
}
