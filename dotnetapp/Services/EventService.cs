using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public class EventService
    {
        private readonly ApplicationDbContext _context;

        // Constructor
        public EventService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Retrieve all events
        public async Task<IEnumerable<Event>> GetAllEvents()
        {
            return await _context.Events.ToListAsync();
        }

        // Retrieve event by ID
        public async Task<Event> GetEventById(int eventId)
        {
            return await _context.Events.FindAsync(eventId);
        }

        // Add a new event
        public async Task AddEvent(Event eventItem)
        {
            _context.Events.Add(eventItem);
            await _context.SaveChangesAsync();
        }

        // Update an existing event
        public async Task<bool> UpdateEvent(int eventId, Event eventItem)
        {
            var existingEvent = await _context.Events.FindAsync(eventId);
            if (existingEvent == null)
            {
                return false;
            }

            // Update fields
            existingEvent.Title = eventItem.Title;
            existingEvent.Description = eventItem.Description;
            existingEvent.Location = eventItem.Location;
            existingEvent.Date = eventItem.Date;
            existingEvent.OrganizerName = eventItem.OrganizerName;
            existingEvent.ContactInfo = eventItem.ContactInfo;
            existingEvent.PostedDate = eventItem.PostedDate;
            existingEvent.Status = eventItem.Status;

            await _context.SaveChangesAsync();
            return true;
        }

        // Delete an event
        public async Task<bool> DeleteEvent(int eventId)
        {
            var eventToDelete = await _context.Events.FindAsync(eventId);
            if (eventToDelete == null)
            {
                return false;
            }

            _context.Events.Remove(eventToDelete);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}


