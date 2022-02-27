using eStore.Database;
using eStore.Shared.Models.Stores;
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
    public class PettyCashBooksController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public PettyCashBooksController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/PettyCashBooks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PettyCashBook>>> GetPettyCashBooks()
        {
            return await _context.PettyCashBooks.ToListAsync();
        }

        // GET: api/PettyCashBooks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PettyCashBook>> GetPettyCashBook(int id)
        {
            var pettyCashBook = await _context.PettyCashBooks.FindAsync(id);

            if (pettyCashBook == null)
            {
                return NotFound();
            }

            return pettyCashBook;
        }

        // PUT: api/PettyCashBooks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPettyCashBook(int id, PettyCashBook pettyCashBook)
        {
            if (id != pettyCashBook.PettyCashBookId)
            {
                return BadRequest();
            }

            _context.Entry(pettyCashBook).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PettyCashBookExists(id))
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

        // POST: api/PettyCashBooks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PettyCashBook>> PostPettyCashBook(PettyCashBook pettyCashBook)
        {
            _context.PettyCashBooks.Add(pettyCashBook);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPettyCashBook", new { id = pettyCashBook.PettyCashBookId }, pettyCashBook);
        }

        // DELETE: api/PettyCashBooks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePettyCashBook(int id)
        {
            var pettyCashBook = await _context.PettyCashBooks.FindAsync(id);
            if (pettyCashBook == null)
            {
                return NotFound();
            }

            _context.PettyCashBooks.Remove(pettyCashBook);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PettyCashBookExists(int id)
        {
            return _context.PettyCashBooks.Any(e => e.PettyCashBookId == id);
        }
    }
}