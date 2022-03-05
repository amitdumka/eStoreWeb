using eStore.BL.Reports.CAReports;
using eStore.Database;
using eStore.Reports.Pdfs;
using eStore.Shared.Models.Payroll;
using iText.Kernel.Colors;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Path = System.IO.Path;

namespace eStore.Lib.Reports.Payroll
{
    public class SalarySlip
    {
        public int EmployeeId { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public int NoOfWorkingDays { get; set; }
        public decimal NetAttendance { get; set; }
        public decimal SalaryPerDays { get; set; }
        public decimal GrossSalary { get; set; }
        public bool IsSundayWorking { get; set; }
        public decimal PaidSunday { get; set; }
        public decimal Absent { get; set; }
        public int NoofAttendance { get; set; }
        public decimal SalaryAdvance { get; set; }
        public decimal OtherDeducation { get; set; }
        public string DeducationResaons { get; set; }
    }

    public class SalaryCal
    {
        //TODO: Need to Implement in calculation for Incentive, WOWBill and Last pcs.
        //TODO: Need to Add, Staff Welfare part also in calucaltion and Payment part.
        private bool IsIncentive = false, IsWowBill = false, IsLastPcs = false;

        private EmpType EmpType;
        private eStoreDbContext db;
        private int StoreId;
        private string StaffName;
        private int EmployeeId;
        private List<int> YearList;

        //private List<SalarySlip> MonthList;
        private List<List<SalarySlip>> YearlySalarySlip;

        private bool IsSundayWorking;
        private List<CurrentSalary> Salaries;

        public SalaryCal(eStoreDbContext con, int EmpId, int Store)
        {
            db = con;
            StoreId = Store;
            EmployeeId = EmpId;
            StaffName = db.Employees.Find(EmpId).StaffName;
            var data = db.Attendances.Where(c => c.EmployeeId == EmployeeId).Select(c => c.AttDate.Year).Distinct().ToList();
            data.Sort();
            YearList = data;
            Salaries = db.Salaries.Where(c => c.EmployeeId == EmployeeId).ToList();
            YearlySalarySlip = new List<List<SalarySlip>>();
        }

        public string SalarCalulationForMonth(int empId, int year, int month)
        {
            SalarySlip slip = CalucalteAttendance(month, year);
            List<SalarySlip> monSS = new List<SalarySlip>();
            monSS.Add(slip);
            YearlySalarySlip.Add(monSS);
            return CreatePdf(false);
        }

        public string SalaryCalculation()
        {
            foreach (var year in YearList)
            {
                List<SalarySlip> monSS = new List<SalarySlip>();
                for (int i = 1; i <= 12; i++)
                    monSS.Add(CalucalteAttendance(i, year));
                YearlySalarySlip.Add(monSS);
            }
            return CreatePdf(false);
        }

        private string CreatePdf(bool isLandscape = false)
        {
            float[] columnWidths = { 1, 5, 5, 5, 5, 5, 1 };

            Cell[] HeaderCell = new Cell[]{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Month/Year").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Working Days / Count").SetTextAlignment(TextAlignment.CENTER)),
                     new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("@Salary(PD)").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Attendance").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Absent").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Salary").SetTextAlignment(TextAlignment.CENTER)),
            };

