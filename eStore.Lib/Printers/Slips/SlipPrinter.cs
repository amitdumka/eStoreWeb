using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using eStore.BL.Reports.CAReports;
using eStore.Database;
using eStore.Shared.Models.Payroll;
using eStore.Database;
using System;
using System.Collections.Generic;
using eStore.BL.Reports.CAReports;
using System.IO;
using iText.Kernel.Colors;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using Path = System.IO.Path;

namespace eStore.Lib.Printers.Slip
{

    public class SlipPrinter
    {
        private int StoreId;
        private string StoreName, StoreAddress, StoreCity;
        private string SlipName, SlipNumber, PartyName, PartyAddress;
        private string Narration, Details;
        private string PaymentMode, PaymentDetail;
        private decimal Amount;
        private string AmountInString;
        private DateTime SlipDate;
        private string GSTNO;
        private string PartyLineStart, AmountLineStart, AmountLineEnd, OnAccountLine,
        PaymentDetailsLine, ForLine, PartyLineRec;

        public SlipPrinter(eStoreDbContext context, int Store){
        db=context;
        StoreId=Store;
        var st= db.Stores.Find(Store); 
        StoreName= st.StoreName; 
        StoreAddress=st.StoreAddress; 
        StoreCity=st.StoreCity;
        StorePhoneNo=st.PhoneNo;
        }
        public void GenerateSlip(){

        }

        private string CreatePDF(bool isLandScape = true)
        {
            FileName += StaffName + "_Report.pdf";
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
            Paragraph SecondLine = new Paragraph($"No.: {SlipNumber}\t\t\t\tDate: {SlipDate}").SetFontSize(10);
            pdfDoc.Add(SecondLine);
            Paragraph PartyLine = new Paragraph($"{PartLineStart} {PartyName}, {PartyAddress}\n").SetFontSize(12);
            PartyLine.Add($"{AmountLineStart} {AmountInString} only, {AmountLineEnd}\n");
            PartyLine.Added($"{OnAccountLine} {Naration} {PaymentDetailsLine} {Details}\n");
            pdfDoc(PartyLine);
            Paragraph AALine = new Paragraph($"Rs. {Amount} /-").SetFontSize(14);
            pdfDoc.Add(AALine);
            Paragraph SignLine = new Paragraph("\n\n").SetFontSize(12);
            SignLine.Added($"{ForLine}\t\t\t\t{PartyLineRec}");
            pdfDoc.Add(SignLine);


            pdfDoc.Close();
            pdf.Close();
            pdfWriter.Close();
            return AddPageNumber(FileName, "Report_" + FileName);


        }

    }
}