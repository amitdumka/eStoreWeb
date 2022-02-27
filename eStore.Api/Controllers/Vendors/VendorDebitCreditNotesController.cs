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
    public class VendorDebitCreditNotesController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public VendorDebitCreditNotesController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/VendorDebitCreditNotes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VendorDebitCreditNote>>> GetVendorNotes()
        {
            return await _context.VendorNotes.ToListAsync();
        }

        // GET: api/VendorDebitCreditNotes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VendorDebitCreditNote>> GetVendorDebitCreditNote(int id)
        {
            var vendorDebitCreditNote = await _context.VendorNotes.FindAsync(id);

            if (vendorDebitCreditNote == null)
            {
                return NotFound();
            }

            return vendorDebitCreditNote;
        }

        // PUT: api/VendorDebitCreditNotes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVendorDebitCreditNote(int id, VendorDebitCreditNote vendorDebitCreditNote)
        {
            if (id != vendorDebitCreditNote.VendorDebitCreditNoteId)
            {
                return BadRequest();
            }

            _context.Entry(vendorDebitCreditNote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VendorDebitCreditNoteExists(id))
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

        // POST: api/VendorDebitCreditNotes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<VendorDebitCreditNote>> PostVendorDebitCreditNote(VendorDebitCreditNote vendorDebitCreditNote)
        {
            _context.VendorNotes.Add(vendorDebitCreditNote);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVendorDebitCreditNote", new { id = vendorDebitCreditNote.VendorDebitCreditNoteId }, vendorDebitCreditNote);
        }

        // DELETE: api/VendorDebitCreditNotes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVendorDebitCreditNote(int id)
        {
            var vendorDebitCreditNote = await _context.VendorNotes.FindAsync(id);
            if (vendorDebitCreditNote == null)
            {
                return NotFound();
            }

            _context.VendorNotes.Remove(vendorDebitCreditNote);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VendorDebitCreditNoteExists(int id)
        {
            return _context.VendorNotes.Any(e => e.VendorDebitCreditNoteId == id);
        }
    }
}