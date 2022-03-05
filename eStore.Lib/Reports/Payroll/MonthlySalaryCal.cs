using eStore.Database;
using eStore.Reports.Pdfs;
using iText.IO.Font.Constants;
using iText.Kernel.Colors;
using iText.Kernel.Font;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using System;
using System.Collections.Generic;
using System.Linq;

namespace eStore.Lib.Reports.Payroll
{
    public class MonthlySalaryCal
    {
        private eStoreDbContext db;
        private int StoreId;
        private int month, year;
        private SortedDictionary<string, SalarySlip> mos = new SortedDictionary<string, SalarySlip>();

        public MonthlySalaryCal(eStoreDbContext con, int storeid, int mon, int yrs)
        {
            db = con;
            month = mon;
            year = yrs;
            StoreId = storeid;
            mos = new SortedDictionary<string, SalarySlip>();
        }

        public string CalucalteSalarySlip()
        {
            var empList = db.Attendances.Where(c => c.StoreId == StoreId && c.AttDate.Year == year && c.AttDate.Month == month).Select(c => c.EmployeeId).Distinct().OrderBy(c => c).ToList();

            foreach (var id in empList)
            {
                mos.Add(db.Employees.Find(id).StaffName, CalucalteAttendance(id, month, year));
            }
            return CreatePdf(true);
        }

        private SalarySlip CalucalteAttendance(int EmployeeId, int month, int year)
        {
            SalarySlip slip = new SalarySlip
            {
                EmployeeId = EmployeeId,
                IsSundayWorking = false,
                Month = month,
                Year = year,
                GrossSalary = 0,
                NetAttendance = 0,
                NoOfWorkingDays = 26,
                SalaryPerDays = 0,
                Absent = 0,
                PaidSunday = 0,
                NoofAttendance = 0,
                DeducationResaons = null,
                OtherDeducation = 0,
                SalaryAdvance = 0
            };
            slip.NoofAttendance = db.Attendances.Where(c => c.EmployeeId == EmployeeId && c.AttDate.Year == year && c.AttDate.Month == month).Count();

            if (slip.NoofAttendance <= 0)
            {
                return slip;
            }

            slip.NetAttendance = db.Attendances.Where(c => c.EmployeeId == EmployeeId && c.AttDate.Year == year && c.AttDate.Month == month && (c.Status == AttUnit.Present ||
           c.Status == AttUnit.PaidLeave || c.Status == AttUnit.StoreClosed || c.Status == AttUnit.Holiday ||
           c.Status == AttUnit.SickLeave)).Count();

            slip.PaidSunday = db.Attendances.Where(c => c.EmployeeId == EmployeeId && c.AttDate.Year == year && c.AttDate.Month == month && c.Status == AttUnit.Sunday).Count();

            slip.Absent = db.Attendances.Where(c => c.EmployeeId == EmployeeId && c.AttDate.Year == year && c.AttDate.Month == month && (c.Status == AttUnit.Absent
           || c.Status == AttUnit.CasualLeave || c.Status == AttUnit.OnLeave)).Count();

            var hp = db.Attendances.Where(c => c.EmployeeId == EmployeeId && c.AttDate.Year == year && c.AttDate.Month == month && c.Status == AttUnit.HalfDay).Count() / 2;
            slip.NetAttendance += hp;
            slip.Absent += hp;

            decimal SalaryAmount = 0;

            var data = db.Salaries.Where(c => c.EmployeeId == EmployeeId && c.EffectiveDate.Year <= year && c.EffectiveDate.Month <= month).ToList();
            if (data.Count > 1)
            {
                var sdata = data.Where(c => c.CloseDate != null && c.CloseDate.Value.Year <= year && c.CloseDate.Value.Month <= month).FirstOrDefault();

                if (sdata != null)
                {
                    SalaryAmount = sdata.BasicSalary;
                    slip.IsSundayWorking = sdata.IsSundayBillable;
                }
            }
            if (data.Count == 0)
            {
                return slip;
            }
            else
            {
                SalaryAmount = data[0].BasicSalary;
                slip.IsSundayWorking = data[0].IsSundayBillable;
            }

            //if (slip.NetAttendance == 15)
            //{
            //    //Calcualte Half Salary
            //    slip.SalaryPerDays = SalaryAmount / 30;
            //    slip.GrossSalary = SalaryAmount / 2;
            //}
            //else
            if (slip.NetAttendance <= 15)
            {
                // Divide by 30  days
                slip.SalaryPerDays = SalaryAmount / 30;
                slip.GrossSalary = slip.SalaryPerDays * slip.NetAttendance;
            }
            else
            {
                slip.SalaryPerDays = SalaryAmount / 26;
                slip.GrossSalary = slip.SalaryPerDays * slip.NetAttendance;
                //Calculate on 26 days
            }

            if (slip.IsSundayWorking)
            {
                slip.NetAttendance += (slip.PaidSunday * slip.SalaryPerDays);
            }

            slip.SalaryAdvance = db.SalaryPayments.Where(c => c.EmployeeId == EmployeeId && c.PaymentDate.Year == year && c.PaymentDate.Month == month && c.SalaryComponet == SalaryComponet.Advance).Sum(c => c.Amount);

            return slip;
        }

