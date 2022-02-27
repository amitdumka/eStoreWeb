using AutoMapper;
using eStore.Database;
using eStore.Shared.DTOs.Accounting;
using eStore.Shared.Models.Accounts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class CashPaymentsController : ControllerBase
    {
        private readonly eStoreDbContext _context;
        private readonly IMapper _mapper;

        public CashPaymentsController(eStoreDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/CashPayments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CashPayment>>> GetCashPayments()
        {
            return await _context.CashPayments.Include(c => c.Mode).OrderByDescending(c => c.PaymentDate).ToListAsync();
        }

        // GET: api/CashPayments/dto
        [HttpGet("dto")]
        public IEnumerable<CashPaymentDto> GetCashPaymentsDto() => _mapper.Map<IEnumerable<CashPaymentDto>>(_context.CashPayments.Include(c => c.Mode).Include(c => c.Store).Where(c => c.PaymentDate.Year == DateTime.Today.Year).OrderByDescending(c => c.PaymentDate).ToList());

        // GET: api/CashPayments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CashPayment>> GetCashPayment(int id)
        {
            var cashPayment = await _context.CashPayments.FindAsync(id);

            if (cashPayment == null)
            {
                return NotFound();
            }

            return cashPayment;
        }

        // PUT: api/CashPayments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCashPayment(int id, CashPayment cashPayment)
        {
            if (id != cashPayment.CashPaymentId)
            {
                return BadRequest();
            }

            _context.Entry(cashPayment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CashPaymentExists(id))
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

        // POST: api/CashPayments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CashPayment>> PostCashPayment(CashPayment cashPayment)
        {
            _context.CashPayments.Add(cashPayment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCashPayment", new { id = cashPayment.CashPaymentId }, cashPayment);
        }

        // DELETE: api/CashPayments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCashPayment(int id)
        {
            var cashPayment = await _context.CashPayments.FindAsync(id);
            if (cashPayment == null)
            {
                return NotFound();
            }

            _context.CashPayments.Remove(cashPayment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CashPaymentExists(int id)
        {
            return _context.CashPayments.Any(e => e.CashPaymentId == id);
        }
    }
}