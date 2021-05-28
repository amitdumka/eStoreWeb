using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eStore.DL.Data;
using eStore.Shared.Models.Accounts;
using Microsoft.AspNetCore.Authorization;

namespace eStore.Areas.API
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class LedgerEntriesController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public LedgerEntriesController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/LedgerEntries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LedgerEntry>>> GetLedgerEntries()
        {
            return await _context.LedgerEntries.ToListAsync();
        }

        // GET: api/LedgerEntries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LedgerEntry>> GetLedgerEntry(int id)
        {
            var ledgerEntry = await _context.LedgerEntries.FindAsync(id);

            if (ledgerEntry == null)
            {
                return NotFound();
            }

            return ledgerEntry;
        }

        // PUT: api/LedgerEntries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLedgerEntry(int id, LedgerEntry ledgerEntry)
        {
            if (id != ledgerEntry.LedgerEntryId)
            {
                return BadRequest();
            }

            _context.Entry(ledgerEntry).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LedgerEntryExists(id))
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

        // POST: api/LedgerEntries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LedgerEntry>> PostLedgerEntry(LedgerEntry ledgerEntry)
        {
            _context.LedgerEntries.Add(ledgerEntry);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLedgerEntry", new { id = ledgerEntry.LedgerEntryId }, ledgerEntry);
        }

        // DELETE: api/LedgerEntries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLedgerEntry(int id)
        {
            var ledgerEntry = await _context.LedgerEntries.FindAsync(id);
            if (ledgerEntry == null)
            {
                return NotFound();
            }

            _context.LedgerEntries.Remove(ledgerEntry);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LedgerEntryExists(int id)
        {
            return _context.LedgerEntries.Any(e => e.LedgerEntryId == id);
        }
    }
}
