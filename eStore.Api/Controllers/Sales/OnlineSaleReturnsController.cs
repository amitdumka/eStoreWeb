using eStore.Database;
using eStore.Shared.Models.Sales;
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
    public class OnlineSaleReturnsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public OnlineSaleReturnsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/OnlineSaleReturns
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OnlineSaleReturn>>> GetOnlineSaleReturns()
        {
            return await _context.OnlineSaleReturns.ToListAsync();
        }

        // GET: api/OnlineSaleReturns/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OnlineSaleReturn>> GetOnlineSaleReturn(int id)
        {
            var onlineSaleReturn = await _context.OnlineSaleReturns.FindAsync(id);

            if (onlineSaleReturn == null)
            {
                return NotFound();
            }

            return onlineSaleReturn;
        }

        // PUT: api/OnlineSaleReturns/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOnlineSaleReturn(int id, OnlineSaleReturn onlineSaleReturn)
        {
            if (id != onlineSaleReturn.OnlineSaleReturnId)
            {
                return BadRequest();
            }

            _context.Entry(onlineSaleReturn).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OnlineSaleReturnExists(id))
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

        // POST: api/OnlineSaleReturns
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OnlineSaleReturn>> PostOnlineSaleReturn(OnlineSaleReturn onlineSaleReturn)
        {
            _context.OnlineSaleReturns.Add(onlineSaleReturn);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOnlineSaleReturn", new { id = onlineSaleReturn.OnlineSaleReturnId }, onlineSaleReturn);
        }

        // DELETE: api/OnlineSaleReturns/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOnlineSaleReturn(int id)
        {
            var onlineSaleReturn = await _context.OnlineSaleReturns.FindAsync(id);
            if (onlineSaleReturn == null)
            {
                return NotFound();
            }

            _context.OnlineSaleReturns.Remove(onlineSaleReturn);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OnlineSaleReturnExists(int id)
        {
            return _context.OnlineSaleReturns.Any(e => e.OnlineSaleReturnId == id);
        }
    }
}