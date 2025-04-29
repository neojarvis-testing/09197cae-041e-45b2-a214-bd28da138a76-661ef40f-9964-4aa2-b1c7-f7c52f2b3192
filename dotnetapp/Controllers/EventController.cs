using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly EventService _eventService;

        // Constructor
        public EventController(EventService eventService)
        {
            _eventService = eventService;
        }

        // Retrieve all events
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetAllEvents()
        {
            var events = await _eventService.GetAllEvents();
            return Ok(events);
        }

        // Retrieve event by ID
        [HttpGet("{eventId}")]
        public async Task<ActionResult<Event>> GetEventById(int eventId)
        {
            var eventItem = await _eventService.GetEventById(eventId);
            if (eventItem == null)
            {
                return NotFound("Event not found");
            }
            return Ok(eventItem);
        }

        // Add a new event
        [HttpPost]
        public async Task<ActionResult> AddEvent([FromBody] Event eventItem)
        {
            try
            {
                await _eventService.AddEvent(eventItem);
                return Ok("Event added successfully");
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Update an existing event
        [HttpPut("{eventId}")]
        public async Task<ActionResult> UpdateEvent(int eventId, [FromBody] Event eventItem)
        {
            try
            {
                var result = await _eventService.UpdateEvent(eventId, eventItem);
                if (!result)
                {
                    return NotFound("Event not found");
                }
                return Ok("Event updated successfully");
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Delete an event
        [HttpDelete("{eventId}")]
        public async Task<ActionResult> DeleteEvent(int eventId)
        {
            try
            {
                var result = await _eventService.DeleteEvent(eventId);
                if (!result)
                {
                    return NotFound("Event not found");
                }
                return Ok("Event deleted successfully");
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
