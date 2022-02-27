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
    public class VoyPurchaseInwardsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public VoyPurchaseInwardsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/VoyPurchaseInwards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VoyPurchaseInward>>> GetVoyPurchaseInwards()
        {
            return await _context.VoyPurchaseInwards.ToListAsync();
        }

        // GET: api/VoyPurchaseInwards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VoyPurchaseInward>> GetVoyPurchaseInward(int id)
        {
            var voyPurchaseInward = await _context.VoyPurchaseInwards.FindAsync(id);

            if (voyPurchaseInward == null)
            {
                return NotFound();
            }

            return voyPurchaseInward;
        }

        // PUT: api/VoyPurchaseInwards/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVoyPurchaseInward(int id, VoyPurchaseInward voyPurchaseInward)
        {
            if (id != voyPurchaseInward.ID)
            {
                return BadRequest();
            }

            _context.Entry(voyPurchaseInward).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VoyPurchaseInwardExists(id))
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

        // POST: api/VoyPurchaseInwards
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<VoyPurchaseInward>> PostVoyPurchaseInward(VoyPurchaseInward voyPurchaseInward)
        {
            _context.VoyPurchaseInwards.Add(voyPurchaseInward);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVoyPurchaseInward", new { id = voyPurchaseInward.ID }, voyPurchaseInward);
        }

        // DELETE: api/VoyPurchaseInwards/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVoyPurchaseInward(int id)
        {
            var voyPurchaseInward = await _context.VoyPurchaseInwards.FindAsync(id);
            if (voyPurchaseInward == null)
            {
                return NotFound();
            }

            _context.VoyPurchaseInwards.Remove(voyPurchaseInward);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VoyPurchaseInwardExists(int id)
        {
            return _context.VoyPurchaseInwards.Any(e => e.ID == id);
        }
    }
}