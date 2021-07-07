using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eStore.DL.Data;
using eStore.Shared.Models.Tailoring;
using Microsoft.AspNetCore.Authorization;

namespace eStore.Areas.API
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class TailoringBookingsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public TailoringBookingsController(eStoreDbContext context)
        {
            _context = context;
        }

        [HttpGet("pending")]
        public async Task<ActionResult<IEnumerable<TalioringBooking>>> PendingBooking()
        {
            var vd = _context.TalioringBookings.Where(c => c.IsDelivered == false);

            if (vd != null)
                return await vd.ToListAsync();
            else
                return NotFound();
        }

        [HttpGet("pending/{id}")]
        public async Task<ActionResult<IEnumerable<TalioringBooking>>> PendingBooking(int id)
        {
            var vd = _context.TalioringBookings.Where(c => c.IsDelivered == false && c.StoreId==id);

            if (vd != null)
                return await vd.ToListAsync();
            else
                return NotFound();
        }

        // GET: api/TailoringBookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TalioringBooking>>> GetTalioringBookings()
        {
            return await _context.TalioringBookings.Where(c=>c.DeliveryDate.Year == DateTime.Today.Year).OrderByDescending(c => c.BookingDate).ThenByDescending(c => c.DeliveryDate).ToListAsync();
        }

        // GET: api/TailoringBookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TalioringBooking>> GetTalioringBooking(int id)
        {
            var talioringBooking = await _context.TalioringBookings.FindAsync(id);

            if (talioringBooking == null)
            {
                return NotFound();
            }

            return talioringBooking;
        }

        // PUT: api/TailoringBookings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTalioringBooking(int id, TalioringBooking talioringBooking)
        {
            if (id != talioringBooking.TalioringBookingId)
            {
                return BadRequest();
            }

            _context.Entry(talioringBooking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TalioringBookingExists(id))
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

        // POST: api/TailoringBookings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TalioringBooking>> PostTalioringBooking(TalioringBooking talioringBooking)
        {
            _context.TalioringBookings.Add(talioringBooking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTalioringBooking", new { id = talioringBooking.TalioringBookingId }, talioringBooking);
        }

        // DELETE: api/TailoringBookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTalioringBooking(int id)
        {
            var talioringBooking = await _context.TalioringBookings.FindAsync(id);
            if (talioringBooking == null)
            {
                return NotFound();
            }

            _context.TalioringBookings.Remove(talioringBooking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TalioringBookingExists(int id)
        {
            return _context.TalioringBookings.Any(e => e.TalioringBookingId == id);
        }

    }
}
