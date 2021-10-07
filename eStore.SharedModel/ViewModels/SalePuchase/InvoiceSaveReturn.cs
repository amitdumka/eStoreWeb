using eStore.Shared.Models.Sales;
using System;
using System.Collections.Generic;

namespace eStore.Shared.ViewModels.SalePuchase
{
    public class InvoiceSaveReturn
    {
        public int NoOfRecord { get; set; }
        public string FileName { get; set; }
    }

    public class InvoiceDetails
    {
        public SaleInvoiceView Invoice;
        public bool IsCardPayment;
        public string Msg;
        public string Error;
    }

    public class SaleItemView
    {
        public string BarCode;
        public string SmCode;
        public string ProductName;
        public decimal MRP;
        public decimal BillAmount;
        public double Qty;
        public string Units;
    }

    public class SaleInvoiceView
    {
        public string InvoiceNo;
        public string CustomerName;

        public DateTime OnDate;

        public string TotalAmount, Discount, TotalQty, NoofItem;

        public List<SaleItemView> SaleItems;
        public string PaymentMode;
        public string CashAmount;
        public string CardAmount;
        public string CardNumber;
        public string CardType;
        public string AuthCode;

        public static SaleInvoiceView CopyTo(RegularInvoice inv, List<RegularSaleItem> sItems)
        {
            List<SaleItemView> saleItems = new List<SaleItemView> ();
            foreach ( var item in sItems )
            {
                SaleItemView si = new SaleItemView
                {
                    BarCode = item.BarCode,
                    BillAmount = item.BillAmount,
                    MRP = item.MRP,
                    Qty = item.Qty,
                    ProductName = item.ProductItem.ProductName,
                    SmCode = item.Salesman.SalesmanName,
                    Units = "Pcs/Mtrs"
                };
                saleItems.Add (si);
                //TODO: add unit name
            }

            SaleInvoiceView vm = new SaleInvoiceView
            {
                SaleItems = saleItems,
                InvoiceNo = inv.InvoiceNo,
                OnDate = inv.OnDate,
                NoofItem = inv.TotalItems.ToString (),
                CustomerName = inv.Customer.FullName,
                TotalQty = inv.TotalQty.ToString (),
                TotalAmount = inv.TotalBillAmount.ToString (),
                Discount = inv.TotalDiscountAmount.ToString ()
            };

            if ( inv.PaymentDetail.CardAmount > 0 )
            {
                vm.PaymentMode = "Card";
                vm.CardAmount = inv.PaymentDetail.CardAmount.ToString ();
                vm.AuthCode = inv.PaymentDetail.CardDetail.AuthCode.ToString ();
                vm.CardNumber = inv.PaymentDetail.CardDetail.LastDigit.ToString ();
                vm.CardType = "#";
            }
            else
            {
                vm.PaymentMode = "Cash";
                vm.CashAmount = inv.PaymentDetail.CashAmount.ToString ();
            }

            return vm;
        }
    }
}