        private string CreatePdf(bool isLandscape = false)
        {
            float[] columnWidths = { 1, 5, 5, 1, 1, 1, 1, 1, 1, 1 };

            Cell[] HeaderCell = new Cell[]{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Staff Name").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Working Days / Count").SetTextAlignment(TextAlignment.CENTER)),
                     new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("@Salary(PD)").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Attendance").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Absent").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Sunday").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Salary").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Advance").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Net Salary").SetTextAlignment(TextAlignment.CENTER)),
            };

            List<Object> pList = new List<Object>();

            Paragraph Line1 = new Paragraph("Salary Calculation Report").SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER)
               .SetFontColor(ColorConstants.BLUE).SetBackgroundColor(ColorConstants.LIGHT_GRAY);
            Line1.Add($"\t For Month of {month} / {year}");

            pList.Add(Line1);

            int nDays = DateTime.DaysInMonth(year, month);
            Paragraph Line2 = new Paragraph($"No of Day in Month: { nDays}\n").SetTextAlignment(TextAlignment.CENTER).SetFontColor(ColorConstants.DARK_GRAY);
            pList.Add(Line2);
            
            Table table = PDFHelper.GenerateTable(columnWidths, HeaderCell);

            int count = 0;
            decimal totalPayment = 0;
            bool isValid = true;

            foreach (var item in mos)
            {
                var StaffName = item.Key;

                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(StaffName)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Value.NoOfWorkingDays.ToString() + "/" + item.Value.NoofAttendance.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Value.SalaryPerDays.ToString("0.##"))));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Value.NetAttendance.ToString("0.##"))));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Value.Absent.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Value.PaidSunday.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Value.GrossSalary.ToString("0.##"))));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Value.SalaryAdvance.ToString("0.##"))));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((item.Value.GrossSalary - item.Value.SalaryAdvance).ToString("0.##"))));

                totalPayment += (item.Value.GrossSalary - item.Value.SalaryAdvance);

                if (item.Value.NoofAttendance != nDays)
                    isValid = false;
            }
            Paragraph p = new Paragraph();
            p.Add($"\nTotal Monthly Salary:Rs. {totalPayment.ToString("0.##")} /-");
            Div d = new Div();
            d.Add(p);
            table.SetCaption(d);
            pList.Add(table);
            if (!isValid)
            {
                PdfFont font = PdfFontFactory.CreateFont(StandardFonts.COURIER_OBLIQUE);
                Paragraph pRrr = new Paragraph("\nImportant Note: In one or few or all Employee Salary Calculation is incorrect as No. of Attendance and No. of Days in Month in matching. So which ever Employee's No. of attendance and days not matching, there attendance need to be corrected and again this report need to be generated! \n").SetFontColor(ColorConstants.RED).SetTextAlignment(TextAlignment.CENTER);
                pRrr.SetItalic();
                pRrr.SetFont(font);

                var Br = new SolidBorder(1);
                Br.SetColor(ColorConstants.BLUE);
                pRrr.SetBorder(Br);
                pList.Add(pRrr);
            }
            Paragraph px = new Paragraph("Note: Salary Advances and any other deducation has not be been considered. That is will be deducated in actuals if applicable").SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER).SetFontColor(ColorConstants.RED);
            pList.Add(px);

           

            return PDFHelper.CreateReportPdf("SalaryReport", $"Salary Report Month of {month}/{year}.\n", pList, isLandscape);
        }
    }
}