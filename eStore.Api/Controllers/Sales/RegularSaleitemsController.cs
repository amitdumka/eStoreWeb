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
    public class RegularSaleitemsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public RegularSaleitemsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/RegularSaleitems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegularSaleItem>>> GetRegularSaleItems()
        {
            return await _context.RegularSaleItems.ToListAsync();
        }

        // GET: api/RegularSaleitems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RegularSaleItem>> GetRegularSaleItem(int id)
        {
            var regularSaleItem = await _context.RegularSaleItems.FindAsync(id);

            if (regularSaleItem == null)
            {
                return NotFound();
            }

            return regularSaleItem;
        }

        // PUT: api/RegularSaleitems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegularSaleItem(int id, RegularSaleItem regularSaleItem)
        {
            if (id != regularSaleItem.RegularSaleItemId)
            {
                return BadRequest();
            }

            _context.Entry(regularSaleItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegularSaleItemExists(id))
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

        // POST: api/RegularSaleitems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RegularSaleItem>> PostRegularSaleItem(RegularSaleItem regularSaleItem)
        {
            _context.RegularSaleItems.Add(regularSaleItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRegularSaleItem", new { id = regularSaleItem.RegularSaleItemId }, regularSaleItem);
        }

        // DELETE: api/RegularSaleitems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegularSaleItem(int id)
        {
            var regularSaleItem = await _context.RegularSaleItems.FindAsync(id);
            if (regularSaleItem == null)
            {
                return NotFound();
            }

            _context.RegularSaleItems.Remove(regularSaleItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegularSaleItemExists(int id)
        {
            return _context.RegularSaleItems.Any(e => e.RegularSaleItemId == id);
        }
    }
}