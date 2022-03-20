using eStore.Database;
using eStore.SharedModel.Models.Sales.Invoicing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class InvoicesController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public InvoicesController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/Invoices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
        {
            return await _context.Invoices.ToListAsync();
        }

        [HttpGet("withItems")]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoicesWithItems()
        {
            return await _context.Invoices.Include(c => c.InvoiceItems).Include(c => c.Payment).ToListAsync();
        }

        [HttpGet("GenInv")]
        public async Task<ActionResult<string>> GetInvoiceNumber(InvoiceType iType)
        {
            int count = await _context.Invoices.Where(c => c.OnDate.Date == DateTime.Today.Date && c.InvoiceType == iType).CountAsync();
            string invNumber = "JH006";
            switch (iType)
            {
                case InvoiceType.Sales:
                    invNumber += "IN";
                    break;

                case InvoiceType.SalesReturn:
                    invNumber += "SR";
                    break;

                case InvoiceType.ManualSale:
                    invNumber += "MIN";
                    break;

                case InvoiceType.ManualSaleReturn:
                    invNumber += "MSR";
                    break;

                default:
                    invNumber += "MIN";
                    break;
            }
            invNumber += $"{ DateTime.Today.Year}{ DateTime.Today.Month}{ DateTime.Today.Day}";
            if (count < 10) invNumber += $"000{++count}";
            else if (count < 100) invNumber += $"00{++count}";
            else if (count < 1000) invNumber += $"0{++count}";
            else invNumber += $"{++count}";

            return invNumber;
        }

        // GET: api/Invoices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Invoice>> GetInvoice(string id)
        {
            var invoice = await _context.Invoices.FindAsync(id);

            if (invoice == null)
            {
                return NotFound();
            }

            return invoice;
        }

        // PUT: api/Invoices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoice(string id, Invoice invoice)
        {
            if (id != invoice.InvoiceNumber)
            {
                return BadRequest();
            }

            _context.Entry(invoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
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

        // POST: api/Invoices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Range")]
        public async Task<ActionResult<Invoice>> PostInvoice(Invoice invoice)
        {
            _context.Invoices.Add(invoice);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (InvoiceExists(invoice.InvoiceNumber))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetInvoice", new { id = invoice.InvoiceNumber }, invoice);
        }

        // DELETE: api/Invoices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(string id)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceExists(string id)
        {
            return _context.Invoices.Any(e => e.InvoiceNumber == id);
        }
    }
}