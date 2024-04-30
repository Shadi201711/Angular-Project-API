using Microsoft.AspNetCore.Mvc;
using Angular_Project.Models;
using Angular_Project.Repository;
using System.Linq;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System;

namespace Angular_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly GenericRepository<User> userRepository;

        public LoginController(GenericRepository<User> userRepository)
        {
            this.userRepository = userRepository;
        }

        public class LoginResponse
        {
            public bool Success { get; set; }
            public string Message { get; set; }
            public TokenData Data { get; set; }
        }

        public class TokenData
        {
            public string Token { get; set; }
        }

        [HttpPost]
        public IActionResult Login([FromBody] User user)
        {
            var loggedInUser = userRepository.GetAll().FirstOrDefault(u => u.Email == user.Email && u.Password == user.Password);

            if (loggedInUser != null)
            {
                var claims = new[]
                {
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim(ClaimTypes.Role, (loggedInUser.IsAdmin ?? false) ? "Admin" : "User")
                };

                // Generate JWT token
                var key = "Angular project Key using real Api Powerd By Shadiii";
                var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(30),
                    signingCredentials: credentials
                );

                // Return token along with success status and role information
                return Ok(new LoginResponse
                {
                    Success = true,
                    Message = $"Logged in as {(loggedInUser.IsAdmin ?? false ? "admin" : "user")}",
                    Data = new TokenData
                    {
                        Token = new JwtSecurityTokenHandler().WriteToken(token)
                    }
                });
            }
            else
            {
                // Return failure status
                return BadRequest(new LoginResponse { Success = false, Message = "Login failed" });
            }
        }
    }
}
