using eStore.Database;
using eStore.Shared.Models.Sales.Payments;
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
    public class CardMachinesController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public CardMachinesController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/CardMachines
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EDC>>> GetCardMachine()
        {
            return await _context.CardMachine.ToListAsync();
        }

        // GET: api/CardMachines/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EDC>> GetEDC(int id)
        {
            var eDC = await _context.CardMachine.FindAsync(id);

            if (eDC == null)
            {
                return NotFound();
            }

            return eDC;
        }

        // PUT: api/CardMachines/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEDC(int id, EDC eDC)
        {
            if (id != eDC.EDCId)
            {
                return BadRequest();
            }

            _context.Entry(eDC).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EDCExists(id))
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

        // POST: api/CardMachines
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EDC>> PostEDC(EDC eDC)
        {
            _context.CardMachine.Add(eDC);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEDC", new { id = eDC.EDCId }, eDC);
        }

        // DELETE: api/CardMachines/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEDC(int id)
        {
            var eDC = await _context.CardMachine.FindAsync(id);
            if (eDC == null)
            {
                return NotFound();
            }

            _context.CardMachine.Remove(eDC);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EDCExists(int id)
        {
            return _context.CardMachine.Any(e => e.EDCId == id);
        }
    }
}