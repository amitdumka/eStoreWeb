using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eStore.Shared.Models.Banking;
using Microsoft.AspNetCore.Authorization;
using eStore.Database;

namespace eStore.Controllers//eStore.Areas.API
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class BanksController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public BanksController(eStoreDbContext context)
        {
            _context = context;
        }

        [HttpGet ("{id}")]
        public IEnumerable<string> GetBankTemp(int id)
        {
            List<string> vs = new List<string> ();
            vs.Add ("aaa");
            vs.Add ("baa");
            vs.Add ("faa");
            vs.Add ("traa");
            vs.Add ("saaa");
            vs.Add ("daaa");

            return vs;
        }


        // GET: api/Banks
        [HttpGet]
        //public async Task<ActionResult<IEnumerable<Bank>>> GetBanks()
        public IEnumerable<Bank> GetBanks()
        {
            return _context.Banks.ToList ();
        }

        // GET: api/Banks/5
        //[HttpGet ("{id}")]
        //public async Task<ActionResult<Bank>> GetBank(int id)
        //{
        //    var bank = await _context.Banks.FindAsync (id);

        //    if ( bank == null )
        //    {
        //        return NotFound ();
        //    }

        //    return bank;
        //}

        // PUT: api/Banks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut ("{id}")]
        public async Task<IActionResult> PutBank(int id, Bank bank)
        {
            if ( id != bank.BankId )
            {
                return BadRequest ();
            }

            _context.Entry (bank).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync ();
            }
            catch ( DbUpdateConcurrencyException )
            {
                if ( !BankExists (id) )
                {
                    return NotFound ();
                }
                else
                {
                    throw;
                }
            }

            return NoContent ();
        }

        // POST: api/Banks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Bank>> PostBank(Bank bank)
        {
            _context.Banks.Add (bank);
            await _context.SaveChangesAsync ();

            return CreatedAtAction ("GetBank", new { id = bank.BankId }, bank);
        }

        // DELETE: api/Banks/5
        [HttpDelete ("{id}")]
        public async Task<IActionResult> DeleteBank(int id)
        {
            var bank = await _context.Banks.FindAsync (id);
            if ( bank == null )
            {
                return NotFound ();
            }

            _context.Banks.Remove (bank);
            await _context.SaveChangesAsync ();

            return NoContent ();
        }

        private bool BankExists(int id)
        {
            return _context.Banks.Any (e => e.BankId == id);
        }
    }
}
