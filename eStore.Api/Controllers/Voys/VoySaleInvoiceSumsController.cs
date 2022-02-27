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
    public class VoySaleInvoiceSumsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public VoySaleInvoiceSumsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/VoySaleInvoiceSums
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VoySaleInvoiceSum>>> GetVoySaleInvoiceSums()
        {
            return await _context.VoySaleInvoiceSums.ToListAsync();
        }

        // GET: api/VoySaleInvoiceSums/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VoySaleInvoiceSum>> GetVoySaleInvoiceSum(int id)
        {
            var voySaleInvoiceSum = await _context.VoySaleInvoiceSums.FindAsync(id);

            if (voySaleInvoiceSum == null)
            {
                return NotFound();
            }

            return voySaleInvoiceSum;
        }

        // PUT: api/VoySaleInvoiceSums/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVoySaleInvoiceSum(int id, VoySaleInvoiceSum voySaleInvoiceSum)
        {
            if (id != voySaleInvoiceSum.ID)
            {
                return BadRequest();
            }

            _context.Entry(voySaleInvoiceSum).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VoySaleInvoiceSumExists(id))
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

        // POST: api/VoySaleInvoiceSums
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<VoySaleInvoiceSum>> PostVoySaleInvoiceSum(VoySaleInvoiceSum voySaleInvoiceSum)
        {
            _context.VoySaleInvoiceSums.Add(voySaleInvoiceSum);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVoySaleInvoiceSum", new { id = voySaleInvoiceSum.ID }, voySaleInvoiceSum);
        }

        // DELETE: api/VoySaleInvoiceSums/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVoySaleInvoiceSum(int id)
        {
            var voySaleInvoiceSum = await _context.VoySaleInvoiceSums.FindAsync(id);
            if (voySaleInvoiceSum == null)
            {
                return NotFound();
            }

            _context.VoySaleInvoiceSums.Remove(voySaleInvoiceSum);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VoySaleInvoiceSumExists(int id)
        {
            return _context.VoySaleInvoiceSums.Any(e => e.ID == id);
        }
    }
}