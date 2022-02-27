using eStore.Database;
using eStore.Shared.Models.Stores;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class PrintedSlipBooksController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public PrintedSlipBooksController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/PrintedSlipBooks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PrintedSlipBook>>> GetPrintedSlipBooks()
        {
            return await _context.PrintedSlipBooks.ToListAsync();
        }

        // GET: api/PrintedSlipBooks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PrintedSlipBook>> GetPrintedSlipBook(int id)
        {
            var printedSlipBook = await _context.PrintedSlipBooks.FindAsync(id);

            if (printedSlipBook == null)
            {
                return NotFound();
            }

            return printedSlipBook;
        }

        // PUT: api/PrintedSlipBooks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrintedSlipBook(int id, PrintedSlipBook printedSlipBook)
        {
            if (id != printedSlipBook.PrintedSlipBookId)
            {
                return BadRequest();
            }

            _context.Entry(printedSlipBook).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrintedSlipBookExists(id))
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

        // POST: api/PrintedSlipBooks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PrintedSlipBook>> PostPrintedSlipBook(PrintedSlipBook printedSlipBook)
        {
            _context.PrintedSlipBooks.Add(printedSlipBook);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPrintedSlipBook", new { id = printedSlipBook.PrintedSlipBookId }, printedSlipBook);
        }

        // DELETE: api/PrintedSlipBooks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrintedSlipBook(int id)
        {
            var printedSlipBook = await _context.PrintedSlipBooks.FindAsync(id);
            if (printedSlipBook == null)
            {
                return NotFound();
            }

            _context.PrintedSlipBooks.Remove(printedSlipBook);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PrintedSlipBookExists(int id)
        {
            return _context.PrintedSlipBooks.Any(e => e.PrintedSlipBookId == id);
        }
    }
}