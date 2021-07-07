using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eStore.DL.Data;
using eStore.Shared.Models.Common;
using Microsoft.AspNetCore.Authorization;

namespace eStore.Areas.API
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class TranscationModesController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public TranscationModesController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/TranscationModes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TranscationMode>>> GetTranscationModes()
        {
            return await _context.TranscationModes.ToListAsync();
        }

        // GET: api/TranscationModes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TranscationMode>> GetTranscationMode(int id)
        {
            var transcationMode = await _context.TranscationModes.FindAsync(id);

            if (transcationMode == null)
            {
                return NotFound();
            }

            return transcationMode;
        }

        // PUT: api/TranscationModes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTranscationMode(int id, TranscationMode transcationMode)
        {
            if (id != transcationMode.TranscationModeId)
            {
                return BadRequest();
            }

            _context.Entry(transcationMode).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TranscationModeExists(id))
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

        // POST: api/TranscationModes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TranscationMode>> PostTranscationMode(TranscationMode transcationMode)
        {
            _context.TranscationModes.Add(transcationMode);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTranscationMode", new { id = transcationMode.TranscationModeId }, transcationMode);
        }

        // DELETE: api/TranscationModes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTranscationMode(int id)
        {
            var transcationMode = await _context.TranscationModes.FindAsync(id);
            if (transcationMode == null)
            {
                return NotFound();
            }

            _context.TranscationModes.Remove(transcationMode);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TranscationModeExists(int id)
        {
            return _context.TranscationModes.Any(e => e.TranscationModeId == id);
        }
    }
}
