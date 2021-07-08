using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eStore.Database;
using eStore.Shared.Models.Accounts;
using Microsoft.AspNetCore.Authorization;
using eStore.Shared.DTOs.Accounting;
using AutoMapper;

namespace eStore.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ExpensesController : ControllerBase
    {
        private readonly eStoreDbContext _context;
        private readonly IMapper _mapper;

        public ExpensesController(eStoreDbContext context, IMapper mapper)
        {
            _context = context;_mapper = mapper;
        }

        // GET: api/Expenses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Expense>>> GetExpenses()
        {
            return await _context.Expenses.Include(c=>c.PaidBy).Include(c=>c.Party).Include(c=>c.FromAccount).Where(c=>c.OnDate.Date.Year==DateTime.Today.Year).OrderByDescending(c=>c.OnDate).ToListAsync();

        }

        [HttpGet("dto")]
        public IEnumerable<ExpenseDto> GetExpenseDtos()
        {
            var data= _context.Expenses.Include(c => c.PaidBy).Include(c => c.Party).Include(c => c.FromAccount).Where(c => c.OnDate.Date.Year == DateTime.Today.Year).OrderByDescending(c=>c.OnDate).ToList();
            return _mapper.Map<IEnumerable<ExpenseDto>>(data);
        }

        // GET: api/Expenses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Expense>> GetExpense(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);

            if (expense == null)
            {
                return NotFound();
            }

            return expense;
        }

        // PUT: api/Expenses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpense(int id, Expense expense)
        {
            if (id != expense.ExpenseId)
            {
                return BadRequest();
            }

            _context.Entry(expense).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenseExists(id))
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

        // POST: api/Expenses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Expense>> PostExpense(Expense expense)
        {
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExpense", new { id = expense.ExpenseId }, expense);
        }

        // DELETE: api/Expenses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense == null)
            {
                return NotFound();
            }

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExpenseExists(int id)
        {
            return _context.Expenses.Any(e => e.ExpenseId == id);
        }
    }
}
