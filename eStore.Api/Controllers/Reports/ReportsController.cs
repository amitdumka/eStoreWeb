using eStore.BL.Reports.Accounts;
using eStore.BL.Reports.CAReports;
using eStore.BL.Reports.Payroll;
using eStore.BL.Widgets;
using eStore.Database;
using eStore.Lib.Reports.Payroll;
using eStore.Reports.Payrolls;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace eStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
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
            if (onDate == null)
                onDate = DateTime.Today;
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

        [HttpPost("AttReport")]
        public FileStreamResult PostAttReport(AttReportDto fin)
        {  //TODO: Need to handle all employee and all fin year.
            AttendanceReportPdf fr = new AttendanceReportPdf(db, fin.StoreId, fin.FinYear, fin.Month, true);
            var data = fr.GenerateAttendaceReportPdf(fin.EmployeeId, fin.ForcedRefresh);
            var stream = new FileStream(data, FileMode.Open);
            return File(stream, "application/pdf", "report.pdf");
        }

        [HttpPost("FinReport")]
        public FileStreamResult PostFinReport(FinReportDto fin)
        {
            FinReport fr = new FinReport(db, fin.StoreId, fin.StartYear, fin.EndYear, fin.IsPdf);
            var data = fr.GetFinYearReport(fin.Mode, fin.ForcedRefresh);
            var stream = new FileStream(data, FileMode.Open);
            return File(stream, "application/pdf", "report.pdf");
        }

        [HttpPost("SalaryReport")]
        public FileStreamResult PostSalarPaymentReport(AttReportDto dto)
        {
            SalaryPaymentReport spr = new SalaryPaymentReport(db, dto.StoreId);
            var data = spr.GetSalaryPaymentReport(dto.EmployeeId, dto.Month, dto.FinYear);
            var stream = new FileStream(data, FileMode.Open);
            return File(stream, "application/pdf", "report.pdf");
        }

        [HttpPost("SalaryCalReport")]
        public FileStreamResult PostSalarCalReport(AttReportDto dto)
        {
            SalaryCal cal = new SalaryCal(db, dto.EmployeeId, dto.StoreId);
            var data = cal.SalaryCalculation();
            var stream = new FileStream(data, FileMode.Open);
            return File(stream, "application/pdf", "report.pdf");
        }

        [HttpPost("MonthlySalaryCalReport_new")]
        public FileStreamResult PostMSalarCalReport(AttReportDto dto)
        {
            var yrs = dto.FinYear.Split("-");
            int year = int.Parse(yrs[0].Trim());
            if (dto.Month < 4)
                year = int.Parse(yrs[1].Trim());

            // MonthlySalaryCal cal = new MonthlySalaryCal(db, dto.StoreId, dto.Month, year);
            // var data = cal.CalucalteSalarySlip();

            PayrollReports cal = new PayrollReports();
            var data = cal.PaySlipReportForAllEmpoyee(db, new DateTime(year, dto.Month, 1));
            var stream = new FileStream(data, FileMode.Open);
            return File(stream, "application/pdf", "report.pdf");
        }

        [HttpPost("MonthlySalaryCalReport")]
        public FileStreamResult PostMSalarCalReport_old(AttReportDto dto)
        {
            var yrs = dto.FinYear.Split("-");
            int year = int.Parse(yrs[0].Trim());
            if (dto.Month < 4)
                year = int.Parse(yrs[1].Trim());
            MonthlySalaryCal cal = new MonthlySalaryCal(db, dto.StoreId, dto.Month, year);
            var data = cal.CalucalteSalarySlip();
            var stream = new FileStream(data, FileMode.Open);
            return File(stream, "application/pdf", "report.pdf");
        }

        [HttpPost("monthlySaleReport")]
        public FileStreamResult PostMonthlySaleReport(BasicParamDTO dto)
        {
            AccountReport ar = new AccountReport();
            var data = ar.SaleReport(db, dto.StoreId, new DateTime(dto.Year, dto.Month, 1));
            //var data = ar.TestReport ();
            var stream = new FileStream(data, FileMode.Open);
            return File(stream, "application/pdf", "report.pdf");
        }

        [HttpPost("monthlyPaymentReceiptReport")]
        public FileStreamResult PostMonthlyPaymentRecieptReport(BasicParamDTO dto)
        {
            AccountReport ar = new AccountReport();
            var data = ar.PaymentRecieptReport(db, dto.StoreId, new DateTime(dto.Year, dto.Month, 1));
            var stream = new FileStream(data, FileMode.Open);
            return File(stream, "application/pdf", "report.pdf");
        }

        [HttpPost("monthlySalaryReport")]
        public FileStreamResult PostMonthlySalaryReport(BasicParamDTO dto)
        {
            AccountReport ar = new AccountReport();
            var data = ar.SalaryReport(db, dto.StoreId, new DateTime(dto.Year, dto.Month, 1));
            var stream = new FileStream(data, FileMode.Open);
            return File(stream, "application/pdf", "report.pdf");
        }

        [HttpPost("voucherReport")]
        public FileStreamResult PostvoucherReport(BasicParamDTO dto)
        {
            VoucherReport ar = new VoucherReport();
            var data = ar.GetVoucherReport(db, dto.StoreId, (VoucherReportType)dto.Mode,
                new DateTime(dto.Year, dto.Month, 1), new DateTime(dto.Year, dto.Month, DateTime.DaysInMonth(dto.Year, dto.Month)), 0);
            var stream = new FileStream(data, FileMode.Open);
            return File(stream, "application/pdf", "report.pdf");
        }

        [HttpPost("monthlyTailoringReport")]
        public FileStreamResult PostMonthlyTailoringReport(BasicParamDTO dto)
        {
            OtherReport ar = new OtherReport();
            var data = ar.GetTailoringReport(db, dto.StoreId,
                new DateTime(dto.Year, dto.Month, 1));
            var stream = new FileStream(data, FileMode.Open);
            return File(stream, "application/pdf", "report.pdf");
        }

        [HttpPost("monthlyBankReport")]
        public FileStreamResult PostMonthlyBankReport(BasicParamDTO dto)
        {
            OtherReport ar = new OtherReport();
            var data = ar.GetBankingReport(db, dto.StoreId,
                new DateTime(dto.Year, dto.Month, 1));
            var stream = new FileStream(data, FileMode.Open);
            return File(stream, "application/pdf", "report.pdf");
        }

        [HttpPost("monthlySaleSummaryReport")]
        public FileStreamResult PostMonthlySalesReport(BasicParamDTO dto)
        {
            OtherReport ar = new OtherReport();
            var data = ar.CardCashReport(db, dto.StoreId,
                new DateTime(dto.Year, dto.Month, 1));
            var stream = new FileStream(data, FileMode.Open);
            return File(stream, "application/pdf", "report.pdf");
        }

        [HttpPost("monthlyDuesReport")]
        public FileStreamResult PostMonthlyDuesReport(BasicParamDTO dto)
        {
            OtherReport ar = new OtherReport();
            var data = ar.GetDueReport(db, dto.StoreId,
                new DateTime(dto.Year, dto.Month, 1));
            var stream = new FileStream(data, FileMode.Open);
            return File(stream, "application/pdf", "report.pdf");
        }
    }

    public class BasicParamDTO
    {
        public int StoreId { get; set; }
        public bool ForcedRefresh { get; set; }
        public string FinYear { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public int Mode { get; set; }
        //public string ReportFormat { get; set; }
    }

    public class AttReportDto
    {
        public int StoreId { get; set; }
        public int EmployeeId { get; set; }
        public bool ForcedRefresh { get; set; }
        public string FinYear { get; set; }
        public int Month { get; set; }
    }

    public class FinReportDto
    {
        public int StoreId { get; set; }
        public int StartYear { get; set; }
        public int EndYear { get; set; }
        public int StartMonth { get; set; }
        public int EndMonth { get; set; }
        public int Mode { get; set; }
        public bool ForcedRefresh { get; set; }
        public bool IsPdf { get; set; }
    }

    public class VoucherDto
    {
        public int StoreId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public ReportOutputType outputType { get; set; }
        public VoucherReportType VoucherReport { get; set; }
    }
}