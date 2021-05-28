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
    public class DueRecoveredsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public DueRecoveredsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/DueRecovereds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DueRecoverd>>> GetDueRecoverds()
        {
            return await _context.DueRecoverds.Include(c=>c.DuesList).ThenInclude(c=>c.DailySale).OrderByDescending(c=>c.PaidDate).ToListAsync();
        }

        // GET: api/DueRecovereds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DueRecoverd>> GetDueRecoverd(int id)
        {
            var dueRecoverd = await _context.DueRecoverds.FindAsync(id);

            if (dueRecoverd == null)
            {
                return NotFound();
            }

            return dueRecoverd;
        }

        // PUT: api/DueRecovereds/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDueRecoverd(int id, DueRecoverd dueRecoverd)
        {
            if (id != dueRecoverd.DueRecoverdId)
            {
                return BadRequest();
            }

            _context.Entry(dueRecoverd).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DueRecoverdExists(id))
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

        // POST: api/DueRecovereds
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DueRecoverd>> PostDueRecoverd(DueRecoverd dueRecoverd)
        {
            _context.DueRecoverds.Add(dueRecoverd);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDueRecoverd", new { id = dueRecoverd.DueRecoverdId }, dueRecoverd);
        }

        // DELETE: api/DueRecovereds/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDueRecoverd(int id)
        {
            var dueRecoverd = await _context.DueRecoverds.FindAsync(id);
            if (dueRecoverd == null)
            {
                return NotFound();
            }

            _context.DueRecoverds.Remove(dueRecoverd);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DueRecoverdExists(int id)
        {
            return _context.DueRecoverds.Any(e => e.DueRecoverdId == id);
        }
    }
}
