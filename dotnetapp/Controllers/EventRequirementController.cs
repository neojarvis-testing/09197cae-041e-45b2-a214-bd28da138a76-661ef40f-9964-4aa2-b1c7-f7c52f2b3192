using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Services;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventRequirementController : ControllerBase
    {
        private readonly EventRequirementService _eventRequirementService;

        public EventRequirementController(EventRequirementService eventRequirementService)
        {
            _eventRequirementService = eventRequirementService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventRequirement>>> GetAllEventRequirements()
        {
            try
            {
                //fetching all the event requirements
                var eventRequirements = await _eventRequirementService.GetAllEventRequirementsAsync();
                return Ok(new {message = "Successfully fetched all the event requirements.", data = eventRequirements});
            }
            catch (Exception ex)
            {
                //catches the exceptions and displays the message.
                return StatusCode(500, new { message=$"Internal server error: {ex.Message}"});
            }
        }

        [HttpGet("{eventRequirementId}")]
        public async Task<ActionResult<EventRequirement>> GetEventRequirementById(int eventRequirementId)
        {
            try
            {
                //fetches the specific event requirement
                var eventRequirement = await _eventRequirementService.GetEventRequirementByIdAsync(eventRequirementId);
                if (eventRequirement == null)
                {
                    return NotFound(new {message="Event Requirement not found"});
                }
                return Ok(new {message = "Successfully fetched the event requirement.", data = eventRequirement});
            }
            catch (Exception ex)
            {
                //catches the exceptions and displays the message.
                return StatusCode(500, new {message=$"Internal server error: {ex.Message}"});
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddEventRequirement([FromBody] EventRequirement eventRequirement)
        {
            try
            {
                //Checking if the input is in valid format
                if(!ModelState.IsValid)
                {
                    return StatusCode(400, new {message = "Invalid event requirement data."});
                }

                //adding the input into the database
                var result = await _eventRequirementService.AddEventRequirementAsync(eventRequirement);
                if (result)
                {                    
                    return Ok(new {message = "Successfully added."});
                }

                //Error occured while adding the event
                return StatusCode(500, new {message = "An error occurred while adding the event requirement"});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new {message=$"Internal server error: {ex.Message}"});
            }
        }

        [HttpPut("{eventRequirementId}")]
        public async Task<ActionResult> UpdateEventRequirement(int eventRequirementId, [FromBody] EventRequirement eventRequirement)
        {
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest( new {message = "Got invalid event requirement argument"});
                }

                var result = await _eventRequirementService.UpdateEventRequirementAsync(eventRequirementId, eventRequirement);
                if (result)
                {
                    return Ok(new {message = "Event Requirement updated successfully"});
                }
                return NotFound(new {message = "Event Requirement not found"});
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{eventRequirementId}")]
        public async Task<ActionResult> DeleteEventRequirement(int eventRequirementId)
        {
            try
            {
                //deletes the event requirement
                var result = await _eventRequirementService.DeleteEventRequirementAsync(eventRequirementId);
                if (result)
                {
                    return Ok(new {message="Event Requirement deleted successfully"});
                }
                return NotFound(new {message="Event Requirement not found"});
            }
            catch (Exception ex)
            {
                //catches the exception and securely displays the error message
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
