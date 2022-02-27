using eStore.Database;
using eStore.Shared.Models.Common;
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
    public class CashDetailsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public CashDetailsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/CashDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CashDetail>>> GetCashDetail()
        {
            return await _context.CashDetail.ToListAsync();
        }

        // GET: api/CashDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CashDetail>> GetCashDetail(int id)
        {
            var cashDetail = await _context.CashDetail.FindAsync(id);

            if (cashDetail == null)
            {
                return NotFound();
            }

            return cashDetail;
        }

        // PUT: api/CashDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCashDetail(int id, CashDetail cashDetail)
        {
            if (id != cashDetail.CashDetailId)
            {
                return BadRequest();
            }

            _context.Entry(cashDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CashDetailExists(id))
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

        // POST: api/CashDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CashDetail>> PostCashDetail(CashDetail cashDetail)
        {
            _context.CashDetail.Add(cashDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCashDetail", new { id = cashDetail.CashDetailId }, cashDetail);
        }

        // DELETE: api/CashDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCashDetail(int id)
        {
            var cashDetail = await _context.CashDetail.FindAsync(id);
            if (cashDetail == null)
            {
                return NotFound();
            }

            _context.CashDetail.Remove(cashDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CashDetailExists(int id)
        {
            return _context.CashDetail.Any(e => e.CashDetailId == id);
        }
    }
}