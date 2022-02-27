using eStore.Database;
using eStore.Shared.Models.Payroll;
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
    public class SalariesController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public SalariesController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/Salaries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CurrentSalary>>> GetSalaries()
        {
            return await _context.Salaries.Include(c => c.Employee).ToListAsync();
        }

        // GET: api/Salaries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CurrentSalary>> GetCurrentSalary(int id)
        {
            var currentSalary = await _context.Salaries.FindAsync(id);

            if (currentSalary == null)
            {
                return NotFound();
            }
            currentSalary.Employee = await _context.Employees.FindAsync(currentSalary.EmployeeId);
            return currentSalary;
        }

        // PUT: api/Salaries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCurrentSalary(int id, CurrentSalary currentSalary)
        {
            if (id != currentSalary.CurrentSalaryId)
            {
                return BadRequest();
            }

            _context.Entry(currentSalary).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CurrentSalaryExists(id))
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

        // POST: api/Salaries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CurrentSalary>> PostCurrentSalary(CurrentSalary currentSalary)
        {
            _context.Salaries.Add(currentSalary);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCurrentSalary", new { id = currentSalary.CurrentSalaryId }, currentSalary);
        }

        // DELETE: api/Salaries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCurrentSalary(int id)
        {
            var currentSalary = await _context.Salaries.FindAsync(id);
            if (currentSalary == null)
            {
                return NotFound();
            }

            _context.Salaries.Remove(currentSalary);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CurrentSalaryExists(int id)
        {
            return _context.Salaries.Any(e => e.CurrentSalaryId == id);
        }
    }
}