using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eStore.DL.Data;
using eStore.Shared.Models.Sales;
using Microsoft.AspNetCore.Authorization;

namespace eStore.Areas.API
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class OnlineVendorsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public OnlineVendorsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/OnlineVendors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OnlineVendor>>> GetOnlineVendors()
        {
            return await _context.OnlineVendors.ToListAsync();
        }

        // GET: api/OnlineVendors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OnlineVendor>> GetOnlineVendor(int id)
        {
            var onlineVendor = await _context.OnlineVendors.FindAsync(id);

            if (onlineVendor == null)
            {
                return NotFound();
            }

            return onlineVendor;
        }

        // PUT: api/OnlineVendors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOnlineVendor(int id, OnlineVendor onlineVendor)
        {
            if (id != onlineVendor.OnlineVendorId)
            {
                return BadRequest();
            }

            _context.Entry(onlineVendor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OnlineVendorExists(id))
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

        // POST: api/OnlineVendors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OnlineVendor>> PostOnlineVendor(OnlineVendor onlineVendor)
        {
            _context.OnlineVendors.Add(onlineVendor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOnlineVendor", new { id = onlineVendor.OnlineVendorId }, onlineVendor);
        }

        // DELETE: api/OnlineVendors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOnlineVendor(int id)
        {
            var onlineVendor = await _context.OnlineVendors.FindAsync(id);
            if (onlineVendor == null)
            {
                return NotFound();
            }

            _context.OnlineVendors.Remove(onlineVendor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OnlineVendorExists(int id)
        {
            return _context.OnlineVendors.Any(e => e.OnlineVendorId == id);
        }
    }
}
