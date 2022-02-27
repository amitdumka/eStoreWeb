using eStore.Database;
using eStore.Shared.Models.Common;
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
    public class SaleTaxTypesController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public SaleTaxTypesController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/SaleTaxTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SaleTaxType>>> GetSaleTaxTypes()
        {
            return await _context.SaleTaxTypes.ToListAsync();
        }

        // GET: api/SaleTaxTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SaleTaxType>> GetSaleTaxType(int id)
        {
            var saleTaxType = await _context.SaleTaxTypes.FindAsync(id);

            if (saleTaxType == null)
            {
                return NotFound();
            }

            return saleTaxType;
        }

        // PUT: api/SaleTaxTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSaleTaxType(int id, SaleTaxType saleTaxType)
        {
            if (id != saleTaxType.SaleTaxTypeId)
            {
                return BadRequest();
            }

            _context.Entry(saleTaxType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleTaxTypeExists(id))
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

        // POST: api/SaleTaxTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SaleTaxType>> PostSaleTaxType(SaleTaxType saleTaxType)
        {
            _context.SaleTaxTypes.Add(saleTaxType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSaleTaxType", new { id = saleTaxType.SaleTaxTypeId }, saleTaxType);
        }

        // DELETE: api/SaleTaxTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSaleTaxType(int id)
        {
            var saleTaxType = await _context.SaleTaxTypes.FindAsync(id);
            if (saleTaxType == null)
            {
                return NotFound();
            }

            _context.SaleTaxTypes.Remove(saleTaxType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SaleTaxTypeExists(int id)
        {
            return _context.SaleTaxTypes.Any(e => e.SaleTaxTypeId == id);
        }
    }
}