using eStore.Database;
using eStore.Shared.ViewModels.Banking;
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
    public class BankWithdrawalsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public BankWithdrawalsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/BankWithdrawals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BankWithdrawal>>> GetBankWithdrawals()
        {
            return await _context.BankWithdrawals.Include(c => c.Account).OrderByDescending(c => c.OnDate).ToListAsync();
        }

        // GET: api/BankWithdrawals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BankWithdrawal>> GetBankWithdrawal(int id)
        {
            var bankWithdrawal = await _context.BankWithdrawals.FindAsync(id);

            if (bankWithdrawal == null)
            {
                return NotFound();
            }

            return bankWithdrawal;
        }

        // PUT: api/BankWithdrawals/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBankWithdrawal(int id, BankWithdrawal bankWithdrawal)
        {
            if (id != bankWithdrawal.BankWithdrawalId)
            {
                return BadRequest();
            }

            _context.Entry(bankWithdrawal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BankWithdrawalExists(id))
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

        // POST: api/BankWithdrawals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BankWithdrawal>> PostBankWithdrawal(BankWithdrawal bankWithdrawal)
        {
            _context.BankWithdrawals.Add(bankWithdrawal);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBankWithdrawal", new { id = bankWithdrawal.BankWithdrawalId }, bankWithdrawal);
        }

        // DELETE: api/BankWithdrawals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBankWithdrawal(int id)
        {
            var bankWithdrawal = await _context.BankWithdrawals.FindAsync(id);
            if (bankWithdrawal == null)
            {
                return NotFound();
            }

            _context.BankWithdrawals.Remove(bankWithdrawal);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BankWithdrawalExists(int id)
        {
            return _context.BankWithdrawals.Any(e => e.BankWithdrawalId == id);
        }
    }
}