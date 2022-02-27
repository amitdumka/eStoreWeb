using AutoMapper;
using eStore.BL.Commons;
using eStore.Database;
using eStore.Shared.Models.Common;
using eStore.Shared.Models.Stores;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace eStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class DayClosingController : ControllerBase
    {
        private readonly eStoreDbContext _context;
        private readonly IMapper _mapper;

        public DayClosingController(eStoreDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/<DayClosingController>
        [HttpGet]
        public async Task<ActionResult<DayClosings>> GetAsync()
        {
            DayClosings dayClosings = new DayClosings
            {
                PettyCashBooks = await _context.PettyCashBooks.ToListAsync(),
                EODs = await _context.EndOfDays.ToListAsync(),
                CashDetails = await _context.CashDetail.ToListAsync()
            };
            return dayClosings;
        }

        // GET api/<DayClosingController>/5
        [HttpGet("{onDate}")]
        public ActionResult<DayClosing> GetDayClosing(DateTime onDate)
        {
            DayClosing dayClosing = new DayClosing
            {
                CashDetail = _context.CashDetail.Where(c => c.OnDate.Date == onDate.Date).FirstOrDefault(),
                EOD = _context.EndOfDays.Where(c => c.EOD_Date.Date == onDate.Date).FirstOrDefault(),
                PettyCashBook = _context.PettyCashBooks.Where(c => c.OnDate.Date == onDate.Date).FirstOrDefault(),
            };
            return dayClosing;
        }

        [HttpGet("GeneratePettyCashSlip")]
        public ActionResult<PettyCashBook> GetPettyCashSlip(int storeId = 1)
        {
            DateTime date = DateTime.Today.Date;
            return StoreManager.GeneratePettyCashBook(_context, storeId);
        }

        // POST api/<DayClosingController>
        [HttpPost]
        public async Task<ActionResult<DayClosing>> PostAsync(DayClosing dayClosing)
        {
            if (dayClosing != null)
            {
                if (dayClosing.EOD != null)
                    _context.EndOfDays.Add(dayClosing.EOD);
                if (dayClosing.CashDetail != null)
                    _context.CashDetail.Add(dayClosing.CashDetail);
                if (dayClosing.PettyCashBook != null)
                    _context.PettyCashBooks.Add(dayClosing.PettyCashBook);

                await _context.SaveChangesAsync();
            }
            return CreatedAtAction("GetDayClosing", new { onDate = dayClosing.EOD.EOD_Date }, dayClosing);
        }

        //// PUT api/<DayClosingController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<DayClosingController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }

    public class DayClosing
    {
        public EndOfDay EOD { get; set; }
        public CashDetail CashDetail { get; set; }
        public PettyCashBook PettyCashBook { get; set; }
    }

    public class DayClosings
    {
        public List<EndOfDay> EODs { get; set; }
        public List<CashDetail> CashDetails { get; set; }
        public List<PettyCashBook> PettyCashBooks { get; set; }
    }
}