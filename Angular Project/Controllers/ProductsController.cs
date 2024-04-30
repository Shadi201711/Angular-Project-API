using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Angular_Project.Models;
using Angular_Project.Repository;
using Microsoft.AspNetCore.Authorization;

namespace Angular_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
      GenericRepository<Product> repo;

        public ProductsController(GenericRepository<Product> repo)
        {
            this.repo = repo;
        }

        // GET: api/Products
        [HttpGet]
       
        public  ActionResult<IEnumerable<Product>> GetProducts()
        {
            return repo.GetAll().ToList();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
      
        public  ActionResult<Product> GetProduct(int id)
        {
            var product =  repo.GetById(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Products/5
    
        [HttpPut("{id}")]
        //[Authorize(Roles = "Admin")]
        public IActionResult PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }
            try
            {
                repo.Update(product);
                repo.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: api/Products
        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            repo.Insert(product);
            repo.Save();
           

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
      //  [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = repo.GetById(id);
            if (product == null)
            {
                return NotFound();
            }

           repo.Delete(id);
            repo.Save();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return repo.GetAll().Any(e => e.Id == id);
        }
    }
}
