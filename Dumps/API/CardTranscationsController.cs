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
    public class CardTranscationsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public CardTranscationsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/CardTranscations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EDCTranscation>>> GetCardTranscations()
        {
            return await _context.CardTranscations.ToListAsync();
        }

        // GET: api/CardTranscations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EDCTranscation>> GetEDCTranscation(int id)
        {
            var eDCTranscation = await _context.CardTranscations.FindAsync(id);

            if (eDCTranscation == null)
            {
                return NotFound();
            }

            return eDCTranscation;
        }

        // PUT: api/CardTranscations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEDCTranscation(int id, EDCTranscation eDCTranscation)
        {
            if (id != eDCTranscation.EDCTranscationId)
            {
                return BadRequest();
            }

            _context.Entry(eDCTranscation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EDCTranscationExists(id))
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

        // POST: api/CardTranscations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EDCTranscation>> PostEDCTranscation(EDCTranscation eDCTranscation)
        {
            _context.CardTranscations.Add(eDCTranscation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEDCTranscation", new { id = eDCTranscation.EDCTranscationId }, eDCTranscation);
        }

        // DELETE: api/CardTranscations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEDCTranscation(int id)
        {
            var eDCTranscation = await _context.CardTranscations.FindAsync(id);
            if (eDCTranscation == null)
            {
                return NotFound();
            }

            _context.CardTranscations.Remove(eDCTranscation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EDCTranscationExists(int id)
        {
            return _context.CardTranscations.Any(e => e.EDCTranscationId == id);
        }
    }
}
