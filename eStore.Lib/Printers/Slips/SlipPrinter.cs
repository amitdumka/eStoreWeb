using eStore.BL.Reports.CAReports;
using eStore.Database;
using iText.Kernel.Colors;
using iText.Kernel.Font;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using System;
using System.IO;
using Path = System.IO.Path;

namespace eStore.Lib.Printers.Slip
{
    // Slip printer should be on React side .or server side.  but create both as could be usefull in case mobile app.
    public enum SlipType { Payment, Receipt, DebitNote, CreditNote, ManualInvoice, CashMemo, SalarySlip, SalaryPayment }

    public class SlipDetail
    {
        public SlipType SlipType { get; set; }
        public int StoreId { get; set; }
        public string SlipNumber { get; set; }
        public string PartyName { get; set; }
        public string PartyAddress { get; set; }
        public decimal Amount { get; set; }
        public string PaymentDetails { get; set; }
        public PayMode PayMode { get; set; }
        public DateTime SlipDate { get; set; }
        public string Naration { get; set; }
    }

    public class SlipPrinter
    {
        private SlipDetail sDetail;
        private int StoreId;
        private string StoreName, StoreAddress, StoreCity;
        private string SlipName, StorePhoneNo;

        //private string Narration, Details;
        private string PaymentMode, PaymentDetail;

        //private decimal Amount;
        private string AmountInString;

        //private DateTime SlipDate;
        private string GSTNO;

        private string PartyLineStart, AmountLineStart, AmountLineEnd, OnAccountLine,
        PaymentDetailsLine, ForLine, PartyLineRec;

        private eStoreDbContext db;
        private string FileName = "Slip_";

        public SlipPrinter(eStoreDbContext context, int Store)
        {
            db = context;
            StoreId = Store;
            var st = db.Stores.Find(Store);
            StoreName = st.StoreName;
            StoreAddress = st.Address;
            StoreCity = st.City;
            StorePhoneNo = st.PhoneNo;
        }

        public void GenerateSlip(SlipDetail details)
        {
            sDetail = details;
        }

        private string CreatePDF(bool IsLandscape = true)
        {
            //TODO: Add QR Code and 4 Pcs copy name like Original , duplicate,
            FileName += SlipName + "_" + sDetail.SlipNumber + "_Report.pdf";
            string path = Path.Combine(ConData.WWWroot, FileName);
            var PageType = PageSize.A4;
            if (IsLandscape)
                PageType = PageSize.A4.Rotate();

            using PdfWriter pdfWriter = new PdfWriter(FileName);
            using PdfDocument pdf = new PdfDocument(pdfWriter);
            using Document pdfDoc = new Document(pdf, PageType);
            pdfDoc.SetMargins(10, 5, 10, 5);
            pdfDoc.SetBorderTop(new SolidBorder(2));

            Style code = new Style();
            PdfFont timesRoman = PdfFontFactory.CreateFont(iText.IO.Font.Constants.StandardFonts.TIMES_ROMAN);
            code.SetFont(timesRoman).SetFontSize(12);
            Paragraph TopLine = new Paragraph(GSTNO + "\t\t" + SlipName).SetFontSize(10);
            TopLine.SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER);
            pdfDoc.Add(TopLine);
            //Header
            Paragraph p = new Paragraph(StoreName + "\n").SetFontSize(12);
            p.SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER);
            p.Add(StoreAddress + "\n");
            p.Add(StoreCity + "\n");
            p.Add("Ph No: " + StorePhoneNo + "\n");
            pdfDoc.Add(p);
            Paragraph SecondLine = new Paragraph($"No.: {sDetail.SlipNumber}\t\t\t\tDate: {sDetail.SlipDate}").SetFontSize(10);
            pdfDoc.Add(SecondLine);
            Paragraph PartyLine = new Paragraph($"{PartyLineStart} {sDetail.PartyName}, {sDetail.PartyAddress}\n").SetFontSize(12);
            PartyLine.Add($"{AmountLineStart} {AmountInString} only, {AmountLineEnd}\n");
            PartyLine.Add($"{OnAccountLine} {sDetail.Naration} {PaymentDetailsLine} {sDetail.PaymentDetails}\n");
            pdfDoc.Add(PartyLine);
            Paragraph AALine = new Paragraph($"Rs. {sDetail.Amount} /-").SetFontSize(14);
            pdfDoc.Add(AALine);
            Paragraph SignLine = new Paragraph("\n\n").SetFontSize(12);
            SignLine.Add($"{ForLine}\t\t\t\t{PartyLineRec}");
            pdfDoc.Add(SignLine);

            pdfDoc.Close();
            pdf.Close();
            pdfWriter.Close();
            return AddPageNumber(FileName, "Report_" + FileName);
        }

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

        private string[] FileList()
        {
            string[] filePaths = Directory.GetFiles(Directory.GetCurrentDirectory(), "*.pdf");

            return filePaths;
        }

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

        //private string IsExist(string repName)
        //{
        //    string fileName = $"FinReport_{repName}_{StartYear}_{EndYear}.pdf";
        //    if (File.Exists(fileName))
        //        return fileName;
        //    else
        //        return "ERROR";
        //}

        /// <summary>
        /// Add Page number at top of pdf file.
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns> filename saved as</returns>
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