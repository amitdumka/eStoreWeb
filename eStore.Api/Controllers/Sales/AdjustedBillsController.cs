using eStore.Database;
using eStore.Shared.Models.Sales;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eStore.Api.Controllers.Sales
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AdjustedBillsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public AdjustedBillsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/AdjustedBills
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdjustedBill>>> GetAdjustedBills()
        {
            return await _context.AdjustedBills.ToListAsync();
        }

        // GET: api/AdjustedBills/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AdjustedBill>> GetAdjustedBill(int id)
        {
            var AdjustedBill = await _context.AdjustedBills.FindAsync(id);

            if (AdjustedBill == null)
            {
                return NotFound();
            }

            return AdjustedBill;
        }

        // PUT: api/AdjustedBills/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdjustedBill(int id, AdjustedBill AdjustedBill)
        {
            if (id != AdjustedBill.AdjustedBillId)
            {
                return BadRequest();
            }

            _context.Entry(AdjustedBill).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdjustedBillExists(id))
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

        // POST: api/AdjustedBills
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AdjustedBill>> PostAdjustedBill(AdjustedBill AdjustedBill)
        {
            _context.AdjustedBills.Add(AdjustedBill);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdjustedBill", new { id = AdjustedBill.AdjustedBillId }, AdjustedBill);
        }

        // DELETE: api/AdjustedBills/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdjustedBill(int id)
        {
            var AdjustedBill = await _context.AdjustedBills.FindAsync(id);
            if (AdjustedBill == null)
            {
                return NotFound();
            }

            _context.AdjustedBills.Remove(AdjustedBill);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdjustedBillExists(int id)
        {
            return _context.AdjustedBills.Any(e => e.AdjustedBillId == id);
        }
    }
}