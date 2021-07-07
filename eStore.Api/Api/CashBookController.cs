using eStore.BL.Reports.Accounts;
using eStore.DL.Data;
using eStore.Shared.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace eStore.Areas.API
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class CashBookController : ControllerBase
    {
        private readonly eStoreDbContext _context;
        public CashBookController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/CashBook
        [HttpGet]
        public IEnumerable<CashBook> Get()
        {
         // Default Store and for current Month
            CashBookManager manager = new CashBookManager(1);
           var data= manager.GetMontlyCashBook(_context, DateTime.Today, 1);
            return data;
        }
        [HttpGet("today")]
        public IEnumerable<CashBook> GeToday()
        {
            // Default Store and for current Month
            CashBookManager manager = new CashBookManager(1);
            var data = manager.GetDailyCashBook(_context, DateTime.Today, 1);
            return data;
        }
        // GET api/<CashBookController>/5
        [HttpGet("{id}")]
        public IEnumerable<CashBook> Get(int id)
        {
            //Default is current month
            CashBookManager manager = new CashBookManager(id);
            var data = manager.GetMontlyCashBook(_context, DateTime.Today, id);
            return data;
        }
        [HttpGet("daily")]
        public IEnumerable<CashBook> GetDaily(int id)
        {
            //Default is current month
            CashBookManager manager = new CashBookManager(id);
            var data = manager.GetDailyCashBook(_context, DateTime.Today, id);
            return data;
        }
        [HttpGet("custom")]
        public IEnumerable<CashBook> GetCustom(int id, DateTime onDate, bool isMonthly=false)
        {
            //Default is current month
            CashBookManager manager = new CashBookManager(id);
            List<CashBook> data = null;
            if(isMonthly)
                data = manager.GetMontlyCashBook(_context, onDate.Date, id);
            else
             data = manager.GetDailyCashBook(_context, onDate.Date, id);
            return data;
        }
    }
}