            List<Paragraph> pList = new List<Paragraph>();
            Paragraph Line1 = new Paragraph("Salary Calculation Report").SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER)
               .SetFontColor(ColorConstants.RED);
            Line1.Add($"\nEmployee Name: {StaffName}\t\t\t Report Date: {DateTime.Now}");
            pList.Add(Line1);
            decimal TotalSalary = 0;
            foreach (var item in YearlySalarySlip)
            {
                var YearName = item[0].Year;
                Div d = new Div();

                Table table = PDFHelper.GenerateTable(columnWidths, HeaderCell);
                int count = 0;
                decimal totalPayment = 0;
                foreach (var sData in item)
                {
                    //table.AddCell()
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(sData.Month.ToString() + "/" + sData.Year.ToString())));
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(sData.NoOfWorkingDays.ToString() + "/" + sData.NoofAttendance.ToString())));
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(sData.SalaryPerDays.ToString("0.##"))));
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(sData.NetAttendance.ToString("0.##"))));
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(sData.Absent.ToString())));
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(sData.GrossSalary.ToString("0.##"))));
                    totalPayment += sData.GrossSalary;
                }
                TotalSalary += totalPayment;
                Paragraph p = new Paragraph($"Year: {YearName}");
                p.Add($"\nTotal Yearly Salary:Rs. {totalPayment.ToString("0.##")} /-");
                d.Add(p);
                table.SetCaption(d);
                Paragraph pTable = new Paragraph().SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER);
                pTable.Add(table);
                pList.Add(pTable);
            }
            Paragraph BaseLine = new Paragraph($"\n\nTotal Salary: Rs. {TotalSalary.ToString("0.##")}").SetFontColor(ColorConstants.RED);
            pList.Add(BaseLine);

            return PDFHelper.CreateReportPdf("SalaryReport", $"Salary Report of {StaffName}.\n", pList, isLandscape);
        }

        private SalarySlip CalucalteAttendance(int month, int year)
        {
            SalarySlip slip = new SalarySlip
            {
                EmployeeId = EmployeeId,
                IsSundayWorking = IsSundayWorking,
                Month = month,
                Year = year,
                GrossSalary = 0,
                NetAttendance = 0,
                NoOfWorkingDays = 26,
                SalaryPerDays = 0,
                Absent = 0,
                PaidSunday = 0,
                NoofAttendance = 0
            };
            slip.NoofAttendance = db.Attendances.Where(c => c.EmployeeId == EmployeeId && c.AttDate.Year == year && c.AttDate.Month == month).Count();

            if (slip.NoofAttendance <= 0)
            {
                return slip;
            }

            slip.NetAttendance = db.Attendances.Where(c => c.EmployeeId == EmployeeId && c.AttDate.Year == year && c.AttDate.Month == month && (c.Status == AttUnit.Present ||
           c.Status == AttUnit.PaidLeave || c.Status == AttUnit.StoreClosed || c.Status == AttUnit.Holiday || c.Status == AttUnit.StoreClosed ||
           c.Status == AttUnit.SickLeave)).Count();

            slip.PaidSunday = db.Attendances.Where(c => c.EmployeeId == EmployeeId && c.AttDate.Year == year && c.AttDate.Month == month && c.Status == AttUnit.Sunday).Count();
            slip.Absent = db.Attendances.Where(c => c.EmployeeId == EmployeeId && c.AttDate.Year == year && c.AttDate.Month == month && (c.Status == AttUnit.Absent
           || c.Status == AttUnit.CasualLeave || c.Status == AttUnit.OnLeave)).Count();

            var hp = db.Attendances.Where(c => c.EmployeeId == EmployeeId && c.AttDate.Year == year && c.AttDate.Month == month && c.Status == AttUnit.HalfDay).Count() / 2;
            slip.NetAttendance += hp;
            slip.Absent += hp;

            decimal SalaryAmount = 0;

            var data = Salaries.Where(c => c.EffectiveDate.Year <= year && c.EffectiveDate.Month <= month).ToList();
            if (data.Count > 1)
            {
                var sdata = data.Where(c => c.CloseDate != null && c.CloseDate.Value.Year <= year && c.CloseDate.Value.Month <= month).FirstOrDefault();

                if (sdata != null)
                {
                    SalaryAmount = sdata.BasicSalary;
                }
            }
            if (data.Count == 0)
            {
                return slip;
            }
            else
            {
                SalaryAmount = data[0].BasicSalary;
            }

            if (slip.NetAttendance == 15)
            {
                //Calcualte Half Salary
                slip.SalaryPerDays = SalaryAmount / 30;
                slip.GrossSalary = SalaryAmount / 2;
            }
            else if (slip.NetAttendance < 15)
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

            return slip;
        }
    }

    
    public class SalaryPaymentReport
    {
        private eStoreDbContext db;
        private int StoreId;
        private string StaffName;
        private decimal NetSalary, LastPcs, WOWBill, SundaySalary, Incentive, Others, Advance, PaidLeave, SickLeave;
        private List<SalaryPayment> PaymentList;
        private string FileName = "SalaryPayment_";

        public SalaryPaymentReport(eStoreDbContext con, int store)
        {
            db = con;
            StoreId = store;
        }

        public string GetSalaryPaymentReport(int EmpId, int Month, string FinYear)
        {
            StaffName = db.Employees.Find(EmpId).StaffName;

            PaymentList = db.SalaryPayments.Where(c => c.EmployeeId == EmpId).OrderBy(d => d.PaymentDate).ToList();

            Advance = PaymentList.Where(c => c.SalaryComponet == SalaryComponet.Advance).Sum(c => c.Amount);
            Incentive = PaymentList.Where(c => c.SalaryComponet == SalaryComponet.Incentive).Sum(c => c.Amount);
            NetSalary = PaymentList.Where(c => c.SalaryComponet == SalaryComponet.NetSalary).Sum(c => c.Amount);
            LastPcs = PaymentList.Where(c => c.SalaryComponet == SalaryComponet.LastPcs).Sum(c => c.Amount);
            SundaySalary = PaymentList.Where(c => c.SalaryComponet == SalaryComponet.SundaySalary).Sum(c => c.Amount);
            Others = PaymentList.Where(c => c.SalaryComponet == SalaryComponet.Others).Sum(c => c.Amount);
            SickLeave = PaymentList.Where(c => c.SalaryComponet == SalaryComponet.SickLeave).Sum(c => c.Amount);
            PaidLeave = PaymentList.Where(c => c.SalaryComponet == SalaryComponet.PaidLeave).Sum(c => c.Amount);
            WOWBill = PaymentList.Where(c => c.SalaryComponet == SalaryComponet.WOWBill).Sum(c => c.Amount);

            return CreateReportPDF();
        }

        private Table GenerateTableRow(List<SalaryPayment> pList, float[] columnWidths, Cell[] HeaderCell)
        {
            if (pList.Count < 1)
                return null;

            Table table = PDFHelper.GenerateTable(columnWidths, HeaderCell);
            int count = 0;
            decimal totalPayment = 0;
            foreach (var mon in pList)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.SalaryPaymentId.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.PaymentDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(mon.SalaryMonth) ? "" : mon.SalaryMonth)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(mon.Details) ? "" : mon.Details)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.PayMode.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Amount.ToString("0.##"))));
                totalPayment += mon.Amount;
            }
            Div d = new Div();
            d.Add(new Paragraph($"\n\t\tTotal Payment: {totalPayment}").SetFontColor(ColorConstants.RED));
            table.SetCaption(d);
            return table;
        }

        private string CreateReportPDF(bool IsLandscape = false)
        {
            FileName += StaffName + "_Report.pdf";
            string path = Path.Combine(ConData.WWWroot, FileName);
            var PageType = PageSize.A4;
            if (IsLandscape)
                PageType = PageSize.A4.Rotate();

            using PdfWriter pdfWriter = new PdfWriter(FileName);
            using PdfDocument pdfDoc = new PdfDocument(pdfWriter);
            using Document doc = new Document(pdfDoc, PageType);
            doc.SetBorderTop(new SolidBorder(2));

            Paragraph header = new Paragraph($"{ConData.CName} \n {ConData.CAdd}\n")
               .SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER)
               .SetFontColor(ColorConstants.RED);
            doc.Add(header);

            Paragraph info = new Paragraph($"\n Salary Payment Report of {StaffName}.\n")
                .SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER)
               .SetFontColor(ColorConstants.RED);
            doc.Add(info);
            //doc.Add(headerDiv);
            Paragraph p1 = new Paragraph("Payment Report").SetFontColor(ColorConstants.MAGENTA);
            p1.Add($"\n\tEmployee Name: {StaffName}\nReport Date: {DateTime.Now}");
            doc.Add(p1);

            Paragraph x1 = new Paragraph("\nPayment Summary\n").SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER)
               .SetFontColor(ColorConstants.BLUE);

            x1.Add($"\nNet Salary: {NetSalary} \t Salary Advance: {Advance}\tSunday Salary:{SundaySalary}");
            x1.Add($"\nIncentive: {Incentive} \t Wow Bill: {WOWBill}\tLast Pcs:{LastPcs}");
            x1.Add($"\nOthers: {Others} \t Sick Leaves: {SickLeave}\tPaid Leaves:{PaidLeave}");
            doc.Add(x1);

            float[] columnWidths = { 1, 1, 5, 5, 5, 5, 1 };

            Cell[] HeaderCell = new Cell[]{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("ID")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Salary Month").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Details").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Payment Mode").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Amount").SetTextAlignment(TextAlignment.CENTER)),
            };
            var rowData = PaymentList.Where(c => c.SalaryComponet == SalaryComponet.NetSalary).ToList();

            if (rowData.Count > 0)
            {
                Div d = new Div();
                Paragraph p = new Paragraph("Payment Type: Net Salary\n").SetFontColor(ColorConstants.MAGENTA);
                d.Add(p);
                Table NetSalaryTable = GenerateTableRow(rowData, columnWidths, HeaderCell);
                NetSalaryTable.SetCaption(d);
                doc.Add(NetSalaryTable);
            }

            rowData = PaymentList.Where(c => c.SalaryComponet == SalaryComponet.Advance).ToList();
            if (rowData.Count > 0)
            {
                Div d1 = new Div();
                Paragraph p2 = new Paragraph("Payment Type:Salary Advance\n").SetFontColor(ColorConstants.MAGENTA);
                d1.Add(p2);
                Table AdvanceTable = GenerateTableRow(rowData, columnWidths, HeaderCell);
                AdvanceTable.SetCaption(d1);
                doc.Add(AdvanceTable);
            }

            rowData = PaymentList.Where(c => c.SalaryComponet == SalaryComponet.SundaySalary).ToList();
            if (rowData.Count > 0)
            {
                Div d3 = new Div();
                Paragraph p3 = new Paragraph("Payment Type:Sunday Salary\n").SetFontColor(ColorConstants.MAGENTA);
                d3.Add(p3);
                Table SundaySalary = GenerateTableRow(rowData, columnWidths, HeaderCell);
                SundaySalary.SetCaption(d3);
                doc.Add(SundaySalary);
            }

            rowData = PaymentList.Where(c => c.SalaryComponet == SalaryComponet.WOWBill).ToList();
            if (rowData.Count > 0)
            {
                Div d3 = new Div();
                Paragraph p3 = new Paragraph("Payment Type:Wow Bill Incentive\n").SetFontColor(ColorConstants.MAGENTA);
                d3.Add(p3);
                Table WOWBillTable = GenerateTableRow(rowData, columnWidths, HeaderCell);
                WOWBillTable.SetCaption(d3);
                doc.Add(WOWBillTable);
            }

            rowData = PaymentList.Where(c => c.SalaryComponet == SalaryComponet.LastPcs).ToList();
            if (rowData.Count > 0)
            {
                Div d3 = new Div();
                Paragraph p3 = new Paragraph("Payment Type:Last Pcs Incentive\n").SetFontColor(ColorConstants.MAGENTA);
                d3.Add(p3);
                var tableData = GenerateTableRow(rowData, columnWidths, HeaderCell);
                tableData.SetCaption(d3);
                doc.Add(tableData);
            }

            rowData = PaymentList.Where(c => c.SalaryComponet == SalaryComponet.Incentive).ToList();
            if (rowData.Count > 0)
            {
                Div d3 = new Div();
                Paragraph p3 = new Paragraph("Payment Type:Sale Incentive\n").SetFontColor(ColorConstants.MAGENTA);
                d3.Add(p3);
                var tableData = GenerateTableRow(rowData, columnWidths, HeaderCell);
                tableData.SetCaption(d3);
                doc.Add(tableData);
            }
            rowData = PaymentList.Where(c => c.SalaryComponet == SalaryComponet.Others).ToList();
            if (rowData.Count > 0)
            {
                Div d3 = new Div();
                Paragraph p3 = new Paragraph("Payment Type:Other(s) Incentive\n").SetFontColor(ColorConstants.MAGENTA);
                d3.Add(p3);
                var tableData = GenerateTableRow(rowData, columnWidths, HeaderCell);
                tableData.SetCaption(d3);
                doc.Add(tableData);
            }
            rowData = PaymentList.Where(c => c.SalaryComponet == SalaryComponet.PaidLeave).ToList();
            if (rowData.Count > 0)
            {
                Div d3 = new Div();
                Paragraph p3 = new Paragraph("Payment Type:Paid Leaves\n").SetFontColor(ColorConstants.MAGENTA);
                d3.Add(p3);
                var tableData = GenerateTableRow(rowData, columnWidths, HeaderCell);
                tableData.SetCaption(d3);
                doc.Add(tableData);
            }
            rowData = PaymentList.Where(c => c.SalaryComponet == SalaryComponet.SickLeave).ToList();
            if (rowData.Count > 0)
            {
                Div d3 = new Div();
                Paragraph p3 = new Paragraph("Payment Type:Sick Leaves\n").SetFontColor(ColorConstants.MAGENTA);
                d3.Add(p3);
                var tableData = GenerateTableRow(rowData, columnWidths, HeaderCell);
                tableData.SetCaption(d3);
                doc.Add(tableData);
            }

            doc.Close();
            pdfDoc.Close();
            pdfWriter.Close();
            return PDFHelper.AddPageNumber(FileName, "Report_" + FileName);
        }

        private string GetDebuggerDisplay()
        {
            return ToString();
        }
    }
}