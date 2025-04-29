using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Data;
using dotnetapp.Exceptions;

namespace dotnetapp.Services
{
    public class EventRequirementService 
    {
        private readonly ApplicationDbContext _context;

        public EventRequirementService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get all event requirements
        public async Task<IEnumerable<EventRequirement>> GetAllEventRequirements()
        {
            return await _context.EventRequirements.ToListAsync();
        }

        // Get event requirement by ID
        public async Task<EventRequirement> GetEventRequirementById(int eventRequirementId)
        {
            return await _context.EventRequirements.FindAsync(eventRequirementId);
        }

        // Add new event requirement
        public async Task<bool> AddEventRequirement(EventRequirement eventRequirement)
        {
            if (eventRequirement == null)
            {
                return false;
            }

            var requirement = await _context.EventRequirements.Where(r => r.Title == eventRequirement.Title).FirstOrDefaultAsync();
            if(requirement != null)
            {
                throw new RequirementException("A requirement with the title already exists");
                return false;
            }

            await _context.EventRequirements.AddAsync(eventRequirement);
            await _context.SaveChangesAsync();
            return true;
        }

        // Update existing event requirement
        public async Task<bool> UpdateEventRequirement(int eventRequirementId, EventRequirement updatedRequirement)
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
        public async Task<bool> DeleteEventRequirement(int eventRequirementId)
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