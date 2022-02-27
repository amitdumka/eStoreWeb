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
    public class BankPaymentsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public BankPaymentsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/BankPayments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BankPayment>>> GetBankPayments()
        {
            return await _context.BankPayments.ToListAsync();
        }

        // GET: api/BankPayments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BankPayment>> GetBankPayment(int id)
        {
            var bankPayment = await _context.BankPayments.FindAsync(id);

            if (bankPayment == null)
            {
                return NotFound();
            }

            return bankPayment;
        }

        // PUT: api/BankPayments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBankPayment(int id, BankPayment bankPayment)
        {
            if (id != bankPayment.BankPaymentId)
            {
                return BadRequest();
            }

            _context.Entry(bankPayment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BankPaymentExists(id))
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

        // POST: api/BankPayments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BankPayment>> PostBankPayment(BankPayment bankPayment)
        {
            _context.BankPayments.Add(bankPayment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBankPayment", new { id = bankPayment.BankPaymentId }, bankPayment);
        }

        // DELETE: api/BankPayments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBankPayment(int id)
        {
            var bankPayment = await _context.BankPayments.FindAsync(id);
            if (bankPayment == null)
            {
                return NotFound();
            }

            _context.BankPayments.Remove(bankPayment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BankPaymentExists(int id)
        {
            return _context.BankPayments.Any(e => e.BankPaymentId == id);
        }
    }
}