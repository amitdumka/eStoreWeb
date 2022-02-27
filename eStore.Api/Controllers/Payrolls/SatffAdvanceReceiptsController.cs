using eStore.Database;
using eStore.Shared.Models.Payroll;
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
    public class SatffAdvanceReceiptsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public SatffAdvanceReceiptsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/SatffAdvanceReceipts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StaffAdvanceReceipt>>> GetStaffAdvanceReceipts()
        {
            return await _context.StaffAdvanceReceipts.ToListAsync();
        }

        // GET: api/SatffAdvanceReceipts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StaffAdvanceReceipt>> GetStaffAdvanceReceipt(int id)
        {
            var staffAdvanceReceipt = await _context.StaffAdvanceReceipts.FindAsync(id);

            if (staffAdvanceReceipt == null)
            {
                return NotFound();
            }

            return staffAdvanceReceipt;
        }

        // PUT: api/SatffAdvanceReceipts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStaffAdvanceReceipt(int id, StaffAdvanceReceipt staffAdvanceReceipt)
        {
            if (id != staffAdvanceReceipt.StaffAdvanceReceiptId)
            {
                return BadRequest();
            }

            _context.Entry(staffAdvanceReceipt).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StaffAdvanceReceiptExists(id))
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

        // POST: api/SatffAdvanceReceipts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StaffAdvanceReceipt>> PostStaffAdvanceReceipt(StaffAdvanceReceipt staffAdvanceReceipt)
        {
            _context.StaffAdvanceReceipts.Add(staffAdvanceReceipt);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStaffAdvanceReceipt", new { id = staffAdvanceReceipt.StaffAdvanceReceiptId }, staffAdvanceReceipt);
        }

        // DELETE: api/SatffAdvanceReceipts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStaffAdvanceReceipt(int id)
        {
            var staffAdvanceReceipt = await _context.StaffAdvanceReceipts.FindAsync(id);
            if (staffAdvanceReceipt == null)
            {
                return NotFound();
            }

            _context.StaffAdvanceReceipts.Remove(staffAdvanceReceipt);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StaffAdvanceReceiptExists(int id)
        {
            return _context.StaffAdvanceReceipts.Any(e => e.StaffAdvanceReceiptId == id);
        }
    }
}