using eStore.Database;
using eStore.Shared.Uploader;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class ProductListsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public ProductListsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/ProductLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductList>>> GetProductLists()
        {
            return await _context.ProductLists.ToListAsync();
        }

        // GET: api/ProductLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductList>> GetProductList(string id)
        {
            var productList = await _context.ProductLists.FindAsync(id);

            if (productList == null)
            {
                return NotFound();
            }

            return productList;
        }

        // PUT: api/ProductLists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductList(string id, ProductList productList)
        {
            if (id != productList.BarCode)
            {
                return BadRequest();
            }

            _context.Entry(productList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductListExists(id))
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

        // POST: api/ProductLists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductList>> PostProductList(ProductList productList)
        {
            _context.ProductLists.Add(productList);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductListExists(productList.BarCode))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProductList", new { id = productList.BarCode }, productList);
        }

        // DELETE: api/ProductLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductList(string id)
        {
            var productList = await _context.ProductLists.FindAsync(id);
            if (productList == null)
            {
                return NotFound();
            }

            _context.ProductLists.Remove(productList);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductListExists(string id)
        {
            return _context.ProductLists.Any(e => e.BarCode == id);
        }
    }
}