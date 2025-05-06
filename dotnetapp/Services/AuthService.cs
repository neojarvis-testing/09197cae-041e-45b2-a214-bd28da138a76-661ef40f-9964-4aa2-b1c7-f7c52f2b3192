// using System.Security.Claims;
// using dotnetapp.Models;
// using dotnetapp.Data;
// using Microsoft.IdentityModel.Tokens;
// using Microsoft.EntityFrameworkCore;
// using System.IdentityModel.Tokens.Jwt;

// namespace dotnetapp.Services
// {
//     public class AuthService : IAuthService
//     {
//         private readonly ApplicationDbContext _db;
//         private readonly List<string> _validRoles = new() { "Admin", "User" };
//         private readonly IConfiguration _config;


//         public AuthService(ApplicationDbContext db,IConfiguration config)
//         {
//             _db = db;
//             _config=config;
//         }

//         public async Task<(int, string)> Registration(User model, string role)
//         {
//             if (!_validRoles.Contains(role))
//                 return (400, "Invalid role.");

//             var userExists = await _db.Users.FirstOrDefaultAsync(u => u.Username == model.Username);
//             if (userExists != null)
//                 return (409, "Username already exists.");

//             model.UserRole = role;
//             _db.Users.Add(model);
//             await _db.SaveChangesAsync();

//             return (200, "Registration successful.");
//         }

//         public async Task<(int, string)> Login(LoginModel model)
//         {
//             var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == model.Email);

//             if (user == null)
//                 return (404, "Invalid email.");

//             if (user.Password != model.Password)
//                 return (401, "Invalid password.");

//             var token = GenerateToken(new[]
//             {
//                 new Claim(ClaimTypes.Name, user.Username),
//                 new Claim(ClaimTypes.Role, user.UserRole)
//             });

//             return (200, token);
//         }

//         private string GenerateToken(IEnumerable<Claim> claims)
// {
//     var secreteKey = _config["Jwt:Key"];

//     var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(secreteKey));

//     var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

//     var tokenDescriptor = new SecurityTokenDescriptor
//     {
//         Subject = new ClaimsIdentity(claims),
//         Expires = DateTime.UtcNow.AddHours(220), // Token expiration time
//         SigningCredentials = credentials
//     };

//     var tokenHandler = new JwtSecurityTokenHandler();
//     var securityToken = tokenHandler.CreateToken(tokenDescriptor);

//     return tokenHandler.WriteToken(securityToken);
// }

//     }
// }

using System;
using dotnetapp.Data;
using dotnetapp.Models;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
 
namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
 
        public AuthService(UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            ApplicationDbContext context)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
            _context = context;
        }
 
        // public async Task<(int, string)> Registration(User model, string role)
        // {
        //     var userExists = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
        //     if (userExists != null)
        //         return (0, "User already exists");
 
        //     var appUser = new ApplicationUser
        //     {
        //         Email = model.Email,
        //         UserName = model.Email,
        //         Name = model.Username.Length > 30 ? model.Username.Substring(0, 30) : model.Username // Store current user's name
        //     };
 
        //     var identityResult = await userManager.CreateAsync(appUser, model.Password);
        //     if (!identityResult.Succeeded)
        //         return (0, "User creation failed! Please check user details and try again");
 
        //     if (!await roleManager.RoleExistsAsync(role))
        //         await roleManager.CreateAsync(new IdentityRole(role));
 
        //     await userManager.AddToRoleAsync(appUser, role);
 
        //     var newUser = new User
        //     {
        //         Email = model.Email,
        //         Password = model.Password,
        //         Username = model.Username,
        //         MobileNumber = model.MobileNumber,
        //         UserRole = role
        //     };
        //     _context.Users.Add(newUser);
        //     await _context.SaveChangesAsync();
 
        //     return (1, "User created successfully!");
        // }

        public async Task<(int, string)> Registration(User model, string role)
        {
            // Check if the role is Admin and validate the secret key
            if (role == "Admin")
            {
                var correctSecretKey = _configuration["AdminSecretKey"];
                if (model.AdminSecretKey != correctSecretKey)
                    return (400, "Invalid Admin Secret Key.");
            }
        
            // Check if the user already exists
            var userExists = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
            if (userExists != null)
                return (0, "User already exists");
        
            var appUser = new ApplicationUser
            {
                Email = model.Email,
                UserName = model.Email,
                Name = model.Username.Length > 30 ? model.Username.Substring(0, 30) : model.Username // Store current user's name
            };
        
            var identityResult = await userManager.CreateAsync(appUser, model.Password);
            if (!identityResult.Succeeded)
                return (0, "User creation failed! Please check user details and try again");
        
            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));
        
            await userManager.AddToRoleAsync(appUser, role);
        
            var newUser = new User
            {
                Email = model.Email,
                Password = model.Password,
                Username = model.Username,
                MobileNumber = model.MobileNumber,
                UserRole = role
            };
        
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
        
            return (1, "User created successfully!");
        }

 
        public async Task<(int, string)> Login(LoginModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return (0, "Invalid email");
 
            if (!await userManager.CheckPasswordAsync(user, model.Password))
                return (0, "Invalid password");
 
            var userRoles = await userManager.GetRolesAsync(user);
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Name), // Store authenticated user's name
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
 
            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }
 
            var token = GenerateToken(authClaims);
            return (1, token);
        }
        // public async Task<(int, string)> Login(LoginModel model)
        // {
        //     var user = await userManager.FindByEmailAsync(model.Email);
        //     if (user == null)
        //         return (0, "Invalid email");
        
        //     if (!await userManager.CheckPasswordAsync(user, model.Password))
        //         return (0, "Invalid password");
        
        //     var userRoles = await userManager.GetRolesAsync(user);
            
        //     // If the user is an Admin, validate the Admin Secret Key
        //     if (userRoles.Contains("Admin"))
        //     {
        //         if (string.IsNullOrEmpty(model.AdminSecretKey) || model.AdminSecretKey != _configuration["AdminSecretKey"])
        //             return (403, "Invalid Admin Secret Key.");
        //     }
        
        //     var authClaims = new List<Claim>
        //     {
        //         new Claim(ClaimTypes.Name, user.Name), // Store authenticated user's name
        //         new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        //     };
        
        //     foreach (var userRole in userRoles)
        //     {
        //         authClaims.Add(new Claim(ClaimTypes.Role, userRole));
        //     }
        
        //     var token = GenerateToken(authClaims);
        //     return (1, token);
        // }
        
 
        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
 
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:ValidIssuer"],
                audience: _configuration["Jwt:ValidAudience"],
                expires: DateTime.Now.AddHours(330),
                claims: claims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );
 
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
 