using eStore.BL.Widgets;
using eStore.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eStore.BL.Reports.Payroll;
using eStore.BL.Reports.CAReports;
using System.IO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace eStore.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ReportsController : ControllerBase
    {
        private readonly eStoreDbContext db;
        public ReportsController(eStoreDbContext con)
        {
            db = con;
        }
        // GET: api/<ReportsController>
        [HttpGet]
        public string Get()
        {
            return "Default is not supported, Kindly use sub route";
        }

        // GET api/<ReportsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "Default is Not supported, Kindly use sub route";
        }

        // POST api/<ReportsController>
        [HttpPost]
        public ActionResult Post([FromBody] string value)
        {
            return NotFound();
        }
        // Report section 
        // GET: api/<ReportsController>
        [HttpGet("incomeExpenes")]
        public ActionResult<IEnumerable<IncomeExpensesReport>> GetIncomeExpensesReport(DateTime? onDate)
        {
            if (onDate == null) onDate = DateTime.Today;

            try
            {
                List<IncomeExpensesReport> list = new List<IncomeExpensesReport>();
                IEReport eReport = new IEReport();
                list.Add(eReport.GetDailyReport(db, (DateTime)onDate));
                list.Add(eReport.GetWeeklyReport(db, onDate));
                list.Add(eReport.GetMonthlyReport(db, (DateTime)onDate));
                list.Add(eReport.GetYearlyReport(db, (DateTime)onDate));

                return list;
            }
            catch (Exception e)
            {
                Console.WriteLine("Error: " + e.Message);
                return NotFound();
            }

        }

       
        [HttpGet("AttendanceReport")]
        public ActionResult<IEnumerable<AttendanceReport>> GetAttendanceReport(int StoreId)
        {
            return PayrollReport.GenerateAllEmployeeAttendanceReport(db, StoreId);
        }
        [HttpGet("AttendanceReport{empId}")]
        public ActionResult<AttendanceReport> GetEmployeeAttendanceReport(int empId)
        {
            return PayrollReport.GenerateEmployeeAttendanceReport(db, empId);
        }


        [HttpPost("FinReport")]
        public FileStreamResult PostFinReport(FinReportDto fin)
        {

            FinReport fr = new FinReport (db, fin.StoreId, fin.StartYead, fin.EndYear,fin.IsPdf);

            var data =fr.GetFinYearReport (fin.Mode,fin.ForcedRefresh);
          
            var stream = new FileStream (data, FileMode.Open);
            
            return File (stream, "application/pdf", "report.pdf");
        }       
    }
   public  class FinReportDto
    {
        public int StoreId { get; set; }
        public int StartYead { get; set; }
        public int EndYear { get; set; }
        public int StartMonth { get; set; }
        public int EndMonth { get; set; }
        public int Mode { get; set; }
        public bool ForcedRefresh { get; set; }
        public bool IsPdf { get; set; }

    }
}
