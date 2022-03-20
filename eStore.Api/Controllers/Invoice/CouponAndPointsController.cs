using eStore.Database;
using eStore.SharedModel.Models.Sales.Invoicing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class CouponAndPointsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public CouponAndPointsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/CouponAndPoints
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CouponAndPoint>>> GetCouponAndPoints()
        {
            return await _context.CouponAndPoints.ToListAsync();
        }

        // GET: api/CouponAndPoints/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CouponAndPoint>> GetCouponAndPoint(int id)
        {
            var couponAndPoint = await _context.CouponAndPoints.FindAsync(id);

            if (couponAndPoint == null)
            {
                return NotFound();
            }

            return couponAndPoint;
        }

        // PUT: api/CouponAndPoints/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCouponAndPoint(int id, CouponAndPoint couponAndPoint)
        {
            if (id != couponAndPoint.CouponAndPointId)
            {
                return BadRequest();
            }

            _context.Entry(couponAndPoint).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CouponAndPointExists(id))
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

        // POST: api/CouponAndPoints
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CouponAndPoint>> PostCouponAndPoint(CouponAndPoint couponAndPoint)
        {
            _context.CouponAndPoints.Add(couponAndPoint);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCouponAndPoint", new { id = couponAndPoint.CouponAndPointId }, couponAndPoint);
        }

        // DELETE: api/CouponAndPoints/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCouponAndPoint(int id)
        {
            var couponAndPoint = await _context.CouponAndPoints.FindAsync(id);
            if (couponAndPoint == null)
            {
                return NotFound();
            }

            _context.CouponAndPoints.Remove(couponAndPoint);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CouponAndPointExists(int id)
        {
            return _context.CouponAndPoints.Any(e => e.CouponAndPointId == id);
        }
    }
}