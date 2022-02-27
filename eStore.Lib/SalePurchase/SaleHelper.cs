using eStore.Database;
using eStore.Shared.ViewModels.SalePuchase;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace eStore.BL.SalePurchase
{
    public class SaleHelper
    {
        public static InvoiceDetails GetInvoiceData(eStoreDbContext db, int id)
        {
            var inv = db.RegularInvoices.Include(c => c.Customer).Include(c => c.PaymentDetail).ThenInclude(c => c.CardDetail).Where(c => c.RegularInvoiceId == id).FirstOrDefault();
            if (inv == null)
            { return null; }
            var saleitem = db.RegularSaleItems.Include(c => c.Salesman).Include(c => c.ProductItem).Where(c => c.InvoiceNo == inv.InvoiceNo).ToList();

            InvoiceDetails iDetails = new InvoiceDetails
            {
                Invoice = SaleInvoiceView.CopyTo(inv, saleitem),
                Error = "OK",
                Msg = "Data Present"
            };

            if (iDetails.Invoice.PaymentMode == "Card")
                iDetails.IsCardPayment = true;
            else
                iDetails.IsCardPayment = false;

            return iDetails;
        }
    }
}