using eStore.BL.Reports.CAReports;
using eStore.Database;
using iText.Kernel.Colors;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using System;
using System.Collections.Generic;
using System.IO;
using Path = System.IO.Path;

namespace eStore.BL.Reports.Payroll
{
    //TODO: Add in report total Working days and Total Attendace. add Summary table at Last.
    public class AttendanceReportPdf
    {
        private bool AllFinYear;
        private eStoreDbContext db;
        private int StoreId;
        private int StartYear, EndYear;
        private DateTime StartDate, EndDate;
        private string FileName = "AttendanceReport_";
        private string Ext = ".pdf";
        private bool isPDF = true;
        private int FinMonth;

        public AttendanceReportPdf(eStoreDbContext con, int storeId, string finyrs, int mnt, bool IsPdf)
        {
            db = con;
            StoreId = storeId;
            if (finyrs != "All")
            {
                var dats = finyrs.Split("-");
                StartYear = int.Parse(dats[0].Trim());
                EndYear = int.Parse(dats[1].Trim());
                AllFinYear = false;
                FinMonth = mnt;
            }
            else
            {
                StartYear = 2015;
                EndYear = DateTime.Now.Year + 1;
                FinMonth = 0;
                AllFinYear = true;
            }

            //FileName += $"{StartYear}_{EndYear}_{DateTime.UtcNow.ToFileTime ()}";
            isPDF = IsPdf;
        }

        public string GenerateAttendaceReportPdf(int empId, bool isRefreshed = true)
        {
            var fYear = 0;
            if (!AllFinYear)
            {
                //TODO: Handle this other wise send Message all employee with all year not prossible.

                if (FinMonth > 3 && FinMonth < 13)
                {
                    fYear = StartYear;
                }
                else if (FinMonth > 0 && FinMonth < 4)
                {
                    fYear = EndYear;
                }
                else if (FinMonth == 0)
                {
                    fYear = StartYear;
                }
                else
                {
                    fYear = -1;
                }
            }
            else
            {
                FinMonth = 0;
                fYear = 0;
            }

            var StaffName = db.Employees.Find(empId).StaffName;

            if (!isRefreshed)
            {
                var fn = IsExist(StaffName);
                if (fn != "ERROR")
                    return fn;
            }
            var data = PayrollReport.GenerateEmployeeAttendanceReport(db, empId, fYear, FinMonth);

            float[] columnWidths = { 1, 1, 5, 5, 5, 5, 5 };

            Cell[] HeaderCell = new Cell[]{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("ID")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                     new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Remarks").SetTextAlignment(TextAlignment.CENTER)),
                     new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Valid").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Status").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Unit").SetTextAlignment(TextAlignment.CENTER)),
            };
            Div d = new Div();
            Paragraph p = new Paragraph("Attendance Report").SetFontColor(ColorConstants.MAGENTA);
            p.Add($"\n\tEmp Id: {data.EmployeeId}\t Employee Name: {data.StaffName}\nReport Date: {data.ReportGenerationDate}");
            d.Add(p);
            SortedDictionary<string, List<Table>> AttList = new System.Collections.Generic.SortedDictionary<string, List<Table>>();
            foreach (var month in data.MonthlyAttendances)
            {
                AttList.Add("Year: " + month.OnDate.Year.ToString(), GenerateMonthlyReport(month, columnWidths, HeaderCell));
            }

            return PrintPDF(data.StaffName, AttList, d);
        }

