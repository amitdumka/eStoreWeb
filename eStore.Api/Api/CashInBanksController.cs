using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eStore.DL.Data;
using eStore.Shared.Models.Common;
using Microsoft.AspNetCore.Authorization;

namespace eStore.Areas.API
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class CashInBanksController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public CashInBanksController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/CashInBanks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CashInBank>>> GetCashInBanks()
        {
            return await _context.CashInBanks.ToListAsync();
        }

        // GET: api/CashInBanks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CashInBank>> GetCashInBank(int id)
        {
            var cashInBank = await _context.CashInBanks.FindAsync(id);

            if (cashInBank == null)
            {
                return NotFound();
            }

            return cashInBank;
        }

        // PUT: api/CashInBanks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCashInBank(int id, CashInBank cashInBank)
        {
            if (id != cashInBank.CashInBankId)
            {
                return BadRequest();
            }

            _context.Entry(cashInBank).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CashInBankExists(id))
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

        // POST: api/CashInBanks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CashInBank>> PostCashInBank(CashInBank cashInBank)
        {
            _context.CashInBanks.Add(cashInBank);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCashInBank", new { id = cashInBank.CashInBankId }, cashInBank);
        }

        // DELETE: api/CashInBanks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCashInBank(int id)
        {
            var cashInBank = await _context.CashInBanks.FindAsync(id);
            if (cashInBank == null)
            {
                return NotFound();
            }

            _context.CashInBanks.Remove(cashInBank);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CashInBankExists(int id)
        {
            return _context.CashInBanks.Any(e => e.CashInBankId == id);
        }
    }
}
