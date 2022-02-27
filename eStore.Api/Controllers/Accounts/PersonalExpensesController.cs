using eStore.Database;
using eStore.Shared.Models.Personals;
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
    public class PersonalExpensesController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public PersonalExpensesController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/PersonalExpenses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PersonalExpense>>> GetPersonalExpenses()
        {
            return await _context.PersonalExpenses.ToListAsync();
        }

        // GET: api/PersonalExpenses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PersonalExpense>> GetPersonalExpense(int id)
        {
            var personalExpense = await _context.PersonalExpenses.FindAsync(id);

            if (personalExpense == null)
            {
                return NotFound();
            }

            return personalExpense;
        }

        // PUT: api/PersonalExpenses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersonalExpense(int id, PersonalExpense personalExpense)
        {
            if (id != personalExpense.PersonalExpenseId)
            {
                return BadRequest();
            }

            _context.Entry(personalExpense).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonalExpenseExists(id))
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

        // POST: api/PersonalExpenses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PersonalExpense>> PostPersonalExpense(PersonalExpense personalExpense)
        {
            _context.PersonalExpenses.Add(personalExpense);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPersonalExpense", new { id = personalExpense.PersonalExpenseId }, personalExpense);
        }

        // DELETE: api/PersonalExpenses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersonalExpense(int id)
        {
            var personalExpense = await _context.PersonalExpenses.FindAsync(id);
            if (personalExpense == null)
            {
                return NotFound();
            }

            _context.PersonalExpenses.Remove(personalExpense);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PersonalExpenseExists(int id)
        {
            return _context.PersonalExpenses.Any(e => e.PersonalExpenseId == id);
        }
    }
}