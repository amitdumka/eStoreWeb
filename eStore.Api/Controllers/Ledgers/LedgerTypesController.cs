using eStore.Database;
using eStore.Shared.Models.Accounts;
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
    public class LedgerTypesController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public LedgerTypesController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/LedgerTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LedgerType>>> GetLedgerTypes()
        {
            return await _context.LedgerTypes.ToListAsync();
        }

        // GET: api/LedgerTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LedgerType>> GetLedgerType(int id)
        {
            var ledgerType = await _context.LedgerTypes.FindAsync(id);

            if (ledgerType == null)
            {
                return NotFound();
            }

            return ledgerType;
        }

        // PUT: api/LedgerTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLedgerType(int id, LedgerType ledgerType)
        {
            if (id != ledgerType.LedgerTypeId)
            {
                return BadRequest();
            }

            _context.Entry(ledgerType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LedgerTypeExists(id))
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

        // POST: api/LedgerTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LedgerType>> PostLedgerType(LedgerType ledgerType)
        {
            _context.LedgerTypes.Add(ledgerType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLedgerType", new { id = ledgerType.LedgerTypeId }, ledgerType);
        }

        // DELETE: api/LedgerTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLedgerType(int id)
        {
            var ledgerType = await _context.LedgerTypes.FindAsync(id);
            if (ledgerType == null)
            {
                return NotFound();
            }

            _context.LedgerTypes.Remove(ledgerType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LedgerTypeExists(int id)
        {
            return _context.LedgerTypes.Any(e => e.LedgerTypeId == id);
        }
    }
}