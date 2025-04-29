
using System;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class Feedback
    {
        public int FeedbackId { get; set; }

        [Required(ErrorMessage = "User ID is required")]
        public int UserId { get; set; }

        public User User { get; set; }
        [Required(ErrorMessage = "Feedback text is required")]
        public string FeedbackText { get; set; }

        [Required(ErrorMessage = "Date is required")]
        public DateTime Date { get; set; }
    }
}
