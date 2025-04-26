using dotnetapp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Services;

namespace dotnetapp.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController:ControllerBase{
        
        private FeedbackService _service;


        public FeedbackController(FeedbackService service){
            _service = service;
        }

        public async Task<ActionResult<IEnumerable<Feedback>>>GetAllFeedbacks(){
            try{

                return Ok(_service.GetAllFeedbacks());

            }catch(Exception e){
                return StatusCode(500,new{message=e.Message});
                }
        }

        public async Task<ActionResult<IEnumerable<Feedback>>>GetFeedbacksByUserId(int userId){
            try{
                var f = _service.GetFeedbacksByUserId(userId);

                if(f==null){
                    return NotFound();
                }

                return Ok(f);
            }catch(Exception e){
                
                return StatusCode(500,new{message="Internal Server Error"});
                }
        }

        public async Task<ActionResult>AddFeedback([FromBody] Feedback feedback){
            try{
                
                if(feedback!=null){

                
               bool r =await  _service.AddFeedback(feedback);
                

                if(r){
                    return Ok("Feedback added successfully");
                }
            }
                return StatusCode(500,"Internal Server");
            }catch(Exception e){

                return StatusCode(500,"Internal Server");
            }
        }

        public async Task<ActionResult>DeleteFeedback(int feedbackId){
            try{
                var f = _service.GetFeedbacksByUserId(feedbackId);

                if(f!=null){
                    bool r =await _service.DeleteFeedback(feedbackId);

                    if(r){

                    return Ok("Feedback Deleted Successfully");
                    }
                }

                return NotFound(new {message="Cannot find any feedback"});

            }catch(Exception e){

                return StatusCode(500,"Internal Server");
            }
        }
    }
}