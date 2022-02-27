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
    public class ProductMastersController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public ProductMastersController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/ProductMasters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductMaster>>> GetProductMasters()
        {
            return await _context.ProductMasters.ToListAsync();
        }

        // GET: api/ProductMasters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductMaster>> GetProductMaster(string id)
        {
            var productMaster = await _context.ProductMasters.FindAsync(id);

            if (productMaster == null)
            {
                return NotFound();
            }

            return productMaster;
        }

        // PUT: api/ProductMasters/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductMaster(string id, ProductMaster productMaster)
        {
            if (id != productMaster.PRODUCTCODE)
            {
                return BadRequest();
            }

            _context.Entry(productMaster).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductMasterExists(id))
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

        // POST: api/ProductMasters
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductMaster>> PostProductMaster(ProductMaster productMaster)
        {
            _context.ProductMasters.Add(productMaster);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductMasterExists(productMaster.PRODUCTCODE))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProductMaster", new { id = productMaster.PRODUCTCODE }, productMaster);
        }

        // DELETE: api/ProductMasters/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductMaster(string id)
        {
            var productMaster = await _context.ProductMasters.FindAsync(id);
            if (productMaster == null)
            {
                return NotFound();
            }

            _context.ProductMasters.Remove(productMaster);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductMasterExists(string id)
        {
            return _context.ProductMasters.Any(e => e.PRODUCTCODE == id);
        }
    }
}