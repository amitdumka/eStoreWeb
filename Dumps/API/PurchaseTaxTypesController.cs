using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eStore.DL.Data;
using eStore.Shared.Models.Common;
using Microsoft.AspNetCore.Authorization;

namespace eStore.Areas.API
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class PurchaseTaxTypesController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public PurchaseTaxTypesController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/PurchaseTaxTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PurchaseTaxType>>> GetPurchaseTaxTypes()
        {
            return await _context.PurchaseTaxTypes.ToListAsync();
        }

        // GET: api/PurchaseTaxTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PurchaseTaxType>> GetPurchaseTaxType(int id)
        {
            var purchaseTaxType = await _context.PurchaseTaxTypes.FindAsync(id);

            if (purchaseTaxType == null)
            {
                return NotFound();
            }

            return purchaseTaxType;
        }

        // PUT: api/PurchaseTaxTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPurchaseTaxType(int id, PurchaseTaxType purchaseTaxType)
        {
            if (id != purchaseTaxType.PurchaseTaxTypeId)
            {
                return BadRequest();
            }

            _context.Entry(purchaseTaxType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PurchaseTaxTypeExists(id))
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

        // POST: api/PurchaseTaxTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PurchaseTaxType>> PostPurchaseTaxType(PurchaseTaxType purchaseTaxType)
        {
            _context.PurchaseTaxTypes.Add(purchaseTaxType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPurchaseTaxType", new { id = purchaseTaxType.PurchaseTaxTypeId }, purchaseTaxType);
        }

        // DELETE: api/PurchaseTaxTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePurchaseTaxType(int id)
        {
            var purchaseTaxType = await _context.PurchaseTaxTypes.FindAsync(id);
            if (purchaseTaxType == null)
            {
                return NotFound();
            }

            _context.PurchaseTaxTypes.Remove(purchaseTaxType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PurchaseTaxTypeExists(int id)
        {
            return _context.PurchaseTaxTypes.Any(e => e.PurchaseTaxTypeId == id);
        }
    }
}
