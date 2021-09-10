namespace eStore.Shared.ViewModels.Printers
{
    public sealed class PrintInvoiceLine
    {
        public const string InvoiceTitle = "                 RETAIL INVOICE";

        public const string ItemLineHeader1 = "SKU Code/Description/ HSN";
        public const string ItemLineHeader2 = "MRP     Qty     Disc     Amount";
        //public const string ItemLineHeader3 = "CGST%    AMT     SGST%   AMT";

        public const string FooterFirstMessage = "** Amount Inclusive GST **";
        public const string FooterThanksMessage = "Thank You";
        public const string FooterLastMessage = "Visit Again";

        public const string DotedLine = "--------------------------------------------------\n";
    }
}