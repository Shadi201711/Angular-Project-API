//using Microsoft.AspNetCore.Mvc;
//using Angular_Project.Models;
//using Angular_Project.Repository;
//using System.Linq;
//using Microsoft.IdentityModel.Tokens;
//using System.Text;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;

//namespace Angular_Project.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class LoginController : ControllerBase
//    {
//         GenericRepository<User> userRepository;

//        public LoginController(GenericRepository<User> userRepository)
//        {
//            this.userRepository = userRepository;
//        }

//        [HttpPost]
//        public IActionResult Login([FromBody] User user)
//        {
//            var loggedInUser = userRepository.GetAll().FirstOrDefault(u => u.Email == user.Email && u.Password == user.Password);

//            if (loggedInUser != null)
//            {
//                if (loggedInUser.IsAdmin == true)
//                {
//                    List<Claim> claims = new List<Claim>();
//                    claims.Add(new Claim(ClaimTypes.Name, user.Email));
//                    claims.Add(new Claim(ClaimTypes.Role, "Admin"));

//                    string key ="Angular project Key using real Api Powerd By Shadiii";
//                    var SecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
//                    var credentials = new SigningCredentials(SecurityKey, SecurityAlgorithms.HmacSha256);
//                    var token = new JwtSecurityToken(
//                        claims: claims,
//                        expires: System.DateTime.Now.AddDays(30),
//                        signingCredentials: credentials
//                        );
//                    return Ok("Admin login successful");
//                }
//                else
//                {
//                    return Ok("User login successful");
//                }
//            }
//            else
//            {
//                return BadRequest("Login failed");
//            }
//        }
//    }
//}


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

                // Return token as response
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            else
            {
                return BadRequest("Login failed");
            }
        }
    }
}


