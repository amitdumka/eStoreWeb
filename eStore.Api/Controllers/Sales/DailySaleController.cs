using eStore.BL.SalePurchase;
using eStore.Database;
using eStore.Lib.DataHelpers;
using eStore.Shared.Models.Sales;
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
    public class DailySaleController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public DailySaleController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/DailySale
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DailySale>>> GetDailySales()
        {
            return await _context.DailySales.Include(d => d.Salesman).Where(c => c.SaleDate == DateTime.Today).ToListAsync();
        }

        [HttpGet("find")]
        public async Task<ActionResult<IEnumerable<DailySale>>> GetCustomDailySales(int mode, int salesmanId = 0)
        {
            var FilteredData = await FetchCustomDailySalesAsync(mode);
            if (salesmanId > 0)
            {
                FilteredData = FilteredData.Where(c => c.SalesmanId == salesmanId).ToList();
            }

            return FilteredData;
            //return await _context.DailySales.Include(d => d.Salesman).Where(c => c.SaleDate == DateTime.Today).ToListAsync();
        }

        private async Task<List<DailySale>> FetchCustomDailySalesAsync(int mode)
        {
            switch (mode)
            {
                case 1:
                    return await _context.DailySales.Include(d => d.Salesman).Where(c => c.SaleDate == DateTime.Today).ToListAsync();  // Today
                case 0:
                    return await _context.DailySales.Include(d => d.Salesman).Where(c => c.SaleDate == DateTime.Today.AddDays(-1)).ToListAsync();
                    ; // yesterday
                case 7:
                    var start = DateTime.Today.StartOfWeek().Date;
                    var end = DateTime.Today.EndOfWeek().Date; // weekly
                    return await _context.DailySales.Include(d => d.Salesman).Where(c => c.SaleDate.Date >= start.Date && c.SaleDate.Date <= end.Date).ToListAsync();

                case 30:
                    return await _context.DailySales.Include(d => d.Salesman).Where(c => c.SaleDate.Year == DateTime.Today.Year && c.SaleDate.Month == DateTime.Today.Month).ToListAsync();  //monthly
                case 31:
                    return await _context.DailySales.Include(d => d.Salesman).Where(c => c.SaleDate.Year == DateTime.Today.Year && c.SaleDate.Month == DateTime.Today.AddMonths(-1).Month).ToListAsync();  // last month
                case 365:
                    return await _context.DailySales.Include(d => d.Salesman).Where(c => c.SaleDate.Year == DateTime.Today.Year).ToListAsync();
                    ;// yearly
                case 366:
                    return await _context.DailySales.Include(d => d.Salesman).Where(c => c.SaleDate.Year == DateTime.Today.AddYears(-1).Year).ToListAsync();
                    ; //last year
                case 8:
                    var date = DateTime.Today.AddDays(-7);
                    var startL = DateTime.Today.StartOfWeek().Date;
                    var endL = DateTime.Today.EndOfWeek().Date; // weekly
                    return await _context.DailySales.Include(d => d.Salesman).Where(c => c.SaleDate.Date >= startL.Date && c.SaleDate.Date <= endL.Date).ToListAsync();  //last week.
                case 999:
                    return await _context.DailySales.Include(d => d.Salesman).OrderByDescending(c => c.SaleDate).ToListAsync();  //all
                default:
                    return await _context.DailySales.Include(d => d.Salesman).Where(c => c.SaleDate == DateTime.Today).ToListAsync();
            }
        }

        // GET: api/DailySale/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DailySale>> GetDailySale(int id)
        {
            var dailySale = await _context.DailySales.FindAsync(id);

            if (dailySale == null)
            {
                return NotFound();
            }

            dailySale.Salesman = await _context.Salesmen.FindAsync(dailySale.SalesmanId);

            return dailySale;
        }

        // PUT: api/DailySale/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDailySale(int id, DailySale dailySale)
        {
            if (id != dailySale.DailySaleId)
            {
                return BadRequest();
            }

            _context.Entry(dailySale).State = EntityState.Modified;
            new SalesManager().OnUpdate(_context, dailySale);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DailySaleExists(id))
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

        // POST: api/DailySale
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DailySale>> PostDailySale(DailySale dailySale)
        {
            _context.DailySales.Add(dailySale);
            await _context.SaveChangesAsync();
            new SalesManager().OnInsert(_context, dailySale);
            return CreatedAtAction("GetDailySale", new { id = dailySale.DailySaleId }, dailySale);
        }

        // DELETE: api/DailySale/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDailySale(int id)
        {
            var dailySale = await _context.DailySales.FindAsync(id);
            if (dailySale == null)
            {
                return NotFound();
            }
            new SalesManager().OnDelete(_context, dailySale);
            _context.DailySales.Remove(dailySale);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DailySaleExists(int id)
        {
            return _context.DailySales.Any(e => e.DailySaleId == id);
        }
    }
}