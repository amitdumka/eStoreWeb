using eStore.Database;
using eStore.Shared.Models.Sales.Payments;
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
    public class PointRedeemedsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public PointRedeemedsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/PointRedeemeds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PointRedeemed>>> GetPointRedeemeds()
        {
            return await _context.PointRedeemeds.ToListAsync();
        }

        // GET: api/PointRedeemeds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PointRedeemed>> GetPointRedeemed(int id)
        {
            var pointRedeemed = await _context.PointRedeemeds.FindAsync(id);

            if (pointRedeemed == null)
            {
                return NotFound();
            }

            return pointRedeemed;
        }

        // PUT: api/PointRedeemeds/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPointRedeemed(int id, PointRedeemed pointRedeemed)
        {
            if (id != pointRedeemed.PointRedeemedId)
            {
                return BadRequest();
            }

            _context.Entry(pointRedeemed).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PointRedeemedExists(id))
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

        // POST: api/PointRedeemeds
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PointRedeemed>> PostPointRedeemed(PointRedeemed pointRedeemed)
        {
            _context.PointRedeemeds.Add(pointRedeemed);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPointRedeemed", new { id = pointRedeemed.PointRedeemedId }, pointRedeemed);
        }

        // DELETE: api/PointRedeemeds/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePointRedeemed(int id)
        {
            var pointRedeemed = await _context.PointRedeemeds.FindAsync(id);
            if (pointRedeemed == null)
            {
                return NotFound();
            }

            _context.PointRedeemeds.Remove(pointRedeemed);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PointRedeemedExists(int id)
        {
            return _context.PointRedeemeds.Any(e => e.PointRedeemedId == id);
        }
    }
}