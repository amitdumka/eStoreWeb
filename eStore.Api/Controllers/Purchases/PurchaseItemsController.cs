using eStore.Database;
using eStore.Shared.Models.Purchases;
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
    public class PurchaseItemsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public PurchaseItemsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/PurchaseItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PurchaseItem>>> GetPurchaseItem()
        {
            return await _context.PurchaseItem.ToListAsync();
        }

        // GET: api/PurchaseItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PurchaseItem>> GetPurchaseItem(int id)
        {
            var purchaseItem = await _context.PurchaseItem.FindAsync(id);

            if (purchaseItem == null)
            {
                return NotFound();
            }

            return purchaseItem;
        }

        // PUT: api/PurchaseItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPurchaseItem(int id, PurchaseItem purchaseItem)
        {
            if (id != purchaseItem.PurchaseItemId)
            {
                return BadRequest();
            }

            _context.Entry(purchaseItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PurchaseItemExists(id))
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

        // POST: api/PurchaseItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PurchaseItem>> PostPurchaseItem(PurchaseItem purchaseItem)
        {
            _context.PurchaseItem.Add(purchaseItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPurchaseItem", new { id = purchaseItem.PurchaseItemId }, purchaseItem);
        }

        // DELETE: api/PurchaseItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePurchaseItem(int id)
        {
            var purchaseItem = await _context.PurchaseItem.FindAsync(id);
            if (purchaseItem == null)
            {
                return NotFound();
            }

            _context.PurchaseItem.Remove(purchaseItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PurchaseItemExists(int id)
        {
            return _context.PurchaseItem.Any(e => e.PurchaseItemId == id);
        }
    }
}