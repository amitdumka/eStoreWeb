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
    public class UsedSlipsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public UsedSlipsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/UsedSlips
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsedSlip>>> GetUsedSlips()
        {
            return await _context.UsedSlips.ToListAsync();
        }

        // GET: api/UsedSlips/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UsedSlip>> GetUsedSlip(int id)
        {
            var usedSlip = await _context.UsedSlips.FindAsync(id);

            if (usedSlip == null)
            {
                return NotFound();
            }

            return usedSlip;
        }

        // PUT: api/UsedSlips/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsedSlip(int id, UsedSlip usedSlip)
        {
            if (id != usedSlip.UsedSlipId)
            {
                return BadRequest();
            }

            _context.Entry(usedSlip).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsedSlipExists(id))
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

        // POST: api/UsedSlips
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UsedSlip>> PostUsedSlip(UsedSlip usedSlip)
        {
            _context.UsedSlips.Add(usedSlip);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsedSlip", new { id = usedSlip.UsedSlipId }, usedSlip);
        }

        // DELETE: api/UsedSlips/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsedSlip(int id)
        {
            var usedSlip = await _context.UsedSlips.FindAsync(id);
            if (usedSlip == null)
            {
                return NotFound();
            }

            _context.UsedSlips.Remove(usedSlip);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsedSlipExists(int id)
        {
            return _context.UsedSlips.Any(e => e.UsedSlipId == id);
        }
    }
}