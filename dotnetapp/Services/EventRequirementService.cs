using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models.EventRequirement;

namespace dotnetapp.Services
{
    public class EventRequirementService
    {
        private readonly ApplicationDbContext _context;

        public EventRequirementService(ApplicationDbContext context, ILogger<EventRequirementService> logger)
        {
            _context = context;
        }

        // Get all event requirements
        public async Task<IEnumerable<EventRequirement>> GetAllEventRequirementsAsync()
        {
            return await _context.EventRequirements.ToListAsync();
        }

        // Get event requirement by ID
        public async Task<EventRequirement> GetEventRequirementByIdAsync(int eventRequirementId)
        {
            return await _context.EventRequirements.FindAsync(eventRequirementId);
        }

        // Add new event requirement
        public async Task<bool> AddEventRequirementAsync(EventRequirement eventRequirement)
        {
            if (eventRequirement == null)
            {
                return false;
            }
            await _context.EventRequirements.AddAsync(eventRequirement);
            await _context.SaveChangesAsync();
            return true;
        }

        // Update existing event requirement
        public async Task<bool> UpdateEventRequirementAsync(int eventRequirementId, EventRequirement updatedRequirement)
        {
            var existingRequirement = await _context.EventRequirements.FindAsync(eventRequirementId);
            if (existingRequirement == null)
            {
                return false;
            } 

            existingRequirement.Title = updatedRequirement.Title;
            existingRequirement.Description = updatedRequirement.Description;
            existingRequirement.Location = updatedRequirement.Location;
            existingRequirement.Date = updatedRequirement.Date;
            existingRequirement.PostedDate = updatedRequirement.PostedDate;
            existingRequirement.Status = updatedRequirement.Status;

            await _context.SaveChangesAsync();
            return true;
        }

        // Delete event requirement by ID
        public async Task<bool> DeleteEventRequirementAsync(int eventRequirementId)
        {
            var existingRequirement = await _context.EventRequirements.FindAsync(eventRequirementId);
            if (existingRequirement == null)
            {
                return false;
            } 

            _context.EventRequirements.Remove(existingRequirement);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}