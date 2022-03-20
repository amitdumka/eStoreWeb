using eStore.Database;
using eStore.Shared.Models.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class StockListsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public StockListsController(eStoreDbContext db)
        {
            _context = db;
        }

        // GET: api/StockLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StockList>>> GetStockLists()
        {
            return await _context.StockLists.ToListAsync();
        }

        // GET: api/StockLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StockList>> GetStockList(int id)
        {
            var StockList = await _context.StockLists.FindAsync(id);

            if (StockList == null)
            {
                return NotFound();
            }

            return StockList;
        }

        // PUT: api/StockLists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStockList(int id, StockList StockList)
        {
            if (id != StockList.StockListId)
            {
                return BadRequest();
            }

            _context.Entry(StockList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StockListExists(id))
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

        // PUT: api/StockLists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateRange/{id}")]
        public async Task<IActionResult> PutStockListRange(int id, List<StockList> StockList)
        {
            _context.Entry(StockList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StockListExists(id))
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

        // POST: api/StockLists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StockList>> PostStockList(StockList StockList)
        {
            _context.StockLists.Add(StockList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStockList", new { id = StockList.StockListId }, StockList);
        }

        // POST: api/StockLists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("AddRange")]
        public async Task<ActionResult<bool>> PostStockListRange(List<StockList> StockList)
        {
            _context.StockLists.AddRange(StockList);
            int count = await _context.SaveChangesAsync();
            if (count > 0) return true; else return false;
        }

        // DELETE: api/StockLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStockList(int id)
        {
            var StockList = await _context.StockLists.FindAsync(id);
            if (StockList == null)
            {
                return NotFound();
            }

            _context.StockLists.Remove(StockList);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StockListExists(int id)
        {
            return _context.StockLists.Any(e => e.StockListId == id);
        }
    }
}