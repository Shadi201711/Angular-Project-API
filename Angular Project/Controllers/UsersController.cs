using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Angular_Project.Models;
using Angular_Project.Repository;

namespace Angular_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        GenericRepository<User> repo;

        public UsersController(GenericRepository<User> repo)
        {
            this.repo = repo;
        }

        // GET: api/Users
        [HttpGet]
        public  ActionResult<IEnumerable<User>> GetUsers()
        {
            return repo.GetAll().ToList();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public  ActionResult<User> GetUser(int id)
        {
            var user = repo.GetById(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public  IActionResult PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            try
            {
                repo.Update(user);
                repo.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            
            repo.Insert(user);
            repo.Save();
            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public  IActionResult DeleteUser(int id)
        {
            var user =  repo.GetById(id);
            if (user == null)
            {
                return NotFound();
            }

            repo.Delete(id);
            repo.Save();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return repo.GetAll().Any(e => e.Id == id);
        }
    }
}
