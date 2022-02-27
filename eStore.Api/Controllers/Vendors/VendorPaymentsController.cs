using eStore.Database;
using eStore.Shared.Models.Stores;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class VendorPaymentsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public VendorPaymentsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/VendorPayments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VendorPayment>>> GetVendorPayments()
        {
            return await _context.VendorPayments.ToListAsync();
        }

        // GET: api/VendorPayments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VendorPayment>> GetVendorPayment(int id)
        {
            var vendorPayment = await _context.VendorPayments.FindAsync(id);

            if (vendorPayment == null)
            {
                return NotFound();
            }

            return vendorPayment;
        }

        // PUT: api/VendorPayments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVendorPayment(int id, VendorPayment vendorPayment)
        {
            if (id != vendorPayment.VendorPaymentId)
            {
                return BadRequest();
            }

            _context.Entry(vendorPayment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VendorPaymentExists(id))
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

        // POST: api/VendorPayments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<VendorPayment>> PostVendorPayment(VendorPayment vendorPayment)
        {
            _context.VendorPayments.Add(vendorPayment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVendorPayment", new { id = vendorPayment.VendorPaymentId }, vendorPayment);
        }

        // DELETE: api/VendorPayments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVendorPayment(int id)
        {
            var vendorPayment = await _context.VendorPayments.FindAsync(id);
            if (vendorPayment == null)
            {
                return NotFound();
            }

            _context.VendorPayments.Remove(vendorPayment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VendorPaymentExists(int id)
        {
            return _context.VendorPayments.Any(e => e.VendorPaymentId == id);
        }
    }
}