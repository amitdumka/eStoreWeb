using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eStore.DL.Data;
using eStore.Shared.Models.Payroll;
using Microsoft.AspNetCore.Authorization;

namespace eStore.Areas.API
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class PaySlipsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public PaySlipsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/PaySlips
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaySlip>>> GetPaySlips()
        {
            return await _context.PaySlips.ToListAsync();
        }

        // GET: api/PaySlips/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaySlip>> GetPaySlip(int id)
        {
            var paySlip = await _context.PaySlips.FindAsync(id);

            if (paySlip == null)
            {
                return NotFound();
            }

            return paySlip;
        }

        // PUT: api/PaySlips/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaySlip(int id, PaySlip paySlip)
        {
            if (id != paySlip.PaySlipId)
            {
                return BadRequest();
            }

            _context.Entry(paySlip).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaySlipExists(id))
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

        // POST: api/PaySlips
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PaySlip>> PostPaySlip(PaySlip paySlip)
        {
            _context.PaySlips.Add(paySlip);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaySlip", new { id = paySlip.PaySlipId }, paySlip);
        }

        // DELETE: api/PaySlips/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaySlip(int id)
        {
            var paySlip = await _context.PaySlips.FindAsync(id);
            if (paySlip == null)
            {
                return NotFound();
            }

            _context.PaySlips.Remove(paySlip);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaySlipExists(int id)
        {
            return _context.PaySlips.Any(e => e.PaySlipId == id);
        }
    }
}
