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
    public class VoyBrandNamesController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public VoyBrandNamesController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/VoyBrandNames
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VoyBrandName>>> GetVoyBrandNames()
        {
            return await _context.VoyBrandNames.ToListAsync();
        }

        // GET: api/VoyBrandNames/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VoyBrandName>> GetVoyBrandName(string id)
        {
            var voyBrandName = await _context.VoyBrandNames.FindAsync(id);

            if (voyBrandName == null)
            {
                return NotFound();
            }

            return voyBrandName;
        }

        // PUT: api/VoyBrandNames/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVoyBrandName(string id, VoyBrandName voyBrandName)
        {
            if (id != voyBrandName.BRANDCODE)
            {
                return BadRequest();
            }

            _context.Entry(voyBrandName).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VoyBrandNameExists(id))
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

        // POST: api/VoyBrandNames
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<VoyBrandName>> PostVoyBrandName(VoyBrandName voyBrandName)
        {
            _context.VoyBrandNames.Add(voyBrandName);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (VoyBrandNameExists(voyBrandName.BRANDCODE))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetVoyBrandName", new { id = voyBrandName.BRANDCODE }, voyBrandName);
        }

        // DELETE: api/VoyBrandNames/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVoyBrandName(string id)
        {
            var voyBrandName = await _context.VoyBrandNames.FindAsync(id);
            if (voyBrandName == null)
            {
                return NotFound();
            }

            _context.VoyBrandNames.Remove(voyBrandName);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VoyBrandNameExists(string id)
        {
            return _context.VoyBrandNames.Any(e => e.BRANDCODE == id);
        }
    }
}