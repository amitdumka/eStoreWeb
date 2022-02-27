using eStore.Shared.ViewModels;
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
using PdfReader = iText.Kernel.Pdf.PdfReader;
using PdfWriter = iText.Kernel.Pdf.PdfWriter;

namespace eStore.Ops.Printers.Reports
{
    public class ReportPrinter
    {
        /// <summary>
        /// Add Page number at top of pdf file.
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns> filename saved as</returns>
        public static string AddPageNumberToPdf(string fileName)
        {
            using PdfReader reader = new PdfReader(fileName);
            string fName = "cashBook_" + (DateTime.Now.ToFileTimeUtc() + 1001) + ".pdf";
            using PdfWriter writer = new PdfWriter(Path.Combine(ReportHeaderDetails.WWWroot, fName));

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

        public static string PrintCashBook(List<CashBook> cbList)
        {
            string fName = "cashBook_" + DateTime.Now.ToFileTimeUtc() + ".pdf";

            string fileName = Path.Combine(ReportHeaderDetails.WWWroot, fName);
            using PdfWriter pdfWriter = new PdfWriter(fileName);
            using PdfDocument pdfDoc = new PdfDocument(pdfWriter);
            using Document doc = new Document(pdfDoc, PageSize.A4);

            Paragraph header = new Paragraph(ReportHeaderDetails.FirstLine + "\n")
                .SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER)
                .SetFontColor(ColorConstants.RED);
            header.Add(ReportHeaderDetails.SecondLine + "\n");

            doc.Add(header);

            float[] columnWidths = { 1, 5, 15, 5, 5, 5 };
            Table table = new Table(UnitValue.CreatePercentArray(columnWidths)).SetBorder(new OutsetBorder(2));
            PdfFont f = PdfFontFactory.CreateFont(StandardFonts.HELVETICA);

            Cell cell = new Cell(1, 6)
                    .Add(new Paragraph(ReportHeaderDetails.CashBook))
                    .SetFont(f)
                    .SetFontSize(13)
                    .SetFontColor(DeviceGray.WHITE)
                    .SetBackgroundColor(DeviceGray.BLACK)
                    .SetTextAlignment(TextAlignment.CENTER);

            table.AddHeaderCell(cell);

            Cell[] headerFooter = new Cell[]{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Particulars").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("In").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Out").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Balance").SetTextAlignment(TextAlignment.CENTER))
            };

            Cell[] footer = new[]
            {
                new Cell(1,4).Add(new Paragraph(ReportHeaderDetails.FirstLine +" / "+ReportHeaderDetails.SecondLine) .SetFontColor(DeviceGray.GRAY)),
                new Cell(1,2).Add(new Paragraph("D:"+DateTime.Now) .SetFontColor(DeviceGray.GRAY)),
            };

            foreach (Cell hfCell in headerFooter)
            {
                table.AddHeaderCell(hfCell);
            }
            foreach (Cell hfCell in footer)
            {
                table.AddFooterCell(hfCell);
            }

            int count = 0;
            foreach (var item in cbList)

            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.EDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Particulars + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.CashIn.ToString("0.##"))));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.CashOut.ToString("0.##"))));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.CashBalance.ToString("0.##"))));
            }
            doc.Add(table);

            doc.Close();

            using PdfReader reader = new PdfReader(fileName);
            fName = "cashBook_" + (DateTime.Now.ToFileTimeUtc() + 1001) + ".pdf";
            using PdfWriter writer = new PdfWriter(Path.Combine(ReportHeaderDetails.WWWroot, fName));

            using PdfDocument pdfDoc2 = new PdfDocument(reader, writer);
            Document doc2 = new Document(pdfDoc2);

            int numberOfPages = pdfDoc2.GetNumberOfPages();
            for (int i = 1; i <= numberOfPages; i++)
            {
                // Write aligned text to the specified by parameters point
                doc2.ShowTextAligned(new Paragraph("Page " + i + " of " + numberOfPages),
                        559, 806, i, TextAlignment.RIGHT, VerticalAlignment.BOTTOM, 0);
            }

            doc2.Close();

            return fName;
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
}