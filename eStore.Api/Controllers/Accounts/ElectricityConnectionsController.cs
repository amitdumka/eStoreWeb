using eStore.Database;
using eStore.Shared.Models.Accounts.Expenses;
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
    public class ElectricityConnectionsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public ElectricityConnectionsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/ElectricityConnections
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ElectricityConnection>>> GetElectricityConnections()
        {
            return await _context.ElectricityConnections.ToListAsync();
        }

        // GET: api/ElectricityConnections/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ElectricityConnection>> GetElectricityConnection(int id)
        {
            var electricityConnection = await _context.ElectricityConnections.FindAsync(id);

            if (electricityConnection == null)
            {
                return NotFound();
            }

            return electricityConnection;
        }

        // PUT: api/ElectricityConnections/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutElectricityConnection(int id, ElectricityConnection electricityConnection)
        {
            if (id != electricityConnection.ElectricityConnectionId)
            {
                return BadRequest();
            }

            _context.Entry(electricityConnection).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ElectricityConnectionExists(id))
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

        // POST: api/ElectricityConnections
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ElectricityConnection>> PostElectricityConnection(ElectricityConnection electricityConnection)
        {
            _context.ElectricityConnections.Add(electricityConnection);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetElectricityConnection", new { id = electricityConnection.ElectricityConnectionId }, electricityConnection);
        }

        // DELETE: api/ElectricityConnections/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteElectricityConnection(int id)
        {
            var electricityConnection = await _context.ElectricityConnections.FindAsync(id);
            if (electricityConnection == null)
            {
                return NotFound();
            }

            _context.ElectricityConnections.Remove(electricityConnection);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ElectricityConnectionExists(int id)
        {
            return _context.ElectricityConnections.Any(e => e.ElectricityConnectionId == id);
        }
    }
}