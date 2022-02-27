using eStore.Shared.ViewModels.Printers;
using iText.Kernel.Font;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using PDFtoPrinter;
using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using Path = System.IO.Path;

namespace eStore.BL.Ops.Printers
{
    public class InvoicePrinter
    {
        public static void PrintPDFLocal(string filePath)
        {
            PrinterSettings settings = new PrinterSettings();

            string printerName = "Microsoft Print to PDF";

            if (!String.IsNullOrEmpty(settings.PrinterName))
                printerName = settings.PrinterName;

            var printer = new PDFtoPrinterPrinter();
            printer.Print(new PrintingOptions(printerName, filePath));
        }

        public static void TestPrint()
        {
            string fileName = Path.GetTempPath() + "testprint.pdf";

            using PdfWriter pdfWriter = new PdfWriter(fileName);
            using PdfDocument pdf = new PdfDocument(pdfWriter);
            Document pdfDoc = new Document(pdf);
            //Header
            Paragraph p = new Paragraph("Hello! \n This is Test Print for testing default printer!. \n\n Aprajita Retails Dev. Team.");
            pdfDoc.Add(p);
            pdf.AddNewPage();
            pdfDoc.Close();

            PrintPDFLocal(fileName);
        }

        public static string PrintManaulInvoice(ReceiptHeader header, ReceiptItemTotal itemTotals, ReceiptDetails details, List<ReceiptItemDetails> itemDetail, bool isRePrint = true)
        {
            try
            {
                string fName = "MInvoiceNo_" + details.BillNo.Substring(9) + ".pdf";
                string fileName = Path.Combine("wwwroot", fName);

                using PdfWriter pdfWriter = new PdfWriter(fileName);
                using PdfDocument pdf = new PdfDocument(pdfWriter);

                Document pdfDoc = new Document(pdf, new PageSize(240, 1170));

                pdfDoc.SetMargins(10, 5, 10, 5);

                Style code = new Style();
                PdfFont timesRoman = PdfFontFactory.CreateFont(iText.IO.Font.Constants.StandardFonts.TIMES_ROMAN);
                code.SetFont(timesRoman).SetFontSize(12);

                //Header
                Paragraph p = new Paragraph(header.StoreName + "\n").SetFontSize(12);
                p.SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER);
                p.Add(header.StoreAddress + "\n");
                p.Add(header.StoreCity + "\n");
                p.Add("Ph No: " + header.StorePhoneNo + "\n");
                p.Add(header.StoreGST + "\n");

                pdfDoc.Add(p);

                //Details
                Paragraph ip = new Paragraph().SetFontSize(12);

                ip.Add(PrintInvoiceLine.DotedLine);
                ip.AddTabStops(new TabStop(50));
                ip.Add(" " + PrintInvoiceLine.InvoiceTitle + "\n");
                ip.Add(PrintInvoiceLine.DotedLine);
                ip.Add(ReceiptDetails.Employee + "\n");
                ip.Add(details.BillNo + "\n");
                ip.AddTabStops(new TabStop(30));
                ip.Add("  " + details.BillDate + "\n");
                ip.AddTabStops(new TabStop(30));
                ip.Add("  " + details.BillTime + "\n");

                ip.Add(details.CustomerName + "\n");
                ip.Add(PrintInvoiceLine.DotedLine);

                ip.Add(PrintInvoiceLine.ItemLineHeader1 + "\n");
                ip.Add(PrintInvoiceLine.ItemLineHeader2 + "\n");

                ip.Add(PrintInvoiceLine.DotedLine);

                double gstPrice = 0.00;
                double basicPrice = 0.00;
                string tab = "    ";

                foreach (ReceiptItemDetails itemDetails in itemDetail)
                {
                    if (itemDetails != null)
                    {
                        ip.Add(itemDetails.SKUDescription + itemDetails.HSN + "/\n");
                        ip.Add(itemDetails.MRP + tab + tab);
                        ip.Add(itemDetails.QTY + tab + tab + itemDetails.Discount + tab + tab + itemDetails.Amount);
                        //ip.Add(itemDetails.GSTPercentage + "%" + tab + tab + itemDetails.GSTAmount + tab + tab);
                        //ip.Add(itemDetails.GSTPercentage + "%" + tab + tab + itemDetails.GSTAmount + "\n");
                        gstPrice += Double.Parse(itemDetails.GSTAmount);
                        basicPrice += Double.Parse(itemDetails.BasicPrice);
                    }
                }

                ip.Add("\n" + PrintInvoiceLine.DotedLine);

                ip.Add("Total: " + itemTotals.TotalItem + tab + tab + tab + tab + tab + itemTotals.NetAmount + "\n");
                ip.Add("item(s): " + itemTotals.ItemCount + tab + "Net Amount:" + tab + itemTotals.NetAmount + "\n");
                ip.Add(PrintInvoiceLine.DotedLine);

                ip.Add("Tender(s)\n Paid Amount:\t\t Rs. " + itemTotals.CashAmount); //TODO: cash/Card option can be changed here

                // ip.Add("\n" + PrintInvoiceLine.DotedLine);
                //ip.Add("Basic Price:\t\t" + basicPrice.ToString("0.##"));
                //ip.Add("\nCGST:\t\t" + gstPrice.ToString("0.##"));
                //ip.Add("\nSGST:\t\t" + gstPrice.ToString("0.##") + "\n");
                //ip.Add (PrintLine.DotedLine);
                pdfDoc.Add(ip);

                //Footer
                Paragraph foot = new Paragraph().SetFontSize(12);
                //foot.SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER);
                foot.Add(PrintInvoiceLine.FooterFirstMessage + "\n");
                foot.Add(PrintInvoiceLine.DotedLine);
                foot.Add(PrintInvoiceLine.FooterThanksMessage + "\n");
                foot.Add(PrintInvoiceLine.FooterLastMessage + "\n");
                foot.Add(PrintInvoiceLine.DotedLine);
                foot.Add("\n");// Just to Check;
                if (isRePrint)
                {
                    foot.Add("(Reprinted)\n");
                }
                foot.Add("Printed on: " + DateTime.Now + "\n");
                pdfDoc.Add(foot);
                pdfDoc.Close();

                //Print to Default Local Added Printer
                // PrintPDFLocal(fileName);
                return fName;
            }
            catch (Exception exp)
            {
                return exp.Message;
            }
        }
    }
}