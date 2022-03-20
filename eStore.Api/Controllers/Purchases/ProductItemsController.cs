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
    public class ProductItemsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public ProductItemsController(eStoreDbContext context)
        {
            _context = context;
        }

        [HttpGet("ProductStockViews")]
        public async Task<ActionResult<IEnumerable<ProductStockView>>> GetProductStockViewsAsync()
        {
            return await _context.Stocks.Include(c => c.ProductItem).Select(c => new ProductStockView
            {
                Barcode = c.Barcode,
                MRP = c.ProductItem.MRP,
                Name = c.ProductItem.ProductName,
                ProductType = c.ProductItem.MainCategory,
                TaxRate = c.ProductItem.TaxRate,
                Stock = (decimal)c.Quantity,
                Unit = c.Units
            }).ToListAsync();
        }

        [HttpGet("ProductStockViews{id}")]
        public async Task<ActionResult<ProductStockView>> GetProductStockViewAsync(string id)
        {
            var pItem = await _context.Stocks.Include(c => c.ProductItem).Where(c => c.Barcode == id).Select(c => new ProductStockView
            {
                Barcode = c.Barcode,
                MRP = c.ProductItem.MRP,
                Name = c.ProductItem.ProductName,
                ProductType = c.ProductItem.MainCategory,
                TaxRate = c.ProductItem.TaxRate,
                Stock = (decimal)c.Quantity
                         ,
                Unit = c.Units
            }).FirstOrDefaultAsync();
            if (pItem == null) return NotFound();
            return pItem;
        }

        // GET: api/ProductItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductItem>>> GetProductItems()
        {
            return await _context.ProductItems.ToListAsync();
        }

        // GET: api/ProductItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductItem>> GetProductItem(int id)
        {
            var productItem = await _context.ProductItems.FindAsync(id);

            if (productItem == null)
            {
                return NotFound();
            }

            return productItem;
        }

        // PUT: api/ProductItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductItem(int id, ProductItem productItem)
        {
            if (id != productItem.ProductItemId)
            {
                return BadRequest();
            }

            _context.Entry(productItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductItemExists(id))
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

        // POST: api/ProductItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductItem>> PostProductItem(ProductItem productItem)
        {
            _context.ProductItems.Add(productItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductItem", new { id = productItem.ProductItemId }, productItem);
        }

        // DELETE: api/ProductItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductItem(int id)
        {
            var productItem = await _context.ProductItems.FindAsync(id);
            if (productItem == null)
            {
                return NotFound();
            }

            _context.ProductItems.Remove(productItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductItemExists(int id)
        {
            return _context.ProductItems.Any(e => e.ProductItemId == id);
        }
    }

    //Move to DTO SharedModel and new shared model
    public class ProductStockView
    {
        public string Barcode { get; set; }
        public decimal MRP { get; set; }
        public decimal Stock { get; set; }
        public decimal TaxRate { get; set; }
        public Category ProductType { get; set; }
        public string Name { get; set; }
        public Unit Unit { get; set; }
    }
}