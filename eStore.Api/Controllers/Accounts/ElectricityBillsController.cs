using eStore.Database;
using eStore.Shared.Models.Accounts.Expenses;
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
    public class ElectricityBillsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public ElectricityBillsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/ElectricityBills
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EletricityBill>>> GetEletricityBills()
        {
            return await _context.EletricityBills.Include(c => c.Connection).OrderByDescending(c => c.BillDate).ToListAsync();
        }

        // GET: api/ElectricityBills/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EletricityBill>> GetEletricityBill(int id)
        {
            var eletricityBill = await _context.EletricityBills.FindAsync(id);

            if (eletricityBill == null)
            {
                return NotFound();
            }

            return eletricityBill;
        }

        // PUT: api/ElectricityBills/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEletricityBill(int id, EletricityBill eletricityBill)
        {
            if (id != eletricityBill.EletricityBillId)
            {
                return BadRequest();
            }

            _context.Entry(eletricityBill).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EletricityBillExists(id))
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

        // POST: api/ElectricityBills
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EletricityBill>> PostEletricityBill(EletricityBill eletricityBill)
        {
            _context.EletricityBills.Add(eletricityBill);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEletricityBill", new { id = eletricityBill.EletricityBillId }, eletricityBill);
        }

        // DELETE: api/ElectricityBills/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEletricityBill(int id)
        {
            var eletricityBill = await _context.EletricityBills.FindAsync(id);
            if (eletricityBill == null)
            {
                return NotFound();
            }

            _context.EletricityBills.Remove(eletricityBill);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EletricityBillExists(int id)
        {
            return _context.EletricityBills.Any(e => e.EletricityBillId == id);
        }
    }
}