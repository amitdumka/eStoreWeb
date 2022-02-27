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
    public class AssestsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public AssestsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/Assests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Assest>>> GetAssests()
        {
            return await _context.Assests.ToListAsync();
        }

        // GET: api/Assests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Assest>> GetAssest(int id)
        {
            var assest = await _context.Assests.FindAsync(id);

            if (assest == null)
            {
                return NotFound();
            }

            return assest;
        }

        // PUT: api/Assests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAssest(int id, Assest assest)
        {
            if (id != assest.AssestId)
            {
                return BadRequest();
            }

            _context.Entry(assest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssestExists(id))
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

        // POST: api/Assests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Assest>> PostAssest(Assest assest)
        {
            _context.Assests.Add(assest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAssest", new { id = assest.AssestId }, assest);
        }

        // DELETE: api/Assests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAssest(int id)
        {
            var assest = await _context.Assests.FindAsync(id);
            if (assest == null)
            {
                return NotFound();
            }

            _context.Assests.Remove(assest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AssestExists(int id)
        {
            return _context.Assests.Any(e => e.AssestId == id);
        }
    }
}