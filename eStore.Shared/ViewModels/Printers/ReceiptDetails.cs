using System;

namespace eStore.Shared.ViewModels.Printers
{
    public class ReceiptDetails
    {
        public const string Employee = "Cashier: M0001      Name: Manager"; //TODO: implement to help

        public string BillNo { get; private set; }// = "Bill NO: 67676767";
        public string BillDate { get; private set; }// = "                Date: ";
        public string BillTime { get; private set; } //= "                Time: ";
        public string CustomerName { get; private set; }// = "Customer Name: ";

        public ReceiptDetails(string invNo, DateTime onDate, string time, string custName)
        {
            BillNo = "Bill No: " + invNo;
            BillDate = "                  Date: " + onDate.Date.ToShortDateString ();
            BillTime = "                  Time: " + time;
            CustomerName = "Customer Name: " + custName;
        }
    }
}