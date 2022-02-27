using eStore.Database;
using eStore.Shared.Uploader;
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
    public class TaxRegistersController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public TaxRegistersController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/TaxRegisters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaxRegister>>> GetTaxRegisters()
        {
            return await _context.TaxRegisters.ToListAsync();
        }

        // GET: api/TaxRegisters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaxRegister>> GetTaxRegister(int id)
        {
            var taxRegister = await _context.TaxRegisters.FindAsync(id);

            if (taxRegister == null)
            {
                return NotFound();
            }

            return taxRegister;
        }

        // PUT: api/TaxRegisters/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaxRegister(int id, TaxRegister taxRegister)
        {
            if (id != taxRegister.Id)
            {
                return BadRequest();
            }

            _context.Entry(taxRegister).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaxRegisterExists(id))
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

        // POST: api/TaxRegisters
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TaxRegister>> PostTaxRegister(TaxRegister taxRegister)
        {
            _context.TaxRegisters.Add(taxRegister);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaxRegister", new { id = taxRegister.Id }, taxRegister);
        }

        // DELETE: api/TaxRegisters/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaxRegister(int id)
        {
            var taxRegister = await _context.TaxRegisters.FindAsync(id);
            if (taxRegister == null)
            {
                return NotFound();
            }

            _context.TaxRegisters.Remove(taxRegister);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaxRegisterExists(int id)
        {
            return _context.TaxRegisters.Any(e => e.Id == id);
        }
    }
}