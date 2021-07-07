using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eStore.DL.Data;
using eStore.Shared.Models.Accounts.Expenses;
using Microsoft.AspNetCore.Authorization;

namespace eStore.Areas.API
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class EBillPaymentsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public EBillPaymentsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/EBillPayments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EBillPayment>>> GetBillPayments()
        {
            return await _context.BillPayments.Include(c=>c.Bill).ThenInclude(c=>c.Connection).OrderByDescending(c=>c.PaymentDate).ToListAsync();
        }

        // GET: api/EBillPayments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EBillPayment>> GetEBillPayment(int id)
        {
            var eBillPayment = await _context.BillPayments.FindAsync(id);

            if (eBillPayment == null)
            {
                return NotFound();
            }

            return eBillPayment;
        }

        // PUT: api/EBillPayments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEBillPayment(int id, EBillPayment eBillPayment)
        {
            if (id != eBillPayment.EBillPaymentId)
            {
                return BadRequest();
            }

            _context.Entry(eBillPayment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EBillPaymentExists(id))
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

        // POST: api/EBillPayments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EBillPayment>> PostEBillPayment(EBillPayment eBillPayment)
        {
            _context.BillPayments.Add(eBillPayment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEBillPayment", new { id = eBillPayment.EBillPaymentId }, eBillPayment);
        }

        // DELETE: api/EBillPayments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEBillPayment(int id)
        {
            var eBillPayment = await _context.BillPayments.FindAsync(id);
            if (eBillPayment == null)
            {
                return NotFound();
            }

            _context.BillPayments.Remove(eBillPayment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EBillPaymentExists(int id)
        {
            return _context.BillPayments.Any(e => e.EBillPaymentId == id);
        }
    }
}
