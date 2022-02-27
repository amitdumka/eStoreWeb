using eStore.Database;
using eStore.Shared.Models.Stores;
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
    public class StoreOpensController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public StoreOpensController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/StoreOpens
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoreOpen>>> GetStoreOpens()
        {
            return await _context.StoreOpens.ToListAsync();
        }

        // GET: api/StoreOpens/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StoreOpen>> GetStoreOpen(int id)
        {
            var storeOpen = await _context.StoreOpens.FindAsync(id);

            if (storeOpen == null)
            {
                return NotFound();
            }

            return storeOpen;
        }

        // PUT: api/StoreOpens/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStoreOpen(int id, StoreOpen storeOpen)
        {
            if (id != storeOpen.StoreOpenId)
            {
                return BadRequest();
            }

            _context.Entry(storeOpen).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreOpenExists(id))
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

        // POST: api/StoreOpens
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StoreOpen>> PostStoreOpen(StoreOpen storeOpen)
        {
            _context.StoreOpens.Add(storeOpen);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStoreOpen", new { id = storeOpen.StoreOpenId }, storeOpen);
        }

        // DELETE: api/StoreOpens/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStoreOpen(int id)
        {
            var storeOpen = await _context.StoreOpens.FindAsync(id);
            if (storeOpen == null)
            {
                return NotFound();
            }

            _context.StoreOpens.Remove(storeOpen);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StoreOpenExists(int id)
        {
            return _context.StoreOpens.Any(e => e.StoreOpenId == id);
        }
    }
}