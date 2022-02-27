using eStore.Database;
using eStore.Shared.Models.Accounts.Expenses;
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
    public class RentedLocationsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public RentedLocationsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/RentedLocations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RentedLocation>>> GetRentedLocations()
        {
            return await _context.RentedLocations.ToListAsync();
        }

        // GET: api/RentedLocations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RentedLocation>> GetRentedLocation(int id)
        {
            var rentedLocation = await _context.RentedLocations.FindAsync(id);

            if (rentedLocation == null)
            {
                return NotFound();
            }

            return rentedLocation;
        }

        // PUT: api/RentedLocations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRentedLocation(int id, RentedLocation rentedLocation)
        {
            if (id != rentedLocation.RentedLocationId)
            {
                return BadRequest();
            }

            _context.Entry(rentedLocation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentedLocationExists(id))
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

        // POST: api/RentedLocations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RentedLocation>> PostRentedLocation(RentedLocation rentedLocation)
        {
            _context.RentedLocations.Add(rentedLocation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRentedLocation", new { id = rentedLocation.RentedLocationId }, rentedLocation);
        }

        // DELETE: api/RentedLocations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRentedLocation(int id)
        {
            var rentedLocation = await _context.RentedLocations.FindAsync(id);
            if (rentedLocation == null)
            {
                return NotFound();
            }

            _context.RentedLocations.Remove(rentedLocation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RentedLocationExists(int id)
        {
            return _context.RentedLocations.Any(e => e.RentedLocationId == id);
        }
    }
}