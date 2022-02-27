using eStore.Database;
using eStore.Shared.Models.Tailoring;
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
    public class TalioringDeliverysController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public TalioringDeliverysController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/TalioringDeliverys
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TalioringDelivery>>> GetTailoringDeliveries()
        {
            return await _context.TailoringDeliveries.Include(c => c.Booking).OrderByDescending(c => c.DeliveryDate).ToListAsync();
        }

        // GET: api/TalioringDeliverys/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TalioringDelivery>> GetTalioringDelivery(int id)
        {
            var talioringDelivery = await _context.TailoringDeliveries.FindAsync(id);

            if (talioringDelivery == null)
            {
                return NotFound();
            }

            return talioringDelivery;
        }

        // PUT: api/TalioringDeliverys/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTalioringDelivery(int id, TalioringDelivery talioringDelivery)
        {
            if (id != talioringDelivery.TalioringDeliveryId)
            {
                return BadRequest();
            }

            _context.Entry(talioringDelivery).State = EntityState.Modified;

            try
            {
                var tb = _context.TalioringBookings.Find(talioringDelivery.TalioringBookingId);
                if (tb != null)
                    tb.IsDelivered = true;
                _context.TalioringBookings.Update(tb);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TalioringDeliveryExists(id))
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

        // POST: api/TalioringDeliverys
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TalioringDelivery>> PostTalioringDelivery(TalioringDelivery talioringDelivery)
        {
            _context.TailoringDeliveries.Add(talioringDelivery);
            var tb = _context.TalioringBookings.Find(talioringDelivery.TalioringBookingId);
            if (tb != null)
                tb.IsDelivered = true;
            _context.TalioringBookings.Update(tb);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTalioringDelivery", new { id = talioringDelivery.TalioringDeliveryId }, talioringDelivery);
        }

        // DELETE: api/TalioringDeliverys/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTalioringDelivery(int id)
        {
            var talioringDelivery = await _context.TailoringDeliveries.FindAsync(id);
            if (talioringDelivery == null)
            {
                return NotFound();
            }

            _context.TailoringDeliveries.Remove(talioringDelivery);
            var tb = _context.TalioringBookings.Find(talioringDelivery);
            if (tb != null)
                tb.IsDelivered = false;
            _context.TalioringBookings.Update(tb);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TalioringDeliveryExists(int id)
        {
            return _context.TailoringDeliveries.Any(e => e.TalioringDeliveryId == id);
        }
    }
}