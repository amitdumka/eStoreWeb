using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eStore.DL.Data;
using eStore.Shared.Models.Sales;
using Microsoft.AspNetCore.Authorization;

namespace eStore.Areas.API
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class OnlineSalesController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public OnlineSalesController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/OnlineSales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OnlineSale>>> GetOnlineSales()
        {
            return await _context.OnlineSales.ToListAsync();
        }

        // GET: api/OnlineSales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OnlineSale>> GetOnlineSale(int id)
        {
            var onlineSale = await _context.OnlineSales.FindAsync(id);

            if (onlineSale == null)
            {
                return NotFound();
            }

            return onlineSale;
        }

        // PUT: api/OnlineSales/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOnlineSale(int id, OnlineSale onlineSale)
        {
            if (id != onlineSale.OnlineSaleId)
            {
                return BadRequest();
            }

            _context.Entry(onlineSale).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OnlineSaleExists(id))
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

        // POST: api/OnlineSales
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OnlineSale>> PostOnlineSale(OnlineSale onlineSale)
        {
            _context.OnlineSales.Add(onlineSale);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOnlineSale", new { id = onlineSale.OnlineSaleId }, onlineSale);
        }

        // DELETE: api/OnlineSales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOnlineSale(int id)
        {
            var onlineSale = await _context.OnlineSales.FindAsync(id);
            if (onlineSale == null)
            {
                return NotFound();
            }

            _context.OnlineSales.Remove(onlineSale);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OnlineSaleExists(int id)
        {
            return _context.OnlineSales.Any(e => e.OnlineSaleId == id);
        }
    }
}
