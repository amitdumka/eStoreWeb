using eStore.Database;
using eStore.Shared.Models.Common;
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
    public class CashInHandsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public CashInHandsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/CashInHands
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CashInHand>>> GetCashInHands()
        {
            return await _context.CashInHands.ToListAsync();
        }

        // GET: api/CashInHands/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CashInHand>> GetCashInHand(int id)
        {
            var cashInHand = await _context.CashInHands.FindAsync(id);

            if (cashInHand == null)
            {
                return NotFound();
            }

            return cashInHand;
        }

        // PUT: api/CashInHands/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCashInHand(int id, CashInHand cashInHand)
        {
            if (id != cashInHand.CashInHandId)
            {
                return BadRequest();
            }

            _context.Entry(cashInHand).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CashInHandExists(id))
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

        // POST: api/CashInHands
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CashInHand>> PostCashInHand(CashInHand cashInHand)
        {
            _context.CashInHands.Add(cashInHand);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCashInHand", new { id = cashInHand.CashInHandId }, cashInHand);
        }

        // DELETE: api/CashInHands/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCashInHand(int id)
        {
            var cashInHand = await _context.CashInHands.FindAsync(id);
            if (cashInHand == null)
            {
                return NotFound();
            }

            _context.CashInHands.Remove(cashInHand);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CashInHandExists(int id)
        {
            return _context.CashInHands.Any(e => e.CashInHandId == id);
        }
    }
}