using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eStore.DL.Data;
using eStore.Shared.ViewModels.Banking;
using Microsoft.AspNetCore.Authorization;

namespace eStore.Areas.API
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class BankDepositsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public BankDepositsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/BankDeposits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BankDeposit>>> GetBankDeposits()
        {
            return await _context.BankDeposits.Include(c=>c.Account).OrderByDescending(c=>c.OnDate).ToListAsync();
        }

        // GET: api/BankDeposits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BankDeposit>> GetBankDeposit(int id)
        {
            var bankDeposit = await _context.BankDeposits.FindAsync(id);

            if (bankDeposit == null)
            {
                return NotFound();
            }

            return bankDeposit;
        }

        // PUT: api/BankDeposits/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBankDeposit(int id, BankDeposit bankDeposit)
        {
            if (id != bankDeposit.BankDepositId)
            {
                return BadRequest();
            }

            _context.Entry(bankDeposit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BankDepositExists(id))
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

        // POST: api/BankDeposits
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BankDeposit>> PostBankDeposit(BankDeposit bankDeposit)
        {
            _context.BankDeposits.Add(bankDeposit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBankDeposit", new { id = bankDeposit.BankDepositId }, bankDeposit);
        }

        // DELETE: api/BankDeposits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBankDeposit(int id)
        {
            var bankDeposit = await _context.BankDeposits.FindAsync(id);
            if (bankDeposit == null)
            {
                return NotFound();
            }

            _context.BankDeposits.Remove(bankDeposit);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BankDepositExists(int id)
        {
            return _context.BankDeposits.Any(e => e.BankDepositId == id);
        }
    }
}
