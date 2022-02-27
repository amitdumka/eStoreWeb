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
    public class VoySaleInvoicesController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public VoySaleInvoicesController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/VoySaleInvoices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VoySaleInvoice>>> GetVoySaleInvoices()
        {
            return await _context.VoySaleInvoices.ToListAsync();
        }

        // GET: api/VoySaleInvoices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VoySaleInvoice>> GetVoySaleInvoice(int id)
        {
            var voySaleInvoice = await _context.VoySaleInvoices.FindAsync(id);

            if (voySaleInvoice == null)
            {
                return NotFound();
            }

            return voySaleInvoice;
        }

        // PUT: api/VoySaleInvoices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVoySaleInvoice(int id, VoySaleInvoice voySaleInvoice)
        {
            if (id != voySaleInvoice.ID)
            {
                return BadRequest();
            }

            _context.Entry(voySaleInvoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VoySaleInvoiceExists(id))
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

        // POST: api/VoySaleInvoices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<VoySaleInvoice>> PostVoySaleInvoice(VoySaleInvoice voySaleInvoice)
        {
            _context.VoySaleInvoices.Add(voySaleInvoice);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVoySaleInvoice", new { id = voySaleInvoice.ID }, voySaleInvoice);
        }

        // DELETE: api/VoySaleInvoices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVoySaleInvoice(int id)
        {
            var voySaleInvoice = await _context.VoySaleInvoices.FindAsync(id);
            if (voySaleInvoice == null)
            {
                return NotFound();
            }

            _context.VoySaleInvoices.Remove(voySaleInvoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VoySaleInvoiceExists(int id)
        {
            return _context.VoySaleInvoices.Any(e => e.ID == id);
        }
    }
}