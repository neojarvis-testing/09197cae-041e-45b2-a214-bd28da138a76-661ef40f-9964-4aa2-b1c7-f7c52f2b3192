using dotnetapp.Models;
using dotnetapp.Data;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Services{
    public class FeedbackService{

        private ApplicationDbContext _context;

        public FeedbackService(ApplicationDbContext context){
            _context=context;
        } 

        public async Task<IEnumerable<Feedback>> GetAllFeedbacks(){
            return _context.Feedbacks.ToList();
        }

        public async Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userId){
            var feedbacks = _context.Feedbacks.ToList().FindAll(i=>i.UserId == userId);
            return feedbacks.ToList();
        }

        public async Task<bool> AddFeedback(Feedback feedback){
            if(feedback!=null){
                _context.Feedbacks.Add(feedback);
                _context.SaveChanges();
                return true;
            }
            return false;
        }
        
        public async Task<bool> DeleteFeedback(int feedbackId)
        {
            var f = await  _context.Feedbacks.FindAsync(feedbackId);
            if(f != null){
                _context.Feedbacks.Remove(f);
                _context.SaveChanges();
                return true;
                }
                return false;
        }

        
    }
}


