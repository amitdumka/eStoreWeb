using eStore.Database;
using eStore.Shared.Models.Stores;
using eStore.Shared.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class EndOfDaysController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public EndOfDaysController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/EndOfDays
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EndOfDay>>> GetEndOfDays()
        {
            return await _context.EndOfDays.ToListAsync();
        }

        // GET: api/EndOfDays/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EndOfDay>> GetEndOfDay(int id)
        {
            var endOfDay = await _context.EndOfDays.FindAsync(id);

            if (endOfDay == null)
            {
                return NotFound();
            }

            return endOfDay;
        }

        // PUT: api/EndOfDays/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEndOfDay(int id, EndOfDay endOfDay)
        {
            if (id != endOfDay.EndOfDayId)
            {
                return BadRequest();
            }

            _context.Entry(endOfDay).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EndOfDayExists(id))
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

        // POST: api/EndOfDays
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EndOfDay>> PostEndOfDay(EndOfDay endOfDay)
        {
            _context.EndOfDays.Add(endOfDay);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEndOfDay", new { id = endOfDay.EndOfDayId }, endOfDay);
        }

        // DELETE: api/EndOfDays/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEndOfDay(int id)
        {
            var endOfDay = await _context.EndOfDays.FindAsync(id);
            if (endOfDay == null)
            {
                return NotFound();
            }

            _context.EndOfDays.Remove(endOfDay);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EndOfDayExists(int id)
        {
            return _context.EndOfDays.Any(e => e.EndOfDayId == id);
        }

        [HttpPost("dayend")]
        public async Task<ActionResult<EndOfDay>> PostDayEnd(DayEnd endOfDay)
        {
            _context.EndOfDays.Add(endOfDay.EndOfDay);
            _context.CashDetail.Add(endOfDay.CashDetail);
            int c = await _context.SaveChangesAsync();
            return CreatedAtAction("GetEndOfDay", new { id = endOfDay.EndOfDay.EndOfDayId }, endOfDay.EndOfDay);
        }

        // GET: api/EndOfDays/5
        [HttpGet("saledata")]
        public async Task<ActionResult<string>> GetSaleData(DateTime onDate)
        {
            var saleAmount = await _context.DailySales.Where(c => c.SaleDate == onDate).Select(c => c.Amount).SumAsync();
            var count = await _context.DailySales.Where(c => c.SaleDate == onDate).CountAsync();

            string r = $"{{ amount:{saleAmount}, count:{count} }}";

            //var endOfDay = await _context.EndOfDays.FindAsync(id);

            //if (endOfDay == null)
            //{
            //    return NotFound();
            //}

            //return endOfDay;
            return r;
        }
    }
}