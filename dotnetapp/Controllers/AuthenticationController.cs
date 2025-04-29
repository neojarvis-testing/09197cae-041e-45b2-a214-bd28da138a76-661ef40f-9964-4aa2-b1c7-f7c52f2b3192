
// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using dotnetapp.Models;
// using dotnetapp.Data;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// namespace dotnetapp.Controllers
// {
//     [ApiController]
//     [Route("api/users")]
//     public class UserController : ControllerBase
//     {
//         private readonly ApplicationDbContext db;
//         private readonly List<string> validRoles=new(){"Admin","User"};

//         public UserController(ApplicationDbContext db1)
//         {
//             db=db1;
//         }

//         [HttpPost("register")]
//         public async Task<ActionResult<User>> Register(User user)
//         {
//             try{
//             if(await db.Users.AnyAsync(u=>u.Username==user.Username))
//             {
//                 return Conflict("Username already exists.");
//             }

//             if(!IsValidRole(user.UserRole))
//             {
//                 return BadRequest("Invalid role.");
//             }

//             db.Users.Add(user);
//             await db.SaveChangesAsync();
//             return CreatedAtAction(nameof(Register),new {id=user.UserId},user);
//             }
//             catch (Exception e)
//             {
//                 return StatusCode(500, e.Message);
//             }

//         }

//         [HttpPost("login")]
//         public async Task<ActionResult<object>> Login(LoginModel loginModel)
//         {
//             try{
//             var user=await db.Users.FirstOrDefaultAsync(u=>u.Username==loginModel.Email && u.Password==loginModel.Password);

//             if(user==null)
//             {
//                 return BadRequest();
//             }

            
//             return Ok(new {Message="Login successful",User=user});
//             }
//             catch (Exception e)
//             {
//                 return StatusCode(500, e.Message);
//             }
//         }

//         private bool IsValidRole(string role)
//         {
//             return validRoles.Contains(role);   
//         }
//     }
// }



using Microsoft.AspNetCore.Mvc;
using dotnetapp.Services;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var (status, result) = await _authService.Login(model);

            if (status == 404)
                return NotFound("Invalid email.");
            if (status == 401)
                return Unauthorized("Invalid password.");

            return Ok(new { Token = result });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User model, string role)
        {
            var (status, message) = await _authService.Registration(model, role);

            if (status == 400)
                return BadRequest(message);
            if (status == 409)
                return Conflict(message);

            // return Created("api/auth/register", message);
            return Ok(message);
        }
    }
}
