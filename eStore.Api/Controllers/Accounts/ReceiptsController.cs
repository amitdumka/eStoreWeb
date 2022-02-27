using AutoMapper;
using eStore.Database;
using eStore.Shared.DTOs.Accounting;
using eStore.Shared.Models.Accounts;
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
    public class ReceiptsController : ControllerBase
    {
        private readonly eStoreDbContext _context;
        private readonly IMapper _mapper;

        public ReceiptsController(eStoreDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Receipts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Receipt>>> GetReceipts()
        {
            return await _context.Receipts.Include(c => c.Store).Include(c => c.Party).Include(c => c.FromAccount).OrderByDescending(c => c.OnDate).ToListAsync();
        }

        // GET: api/Receipts/dto
        [HttpGet("dto")]
        public IEnumerable<ReceiptDto> GetReceiptsDto() => _mapper.Map<IEnumerable<ReceiptDto>>(_context.Receipts.Include(c => c.Store).Include(c => c.Party).Include(c => c.FromAccount).OrderByDescending(c => c.OnDate).ToList());

        // GET: api/Receipts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Receipt>> GetReceipt(int id)
        {
            var receipt = await _context.Receipts.FindAsync(id);

            if (receipt == null)
            {
                return NotFound();
            }

            return receipt;
        }

        // PUT: api/Receipts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReceipt(int id, Receipt receipt)
        {
            if (id != receipt.ReceiptId)
            {
                return BadRequest();
            }
            if (receipt.PayMode == PaymentMode.Cash)
            {
                receipt.BankAccountId = null;
            }
            _context.Entry(receipt).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReceiptExists(id))
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

        // POST: api/Receipts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Receipt>> PostReceipt(Receipt receipt)
        {
            if (receipt.PayMode == PaymentMode.Cash)
            {
                receipt.BankAccountId = null;
            }
            _context.Receipts.Add(receipt);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReceipt", new { id = receipt.ReceiptId }, receipt);
        }

        // DELETE: api/Receipts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReceipt(int id)
        {
            var receipt = await _context.Receipts.FindAsync(id);
            if (receipt == null)
            {
                return NotFound();
            }

            _context.Receipts.Remove(receipt);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReceiptExists(int id)
        {
            return _context.Receipts.Any(e => e.ReceiptId == id);
        }
    }
}