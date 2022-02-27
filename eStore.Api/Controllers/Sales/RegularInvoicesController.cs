using eStore.Database;
using eStore.Shared.Models.Sales;
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
    public class RegularInvoicesController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public RegularInvoicesController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/RegularInvoices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegularInvoice>>> GetRegularInvoices()
        {
            return await _context.RegularInvoices.ToListAsync();
        }

        // GET: api/RegularInvoices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RegularInvoice>> GetRegularInvoice(string id)
        {
            var regularInvoice = await _context.RegularInvoices.FindAsync(id);

            if (regularInvoice == null)
            {
                return NotFound();
            }

            return regularInvoice;
        }

        // PUT: api/RegularInvoices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegularInvoice(string id, RegularInvoice regularInvoice)
        {
            if (id != regularInvoice.InvoiceNo)
            {
                return BadRequest();
            }

            _context.Entry(regularInvoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegularInvoiceExists(id))
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

        // POST: api/RegularInvoices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RegularInvoice>> PostRegularInvoice(RegularInvoice regularInvoice)
        {
            _context.RegularInvoices.Add(regularInvoice);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RegularInvoiceExists(regularInvoice.InvoiceNo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetRegularInvoice", new { id = regularInvoice.InvoiceNo }, regularInvoice);
        }

        // DELETE: api/RegularInvoices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegularInvoice(string id)
        {
            var regularInvoice = await _context.RegularInvoices.FindAsync(id);
            if (regularInvoice == null)
            {
                return NotFound();
            }

            _context.RegularInvoices.Remove(regularInvoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegularInvoiceExists(string id)
        {
            return _context.RegularInvoices.Any(e => e.InvoiceNo == id);
        }
    }
}