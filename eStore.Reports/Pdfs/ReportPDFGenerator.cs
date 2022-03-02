using System;
using System.IO;
using iText.Kernel.Colors;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;

namespace eStore.Reports.Pdfs
{
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
        public void CreatePDF() { }
        public void AddParagraph() { }
        public void GenerateTable() { }
        public void PrintPdf() { }
    }
}

