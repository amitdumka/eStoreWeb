using eStore.BL.Widgets;
using eStore.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace eStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class MasterReportController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public MasterReportController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/MasterReport
        [HttpGet]
        public MasterViewReport Get()
        {
            return DashboardWidget.GetMasterViewReport(_context);
        }

        [HttpGet("sales")]
        public DailySaleReport GetSales()
        {
            return DashboardWidget.GetSaleRecord(_context);
        }

        [HttpGet("tailoring")]
        public TailoringReport GetTaioring()
        {
            return DashboardWidget.GetTailoringReport(_context);
        }

        [HttpGet("employee")]
        public IEnumerable<EmployeeInfo> GetEmployee()
        {
            return DashboardWidget.GetEmpInfo(_context);
        }

        [HttpGet("accounting")]
        public AccountsInfo GetAccounting()
        {
            return DashboardWidget.GetAccoutingRecord(_context);
        }

        [HttpGet("leadingSalesman")]
        public List<string> GetTopSalesman()
        {
            return DashboardWidget.GetTopSalesman(_context);
        }

        [HttpGet("pendingdeliver")]
        public IEnumerable<BookingOverDue> GetPendingDelivery()
        {
            return DashboardWidget.GetTailoringBookingOverDue(_context);
        }

        //// GET api/<MasterReportController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}
    }
}

//SaleReport = GetSaleRecord(_context),
//TailoringReport = GetTailoringReport(_context),
//EmpInfoList = GetEmpInfo(_context),
//AccountsInfo = GetAccoutingRecord(_context),
//BookingOverDues = GetTailoringBookingOverDue(_context)