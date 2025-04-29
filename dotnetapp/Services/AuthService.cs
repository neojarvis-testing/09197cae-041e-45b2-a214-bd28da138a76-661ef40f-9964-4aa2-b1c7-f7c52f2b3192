using System.Security.Claims;
using dotnetapp.Models;
using dotnetapp.Data;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _db;
        private readonly List<string> _validRoles = new() { "Admin", "User" };
        private readonly IConfiguration _config;


        public AuthService(ApplicationDbContext db,IConfiguration config)
        {
            _db = db;
            _config=config;
        }

        public async Task<(int, string)> Registration(User model, string role)
        {
            if (!_validRoles.Contains(role))
                return (400, "Invalid role.");

            var userExists = await _db.Users.FirstOrDefaultAsync(u => u.Username == model.Username);
            if (userExists != null)
                return (409, "Username already exists.");

            model.UserRole = role;
            _db.Users.Add(model);
            await _db.SaveChangesAsync();

            return (201, "Registration successful.");
        }

        public async Task<(int, string)> Login(LoginModel model)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == model.Email);

            if (user == null)
                return (404, "Invalid email.");

            if (user.Password != model.Password)
                return (401, "Invalid password.");

            var token = GenerateToken(new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.UserRole)
            });

            return (200, token);
        }

        private string GenerateToken(IEnumerable<Claim> claims)
{
    var secreteKey = _config["Jwt:Key"];

    var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(secreteKey));

    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.UtcNow.AddHours(220), // Token expiration time
        SigningCredentials = credentials
    };

    var tokenHandler = new JwtSecurityTokenHandler();
    var securityToken = tokenHandler.CreateToken(tokenDescriptor);

    return tokenHandler.WriteToken(securityToken);
}

    }
}