
using System;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class Event
    {
        public int EventId { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [MaxLength(100, ErrorMessage = "Title cannot exceed 100 characters")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Description is required")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Location is required")]
        public string Location { get; set; }

        [Required(ErrorMessage = "Date is required")]
        public DateTime Date { get; set; }

        [Required(ErrorMessage = "Organizer name is required")]
        public string OrganizerName { get; set; }

        [Required(ErrorMessage = "Contact info is required")]
        public string ContactInfo { get; set; }

        public DateTime PostedDate { get; set; }

        [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; }
    }
}
