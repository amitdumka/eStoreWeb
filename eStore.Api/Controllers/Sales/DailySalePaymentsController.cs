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
    public class DailySalePaymentsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public DailySalePaymentsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/DailySalePayments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DailySalePayment>>> GetDailySalePayments()
        {
            return await _context.DailySalePayments.ToListAsync();
        }

        // GET: api/DailySalePayments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DailySalePayment>> GetPayment(int id)
        {
            var payment = await _context.DailySalePayments.FindAsync(id);

            if (payment == null)
            {
                return NotFound();
            }

            return payment;
        }

        // PUT: api/DailySalePayments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayment(int id, DailySalePayment payment)
        {
            if (id != payment.DailySalePaymentId)
            {
                return BadRequest();
            }

            _context.Entry(payment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentExists(id))
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

        // POST: api/DailySalePayments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DailySalePayment>> PostPayment(DailySalePayment payment)
        {
            _context.DailySalePayments.Add(payment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPayment", new { id = payment.DailySalePaymentId }, payment);
        }

        // DELETE: api/DailySalePayments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            var payment = await _context.DailySalePayments.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            _context.DailySalePayments.Remove(payment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaymentExists(int id)
        {
            return _context.DailySalePayments.Any(e => e.DailySalePaymentId == id);
        }
    }
}