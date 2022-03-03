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

namespace eStore.Reports.Pdfs
{
    internal class PDFHelper
    {
        [Obsolete]
        public static string CreateReportPdf(string reportName, string reportHeaderLine, List<Paragraph> pList, bool IsLandscape)
        {
            string FileName = reportName + "_Report.pdf";
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

            Paragraph info = new Paragraph($"\n {reportHeaderLine}.\n")
                .SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER)
               .SetFontColor(ColorConstants.RED);
            doc.Add(info);

            foreach (var para in pList)
            {
                doc.Add(para);
            }
            doc.Close();
            pdfDoc.Close();
            pdfWriter.Close();
            return PDFHelper.AddPageNumber(FileName, "Final_" + FileName);
        }

        /// <summary>
        /// Generate Table formate to fill data in.
        /// </summary>
        /// <param name="columnWidths"></param>
        /// <param name="HeaderCell"></param>
        /// <returns></returns>
        [Obsolete]
        public static Table GenerateTable(float[] columnWidths, Cell[] HeaderCell)
        {
            //Table Footer
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

        /// <summary>
        /// Need to make Genric
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        [Obsolete]
        public static string IsExist(string fileName)
        {
            //string fileName = $"FinReport_{repName}_{StartYear}_{EndYear}.pdf";
            if (File.Exists(fileName))
                return fileName;
            else
                return "ERROR";
        }

        /// <summary>
        /// List PDF File in working directory
        /// </summary>
        /// <returns></returns>
        [Obsolete]
        public static string[] FileListPDF()
        {
            string[] filePaths = Directory.GetFiles(Directory.GetCurrentDirectory(), "*.pdf");
            return filePaths;
        }

        /// <summary>
        /// Delete all pdf file from working directory except filename provided as parameter.
        /// </summary>
        /// <param name="fileName">PDF Filename which need to be ignored</param>
        /// <returns></returns>
        [Obsolete]
        public static bool FileCleanUp(string fileName)
        {
            string[] filePaths = Directory.GetFiles(Directory.GetCurrentDirectory(), "*.pdf");
            foreach (var item in filePaths)
                if (!item.Contains(fileName))
                    File.Delete(item);
            return true;
        }

        /// <summary>
        /// Add Page number to PDF file.
        /// </summary>
        /// <param name="sourceFilename"></param>
        /// <param name="outputFileName"></param>
        /// <returns></returns>
        [Obsolete]
        public static string AddPageNumber(string sourceFilename, string outputFileName)
        {
            using PdfDocument pdfDoc = new PdfDocument(new PdfReader(sourceFilename), new PdfWriter(outputFileName));
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
            FileCleanUp(outputFileName);
            return outputFileName;
        }
    }
}