        private Table GenTableRow(List<Att> att, float[] columnWidths, Cell[] HeaderCell, string MonthName)
        {
            if (att.Count < 1)
                return null;

            Table table = GenTable(columnWidths, HeaderCell);
            Div d = new Div();

            int count = 0;
            decimal totalAtt = 0;
            foreach (var mon in att)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Id.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.OnDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(mon.Remarks) ? "" : mon.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.IsValid.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Status.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Unit.ToString("0.##"))));
                totalAtt += mon.Unit;
            }
            d.Add(new Paragraph($"\n\t Month:{ MonthName}\n\t\tTotal Present: {totalAtt}").SetFontColor(ColorConstants.RED));
            table.SetCaption(d);
            return table;
        }

        private List<Table> GenerateMonthlyReport(MonthlyAttendance att, float[] columnWidths, Cell[] HeaderCell)
        {
            List<Table> tables = new List<Table>();
            tables.Add(GenTableRow(att.Apr, columnWidths, HeaderCell, "Arpil"));
            tables.Add(GenTableRow(att.May, columnWidths, HeaderCell, "May"));
            tables.Add(GenTableRow(att.Jun, columnWidths, HeaderCell, "June"));
            tables.Add(GenTableRow(att.Jul, columnWidths, HeaderCell, "July"));
            tables.Add(GenTableRow(att.Aug, columnWidths, HeaderCell, "Aug"));
            tables.Add(GenTableRow(att.Sept, columnWidths, HeaderCell, "Sept"));
            tables.Add(GenTableRow(att.Oct, columnWidths, HeaderCell, "Oct"));
            tables.Add(GenTableRow(att.Nov, columnWidths, HeaderCell, "Nov"));
            tables.Add(GenTableRow(att.Dec, columnWidths, HeaderCell, "Dec"));
            tables.Add(GenTableRow(att.Jan, columnWidths, HeaderCell, "Jan"));
            tables.Add(GenTableRow(att.Feb, columnWidths, HeaderCell, "Feb"));
            tables.Add(GenTableRow(att.Mar, columnWidths, HeaderCell, "March"));

            return tables;
        }

        private List<Table> GenerateMonthlyAttReport(MonthlyAttendance att, float[] columnWidths, Cell[] HeaderCell)
        {
            int count = 0;

            List<Table> tables = new List<Table>();

            Table table = GenTable(columnWidths, HeaderCell);
            Div d = new Div();
            d.Add(new Paragraph("\n\n\t Month: Jan"));
            table.SetCaption(d);

            foreach (var mon in att.Jan)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Id.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.OnDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(mon.Remarks) ? "" : mon.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.IsValid.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Status.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Unit.ToString("0.##"))));
            }
            tables.Add(table);
            table = GenTable(columnWidths, HeaderCell);
            d = new Div();
            d.Add(new Paragraph("\n\n\t Month: Feb"));
            table.SetCaption(d);

            foreach (var mon in att.Feb)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Id.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.OnDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(mon.Remarks) ? "" : mon.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.IsValid.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Status.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Unit.ToString("0.##"))));
            }
            tables.Add(table);
            table = GenTable(columnWidths, HeaderCell);
            d = new Div();
            d.Add(new Paragraph("\n\n\t Month: March"));
            table.SetCaption(d);
            foreach (var mon in att.Mar)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Id.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.OnDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(mon.Remarks) ? "" : mon.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.IsValid.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Status.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Unit.ToString("0.##"))));
            }
            tables.Add(table);
            table = GenTable(columnWidths, HeaderCell);
            d = new Div();
            d.Add(new Paragraph("\n\n\t Month: April"));
            table.SetCaption(d);
            foreach (var mon in att.Apr)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Id.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.OnDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(mon.Remarks) ? "" : mon.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.IsValid.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Status.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Unit.ToString("0.##"))));
            }
            tables.Add(table);
            table = GenTable(columnWidths, HeaderCell);
            d = new Div();
            d.Add(new Paragraph("\n\n\t Month: May"));
            table.SetCaption(d);
            foreach (var mon in att.May)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Id.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.OnDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(mon.Remarks) ? "" : mon.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.IsValid.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Status.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Unit.ToString("0.##"))));
            }
            tables.Add(table);
            table = GenTable(columnWidths, HeaderCell);
            d = new Div();
            d.Add(new Paragraph("\n\n\t Month: June"));
            table.SetCaption(d);
            foreach (var mon in att.Jun)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Id.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.OnDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(mon.Remarks) ? "" : mon.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.IsValid.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Status.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Unit.ToString("0.##"))));
            }
            tables.Add(table);
            table = GenTable(columnWidths, HeaderCell);
            d = new Div();
            d.Add(new Paragraph("\n\n\t Month: July"));
            table.SetCaption(d);

            foreach (var mon in att.Jul)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Id.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.OnDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(mon.Remarks) ? "" : mon.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.IsValid.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Status.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Unit.ToString("0.##"))));
            }
            tables.Add(table);
            table = GenTable(columnWidths, HeaderCell);
            d = new Div();
            d.Add(new Paragraph("\n\n\t Month: August"));
            table.SetCaption(d);
            foreach (var mon in att.Aug)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Id.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.OnDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(mon.Remarks) ? "" : mon.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.IsValid.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Status.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Unit.ToString("0.##"))));
            }
            tables.Add(table);
            table = GenTable(columnWidths, HeaderCell);
            d = new Div();
            d.Add(new Paragraph("\n\n\t Month: Sept"));
            table.SetCaption(d);
            foreach (var mon in att.Sept)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Id.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.OnDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(mon.Remarks) ? "" : mon.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.IsValid.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Status.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Unit.ToString("0.##"))));
            }
            tables.Add(table);
            table = GenTable(columnWidths, HeaderCell);
            d = new Div();
            d.Add(new Paragraph("\n\n\t Month: Oct"));
            table.SetCaption(d);
            foreach (var mon in att.Oct)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Id.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.OnDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(mon.Remarks) ? "" : mon.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.IsValid.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Status.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Unit.ToString("0.##"))));
            }
            tables.Add(table);
            table = GenTable(columnWidths, HeaderCell);
            d = new Div();
            d.Add(new Paragraph("\n\n\t Month: Nov"));
            table.SetCaption(d);
            foreach (var mon in att.Nov)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Id.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.OnDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(mon.Remarks) ? "" : mon.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.IsValid.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Status.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Unit.ToString("0.##"))));
            }
            tables.Add(table);
            table = GenTable(columnWidths, HeaderCell);
            d = new Div();
            d.Add(new Paragraph("\n\n\t Month: Dec"));
            table.SetCaption(d);
            foreach (var mon in att.Dec)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Id.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.OnDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(mon.Remarks) ? "" : mon.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.IsValid.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Status.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(mon.Unit.ToString("0.##"))));
            }
            tables.Add(table);
            return tables;
        }

        [Obsolete]
        private Table GenTable(float[] columnWidths, Cell[] HeaderCell)
        {
            Cell[] FooterCell = new[]
           {
                new Cell(1,4).Add(new Paragraph(ConData.CName +" / "+ConData.CAdd) .SetFontColor(DeviceGray.GRAY)),
                new Cell(1,2).Add(new Paragraph("D:"+DateTime.Now) .SetFontColor(DeviceGray.GRAY)),
            };
            Table table = new Table(UnitValue.CreatePercentArray(columnWidths)).SetBorder(new OutsetBorder(2));

            table.SetFontColor(ColorConstants.BLUE);
            table.SetFontSize(10);
            table.SetPadding(10f);
            table.SetMarginRight(5f);
            table.SetMarginTop(10f);

            foreach (Cell hfCell in HeaderCell)
            {
                table.AddHeaderCell(hfCell.SetFontColor(ColorConstants.RED).SetFontSize(12).SetItalic().SetBackgroundColor(ColorConstants.ORANGE));
            }
            foreach (Cell hfCell in FooterCell)
            {
                table.AddFooterCell(hfCell);
            }
            return table;
        }

        [Obsolete]
        private string PrintPDF(string repName, SortedDictionary<string, List<Table>> dataTable, Div headerDiv, bool IsLandscape = false)
        {
            string fileNameExp = $"AttendanceReport_{repName}_{DateTime.Now.ToFileTimeUtc()}.pdf";
            string fileName = $"AttendanceReport_{repName}.pdf";
            string path = Path.Combine(ConData.WWWroot, fileName);
            var PageType = PageSize.A4;
            if (IsLandscape)
                PageType = PageSize.A4.Rotate();

            using PdfWriter pdfWriter = new PdfWriter(fileName);
            using PdfDocument pdfDoc = new PdfDocument(pdfWriter);
            using Document doc = new Document(pdfDoc, PageType);
            doc.SetBorderTop(new SolidBorder(2));

            Paragraph header = new Paragraph($"{ConData.CName} \n {ConData.CAdd}\n")
               .SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER)
               .SetFontColor(ColorConstants.RED);
            doc.Add(header);

            Paragraph info = new Paragraph($"\n Attendance Report of {repName}.\n")
                .SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER)
               .SetFontColor(ColorConstants.RED);
            doc.Add(info);
            doc.Add(headerDiv);

            if (dataTable != null)
                foreach (var month in dataTable)
                {
                    Paragraph p = new Paragraph(month.Key).SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER).SetFontColor(ColorConstants.DARK_GRAY)
                        .SetBorder(new SolidBorder(0));
                    doc.Add(p);
                    foreach (var item in month.Value)
                    {
                        if (item != null)
                        {
                            doc.Add(item);
                            doc.Add(new AreaBreak());
                        }
                    }
                }
            else
            {
                Paragraph nodata = new Paragraph("No Data Avilable!").SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER).SetFontColor(ColorConstants.GREEN);
                doc.Add(nodata);
            }
            doc.Close();
            pdfDoc.Close();
            pdfWriter.Close();
            return AddPageNumber(fileName, fileNameExp);
        }


        [Obsolete]
        private string AddPageNumber(string sourceFileName, string fileName)
        {
            using PdfDocument pdfDoc = new PdfDocument(new PdfReader(sourceFileName), new PdfWriter(fileName));
            using Document doc = new Document(pdfDoc);

            int numberOfPages = pdfDoc.GetNumberOfPages();

            for (int i = 1; i <= numberOfPages; i++)
            {
                // Write aligned text to the specified by parameters point
                //doc.ShowTextAligned (new Paragraph ("Page " + i + " of " + numberOfPages),
                //        559, 806, i, TextAlignment.RIGHT, VerticalAlignment.TOP, 0);
                doc.ShowTextAligned(new Paragraph("Page " + i + " of " + numberOfPages).SetFontColor(ColorConstants.DARK_GRAY),
                       1, 1, i, TextAlignment.RIGHT, VerticalAlignment.BOTTOM, 0);
            }

            doc.Close();
            pdfDoc.Close();
            CleanUp(fileName);
            return fileName;
        }

        [Obsolete]
        private string[] FileList()
        {
            string[] filePaths = Directory.GetFiles(Directory.GetCurrentDirectory(), "*.pdf");

            return filePaths;
        }
        [Obsolete]
        private bool CleanUp(string fileName)
        {
            string[] filePaths = Directory.GetFiles(Directory.GetCurrentDirectory(), "*.pdf");
            foreach (var item in filePaths)
            {
                if (item.Contains(fileName))
                { }
                else
                {
                    File.Delete(item);
                }
            }
            return true;
        }
        [Obsolete]
        private string IsExist(string repName)
        {
            string fileName = $"FinReport_{repName}_{StartYear}_{EndYear}.pdf";
            if (File.Exists(fileName))
                return fileName;
            else
                return "ERROR";
        }

        /// <summary>
        /// Add Page number at top of pdf file.
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns> filename saved as</returns>
        [Obsolete]
        public static string AddPageNumberToPdf(string fileName)
        {
            using PdfReader reader = new PdfReader(fileName);
            string fName = "cashBook_" + (DateTime.Now.ToFileTimeUtc() + 1001) + ".pdf";
            using PdfWriter writer = new PdfWriter(Path.Combine("wwwroot", fName));

            using PdfDocument pdfDoc2 = new PdfDocument(reader, writer);
            Document doc2 = new Document(pdfDoc2);

            int numberOfPages = pdfDoc2.GetNumberOfPages();
            for (int i = 1; i <= numberOfPages; i++)
            {
                doc2.ShowTextAligned(new Paragraph("Page " + i + " of " + numberOfPages),
                        559, 806, i, TextAlignment.RIGHT, VerticalAlignment.BOTTOM, 0);
            }
            doc2.Close();
            return fName;
        }
    }
}