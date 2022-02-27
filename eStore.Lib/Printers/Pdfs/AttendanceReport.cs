using eStore.BL.Reports.Payroll;
using iText.IO.Font.Constants;
using iText.Kernel.Colors;
using iText.Kernel.Font;
using iText.Kernel.Geom;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using System;
using System.Collections.Generic;
using Path = System.IO.Path;
using PdfDocument = iText.Kernel.Pdf.PdfDocument;
using PdfFont = iText.Kernel.Font.PdfFont;
using PdfWriter = iText.Kernel.Pdf.PdfWriter;

namespace eStore.BL.Printers.Pdfs
{
    public class AttendancePdfReport
    {
        private static string AttStatus(AttUnit status)
        {
            switch (status)
            {
                case AttUnit.Present:
                    return "Present";

                case AttUnit.Absent:
                    return "Absent";

                case AttUnit.HalfDay:
                    return "Half Day";

                case AttUnit.Sunday:
                    return "Sunday";

                case AttUnit.Holiday:
                    return "Holiday";

                case AttUnit.StoreClosed:
                    return "Store Closed";

                case AttUnit.SundayHoliday:
                    return "Weekly Leave";

                case AttUnit.SickLeave:
                    return "Sick Leave";

                case AttUnit.PaidLeave:
                    return "Paid Leave";

                case AttUnit.CasualLeave:
                    return "Casual Leave";

                case AttUnit.OnLeave:
                    return "On Leave";

                default:
                    return "Not Valid";
            }
        }

        private static string EmpCategory(EmpType emp)
        {
            switch (emp)
            {
                case EmpType.Salesman:
                    return "Salesman";

                case EmpType.StoreManager:
                    return "Store Manager";

                case EmpType.HouseKeeping:
                    return "House Keeping";

                case EmpType.Owner:
                    return "Owner";

                case EmpType.Accounts:
                    return "Accountant";

                case EmpType.TailorMaster:
                    return "Tailor Master";

                case EmpType.Tailors:
                    return "Tailors";

                case EmpType.TailoringAssistance:
                    return "Tailoring Assistance";

                case EmpType.Others:
                    return "Other";

                default:
                    return "Error";
            }
        }

        public static void Print(List<AttendanceReport> reports)
        {
        }

        public static void Print(AttendanceReport report)
        {
            string fileName = $"AttendanceReport_Emp-{report.EmployeeId}_{report.StaffName}_{DateTime.Now.ToFileTimeUtc()}.pdf";
            string path = Path.Combine(ReportHeaderDetails.WWWroot, fileName);

            using PdfWriter pdfWriter = new PdfWriter(fileName);
            using PdfDocument pdfDoc = new PdfDocument(pdfWriter);
            using Document doc = new Document(pdfDoc, PageSize.A4);

            Paragraph header = new Paragraph(ReportHeaderDetails.FirstLine + "\n")
                .SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER)
                .SetFontColor(ColorConstants.RED);
            header.Add(ReportHeaderDetails.SecondLine + "\n\n Attendance Report\n");
            doc.Add(header);

            Paragraph empDetails = new Paragraph("").SetTextAlignment(iText.Layout.Properties.TextAlignment.LEFT)
                .SetFontColor(ColorConstants.BLUE);
            empDetails.Add($"EMP-Id: #{report.EmployeeId}\nEmployee Name: {report.StaffName}\n");
            empDetails.Add($"eMail: {report.Email}\n");
            empDetails.Add($"Department: {EmpCategory(report.Category)}\n\n");
            empDetails.Add($"Report Date: {report.ReportGenerationDate}\n");

            doc.Add(empDetails);
            PdfFont f = PdfFontFactory.CreateFont(StandardFonts.HELVETICA);
            float[] columnWidths = { 1, 5, 15, 5, 5, 5 };

            Cell[] HeaderCell = new Cell[]{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Status").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Remarks").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Valid").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Unit").SetTextAlignment(TextAlignment.CENTER))
            };
            Cell[] FooterCell = new[]
            {
                new Cell(1,4).Add(new Paragraph(ReportHeaderDetails.FirstLine +" / "+ReportHeaderDetails.SecondLine) .SetFontColor(DeviceGray.GRAY)),
                new Cell(1,2).Add(new Paragraph("D:"+DateTime.Now) .SetFontColor(DeviceGray.GRAY)),
            };

            foreach (var monthly in report.MonthlyAttendances)
            {
                doc.Add(PrintTable(HeaderCell, FooterCell, columnWidths, f, monthly));
                doc.Add(new AreaBreak());
            }
            doc.Close();
            pdfDoc.Close();
            pdfWriter.Close();
        }

        private static Table PrintTable(Cell[] HeaderCell, Cell[] FooterCell, float[] columnWidths, PdfFont f, MonthlyAttendance monthly)
        {
            Table table = new Table(UnitValue.CreatePercentArray(columnWidths)).SetBorder(new OutsetBorder(2));
            Cell cell = new Cell(1, columnWidths.Length)
                   .Add(new Paragraph($"Year: {monthly.OnDate.Year}"))
                   .SetFont(f)
                   .SetFontSize(13)
                   .SetFontColor(DeviceGray.WHITE)
                   .SetBackgroundColor(DeviceGray.BLACK)
                   .SetTextAlignment(TextAlignment.CENTER);

            table.AddHeaderCell(cell);
            foreach (Cell hfCell in HeaderCell)
            {
                table.AddHeaderCell(hfCell);
            }
            foreach (Cell hfCell in FooterCell)
            {
                table.AddFooterCell(hfCell);
            }

            int count = 0;
            foreach (var item in monthly.Jan)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.OnDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Status.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.IsValid.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Unit.ToString("0.##"))));
            }

            return table;
        }
    }

    public class ReportHeaderDetails
    {
        // For other Purpose it should take data from stores table
        public const string FirstLine = "Aprajita Retails";

        public const string SecondLine = "Bhagalpur Road, Dumka";
        public const string CashBook = "Cash Book";
        public const string WWWroot = "wwwroot";
    }

    public class ReportHeader
    {
        public string FirstLine { get; set; }
        public string SecondLine { get; set; }
    }
}