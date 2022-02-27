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
    public class MixAndCouponPaymentsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public MixAndCouponPaymentsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/MixAndCouponPayments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MixAndCouponPayment>>> GetMixPayments()
        {
            return await _context.MixPayments.ToListAsync();
        }

        // GET: api/MixAndCouponPayments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MixAndCouponPayment>> GetMixAndCouponPayment(int id)
        {
            var mixAndCouponPayment = await _context.MixPayments.FindAsync(id);

            if (mixAndCouponPayment == null)
            {
                return NotFound();
            }

            return mixAndCouponPayment;
        }

        // PUT: api/MixAndCouponPayments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMixAndCouponPayment(int id, MixAndCouponPayment mixAndCouponPayment)
        {
            if (id != mixAndCouponPayment.MixAndCouponPaymentId)
            {
                return BadRequest();
            }

            _context.Entry(mixAndCouponPayment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MixAndCouponPaymentExists(id))
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

        // POST: api/MixAndCouponPayments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MixAndCouponPayment>> PostMixAndCouponPayment(MixAndCouponPayment mixAndCouponPayment)
        {
            _context.MixPayments.Add(mixAndCouponPayment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMixAndCouponPayment", new { id = mixAndCouponPayment.MixAndCouponPaymentId }, mixAndCouponPayment);
        }

        // DELETE: api/MixAndCouponPayments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMixAndCouponPayment(int id)
        {
            var mixAndCouponPayment = await _context.MixPayments.FindAsync(id);
            if (mixAndCouponPayment == null)
            {
                return NotFound();
            }

            _context.MixPayments.Remove(mixAndCouponPayment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MixAndCouponPaymentExists(int id)
        {
            return _context.MixPayments.Any(e => e.MixAndCouponPaymentId == id);
        }
    }
}