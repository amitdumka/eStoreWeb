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
    public class InwardSummariesController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public InwardSummariesController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/InwardSummaries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InwardSummary>>> GetInwardSummaries()
        {
            return await _context.InwardSummaries.ToListAsync();
        }

        // GET: api/InwardSummaries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InwardSummary>> GetInwardSummary(int id)
        {
            var inwardSummary = await _context.InwardSummaries.FindAsync(id);

            if (inwardSummary == null)
            {
                return NotFound();
            }

            return inwardSummary;
        }

        // PUT: api/InwardSummaries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInwardSummary(int id, InwardSummary inwardSummary)
        {
            if (id != inwardSummary.ID)
            {
                return BadRequest();
            }

            _context.Entry(inwardSummary).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InwardSummaryExists(id))
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

        // POST: api/InwardSummaries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<InwardSummary>> PostInwardSummary(InwardSummary inwardSummary)
        {
            _context.InwardSummaries.Add(inwardSummary);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInwardSummary", new { id = inwardSummary.ID }, inwardSummary);
        }

        // DELETE: api/InwardSummaries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInwardSummary(int id)
        {
            var inwardSummary = await _context.InwardSummaries.FindAsync(id);
            if (inwardSummary == null)
            {
                return NotFound();
            }

            _context.InwardSummaries.Remove(inwardSummary);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InwardSummaryExists(int id)
        {
            return _context.InwardSummaries.Any(e => e.ID == id);
        }
    }
}