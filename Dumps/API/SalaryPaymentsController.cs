using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eStore.DL.Data;
using eStore.Shared.Models.Payroll;
using Microsoft.AspNetCore.Authorization;
using eStore.Shared.DTOs.Payrolls;
using AutoMapper;

namespace eStore.Areas.API
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class SalaryPaymentsController : ControllerBase
    {
        private readonly eStoreDbContext _context;
        private readonly IMapper _mapper;

        public SalaryPaymentsController(eStoreDbContext context, IMapper mapper)
        {
            _context = context; _mapper = mapper;
        }

        // GET: api/SalaryPayments
      /*  [HttpGet]
        public async Task<ActionResult<IEnumerable<SalaryPayment>>> GetSalaryPaymentsAsync()
        {
            return await _context.SalaryPayments.Include(c => c.Employee).Include(c => c.Store).ToListAsync();
        }*/

        [HttpGet]
        public  IEnumerable<SalaryPaymentDto> GetSalaryPayments()
        {
            //return await _context.SalaryPayments.Include(c=>c.Employee).Include(c=>c.Store).ToListAsync();
            var data =  _context.SalaryPayments.Include(c => c.Employee).Include(c => c.Store).Where(c=>c.PaymentDate.Year==DateTime.Today.Year).ToList();
            return _mapper.Map<IEnumerable<SalaryPaymentDto>>(data);
        }

        // GET: api/SalaryPayments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SalaryPayment>> GetSalaryPayment(int id)
        {
            var salaryPayment = await _context.SalaryPayments.FindAsync(id);

            if (salaryPayment == null)
            {
                return NotFound();
            }

            return salaryPayment;
        }

        // PUT: api/SalaryPayments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalaryPayment(int id, SalaryPayment salaryPayment)
        {
            if (id != salaryPayment.SalaryPaymentId)
            {
                return BadRequest();
            }

            _context.Entry(salaryPayment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalaryPaymentExists(id))
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

        // POST: api/SalaryPayments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SalaryPayment>> PostSalaryPayment(SalaryPayment salaryPayment)
        {
            _context.SalaryPayments.Add(salaryPayment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSalaryPayment", new { id = salaryPayment.SalaryPaymentId }, salaryPayment);
        }

        // DELETE: api/SalaryPayments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSalaryPayment(int id)
        {
            var salaryPayment = await _context.SalaryPayments.FindAsync(id);
            if (salaryPayment == null)
            {
                return NotFound();
            }

            _context.SalaryPayments.Remove(salaryPayment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SalaryPaymentExists(int id)
        {
            return _context.SalaryPayments.Any(e => e.SalaryPaymentId == id);
        }
    }
}
