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
    public class CouponPaymentsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public CouponPaymentsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/CouponPayments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CouponPayment>>> GetCouponPayments()
        {
            return await _context.CouponPayments.ToListAsync();
        }

        // GET: api/CouponPayments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CouponPayment>> GetCouponPayment(int id)
        {
            var couponPayment = await _context.CouponPayments.FindAsync(id);

            if (couponPayment == null)
            {
                return NotFound();
            }

            return couponPayment;
        }

        // PUT: api/CouponPayments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCouponPayment(int id, CouponPayment couponPayment)
        {
            if (id != couponPayment.CouponPaymentId)
            {
                return BadRequest();
            }

            _context.Entry(couponPayment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CouponPaymentExists(id))
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

        // POST: api/CouponPayments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CouponPayment>> PostCouponPayment(CouponPayment couponPayment)
        {
            _context.CouponPayments.Add(couponPayment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCouponPayment", new { id = couponPayment.CouponPaymentId }, couponPayment);
        }

        // DELETE: api/CouponPayments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCouponPayment(int id)
        {
            var couponPayment = await _context.CouponPayments.FindAsync(id);
            if (couponPayment == null)
            {
                return NotFound();
            }

            _context.CouponPayments.Remove(couponPayment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CouponPaymentExists(int id)
        {
            return _context.CouponPayments.Any(e => e.CouponPaymentId == id);
        }
    }
}