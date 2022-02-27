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
    public class StoreClosesController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public StoreClosesController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/StoreCloses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoreClose>>> GetStoreCloses()
        {
            return await _context.StoreCloses.ToListAsync();
        }

        // GET: api/StoreCloses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StoreClose>> GetStoreClose(int id)
        {
            var storeClose = await _context.StoreCloses.FindAsync(id);

            if (storeClose == null)
            {
                return NotFound();
            }

            return storeClose;
        }

        // PUT: api/StoreCloses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStoreClose(int id, StoreClose storeClose)
        {
            if (id != storeClose.StoreCloseId)
            {
                return BadRequest();
            }

            _context.Entry(storeClose).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreCloseExists(id))
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

        // POST: api/StoreCloses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StoreClose>> PostStoreClose(StoreClose storeClose)
        {
            _context.StoreCloses.Add(storeClose);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStoreClose", new { id = storeClose.StoreCloseId }, storeClose);
        }

        // DELETE: api/StoreCloses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStoreClose(int id)
        {
            var storeClose = await _context.StoreCloses.FindAsync(id);
            if (storeClose == null)
            {
                return NotFound();
            }

            _context.StoreCloses.Remove(storeClose);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StoreCloseExists(int id)
        {
            return _context.StoreCloses.Any(e => e.StoreCloseId == id);
        }
    }
}