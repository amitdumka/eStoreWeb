using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eStore.DL.Data;
using eStore.Shared.Models.Sales;
using Microsoft.AspNetCore.Authorization;

namespace eStore.Areas.API
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class WalletPaymentsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public WalletPaymentsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/WalletPayments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WalletPayment>>> GetWalletPayments()
        {
            return await _context.WalletPayments.ToListAsync();
        }

        // GET: api/WalletPayments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WalletPayment>> GetWalletPayment(int id)
        {
            var walletPayment = await _context.WalletPayments.FindAsync(id);

            if (walletPayment == null)
            {
                return NotFound();
            }

            return walletPayment;
        }

        // PUT: api/WalletPayments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWalletPayment(int id, WalletPayment walletPayment)
        {
            if (id != walletPayment.WalletPaymentId)
            {
                return BadRequest();
            }

            _context.Entry(walletPayment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WalletPaymentExists(id))
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

        // POST: api/WalletPayments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WalletPayment>> PostWalletPayment(WalletPayment walletPayment)
        {
            _context.WalletPayments.Add(walletPayment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWalletPayment", new { id = walletPayment.WalletPaymentId }, walletPayment);
        }

        // DELETE: api/WalletPayments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWalletPayment(int id)
        {
            var walletPayment = await _context.WalletPayments.FindAsync(id);
            if (walletPayment == null)
            {
                return NotFound();
            }

            _context.WalletPayments.Remove(walletPayment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WalletPaymentExists(int id)
        {
            return _context.WalletPayments.Any(e => e.WalletPaymentId == id);
        }
    }
}
