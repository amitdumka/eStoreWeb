using System;
using System.Collections.Generic;
using System.IO;
using iText.Kernel.Colors;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;

namespace eStore.Reports.Pdfs
{
    /// <summary>
    /// Report PDF Generator. One Function Call PDF is created. 
    /// </summary>
    public class ReportPDFGenerator
    {
        public ReportPDFGenerator()
        {
        }

        /// <summary>
        /// Checks for File is physcially present or not
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public string IsExist(string fileName)
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
        public string[] FileListPDF()
        {
            string[] filePaths = Directory.GetFiles(Directory.GetCurrentDirectory(), "*.pdf");
            return filePaths;
        }

        /// <summary>
        /// Delete all pdf file from working directory except filename provided as parameter.
        /// </summary>
        /// <param name="fileName">PDF Filename which need to be ignored</param>
        /// <returns></returns>
        public bool FileCleanUp(string fileName)
        {
            string[] filePaths = Directory.GetFiles(Directory.GetCurrentDirectory(), "*.pdf");
            foreach (var item in filePaths)
                if (!item.Contains(fileName))
                    File.Delete(item);
            return true;
        }
       

        /// <summary>
        /// Add Page Number to Generate PDF File. 
        /// </summary>
        /// <param name="sourceFilename">Pass the source file path</param>
        /// <param name="outputFileName">Pass new Destination file path</param>
        /// <returns>Return newly create pdf file path</returns>
        public string AddPageNumber(string sourceFilename, string outputFileName)
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

        /// <summary>
        /// Generate Table to Fill Data in.[Templete the table ]
        /// </summary>
        /// <param name="columnWidths"></param>
        /// <param name="HeaderCell"></param>
        /// <returns></returns>
        public Table GenerateTable(float[] columnWidths, Cell[] HeaderCell)
        {
            //Table Footer
            Cell[] FooterCell = new[]
           {
                //TODO: ConData Need to be Consolidate
                new Cell(1,4).Add(new Paragraph(ConData.CName +" / "+ConData.CAdd) .SetFontColor(DeviceGray.GRAY)),
                new Cell(1,2).Add(new Paragraph("D:"+DateTime.Now) .SetFontColor(DeviceGray.GRAY)),
            };
            Table table = new Table(UnitValue.CreatePercentArray(columnWidths)).SetBorder(new OutsetBorder(2));

            //TODO: Font Color need to be tried and test for best color code by creating own color code chart
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
        /// Generate PDF file from Data provided
        /// </summary>
        /// <param name="reportName">Pass Name of the report </param>
        /// <param name="reportHeaderLine"> Headline for the report</param>
        /// <param name="pList"> List of Item in type of paragraph to be added to documents</param>
        /// <param name="IsLandscape">Page Orirentation</param>
        /// <returns></returns>
        public string CreatePdf(string reportName, string reportHeaderLine, List<Object> pList, bool IsLandscape)
        {
            string FileName = reportName + "_Report.pdf";

            string path = System.IO.Path.Combine(ConData.WWWroot, FileName);

            //Setting Page size and orientation. 
            var PageType = PageSize.A4;
            if (IsLandscape)
                PageType = PageSize.A4.Rotate();

            using PdfWriter pdfWriter = new PdfWriter(FileName);
            using PdfDocument pdfDoc = new PdfDocument(pdfWriter);
            using Document doc = new Document(pdfDoc, PageType);

            //Adding Border on all side of PDF
            doc.SetBorderTop(new SolidBorder(2));

            //Adding Report Header with Company Name and type of report
            Paragraph header = new Paragraph($"{ConData.CName} \n {ConData.CAdd}\n")
               .SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER)
               .SetFontColor(ColorConstants.RED);
            doc.Add(header);

            Paragraph info = new Paragraph($"\n {reportHeaderLine}.")
                .SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER)
               .SetFontColor(ColorConstants.RED);
            doc.Add(info);

            try
            {

                Paragraph reportTime = new Paragraph($"\n Report Date: {DateTime.Now.ToString()}(GMT).\n")
                       .SetTextAlignment(TextAlignment.LEFT)
                      .SetFontColor(ColorConstants.BLACK);
                doc.Add(reportTime);
            }
            catch (Exception ex)
            {
                Paragraph pEx = new Paragraph("\n" + ex.Message + "\n");
                doc.Add(pEx);
            }

            //Adding All Paragraph and tables in the paragraph to Document

            foreach (var para in pList)
            {
                doc.Add((IBlockElement)para);
            }

            doc.Close();
            pdfDoc.Close();
            pdfWriter.Close();
            //Returning PDF File path with name after adding Page Number
            return AddPageNumber(FileName, "Final_" + FileName);
        }

        /// <summary>
        /// Generate Paragraph from the text [Templete Function for add text]
        /// </summary>
        /// <param name="textData"></param>
        /// <param name="alignment"></param>
        /// <param name="color"></param>
        /// <returns></returns>
        public Paragraph AddParagraph(string textData, iText.Layout.Properties.TextAlignment? alignment, Color? color)
        {
            Paragraph p = new Paragraph(textData);
            if (alignment != null)
                p.SetTextAlignment(alignment);
            if (color != null)
                p.SetFontColor(color);
            return p;
        }

        
        public void PrintPdf() { }
    }
}

