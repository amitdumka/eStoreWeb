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
    public class SaleWithCustomersController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public SaleWithCustomersController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/SaleWithCustomers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SaleWithCustomer>>> GetSaleWithCustomers()
        {
            return await _context.SaleWithCustomers.ToListAsync();
        }

        // GET: api/SaleWithCustomers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SaleWithCustomer>> GetSaleWithCustomer(int id)
        {
            var saleWithCustomer = await _context.SaleWithCustomers.FindAsync(id);

            if (saleWithCustomer == null)
            {
                return NotFound();
            }

            return saleWithCustomer;
        }

        // PUT: api/SaleWithCustomers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSaleWithCustomer(int id, SaleWithCustomer saleWithCustomer)
        {
            if (id != saleWithCustomer.Id)
            {
                return BadRequest();
            }

            _context.Entry(saleWithCustomer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleWithCustomerExists(id))
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

        // POST: api/SaleWithCustomers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SaleWithCustomer>> PostSaleWithCustomer(SaleWithCustomer saleWithCustomer)
        {
            _context.SaleWithCustomers.Add(saleWithCustomer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSaleWithCustomer", new { id = saleWithCustomer.Id }, saleWithCustomer);
        }

        // DELETE: api/SaleWithCustomers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSaleWithCustomer(int id)
        {
            var saleWithCustomer = await _context.SaleWithCustomers.FindAsync(id);
            if (saleWithCustomer == null)
            {
                return NotFound();
            }

            _context.SaleWithCustomers.Remove(saleWithCustomer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SaleWithCustomerExists(int id)
        {
            return _context.SaleWithCustomers.Any(e => e.Id == id);
        }
    }
}