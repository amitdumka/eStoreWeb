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
    public class LegerMastersController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public LegerMastersController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/LegerMasters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LedgerMaster>>> GetLedgerMasters()
        {
            return await _context.LedgerMasters.ToListAsync();
        }

        // GET: api/LegerMasters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LedgerMaster>> GetLedgerMaster(int id)
        {
            var ledgerMaster = await _context.LedgerMasters.FindAsync(id);

            if (ledgerMaster == null)
            {
                return NotFound();
            }

            return ledgerMaster;
        }

        // PUT: api/LegerMasters/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLedgerMaster(int id, LedgerMaster ledgerMaster)
        {
            if (id != ledgerMaster.LedgerMasterId)
            {
                return BadRequest();
            }

            _context.Entry(ledgerMaster).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LedgerMasterExists(id))
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

        // POST: api/LegerMasters
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LedgerMaster>> PostLedgerMaster(LedgerMaster ledgerMaster)
        {
            _context.LedgerMasters.Add(ledgerMaster);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLedgerMaster", new { id = ledgerMaster.LedgerMasterId }, ledgerMaster);
        }

        // DELETE: api/LegerMasters/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLedgerMaster(int id)
        {
            var ledgerMaster = await _context.LedgerMasters.FindAsync(id);
            if (ledgerMaster == null)
            {
                return NotFound();
            }

            _context.LedgerMasters.Remove(ledgerMaster);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LedgerMasterExists(int id)
        {
            return _context.LedgerMasters.Any(e => e.LedgerMasterId == id);
        }
    }
}
