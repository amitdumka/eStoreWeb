using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Accounts.Expenses
{
    public class EletricityBill : BaseSNT
    {
        public int EletricityBillId { get; set; }
        public int ElectricityConnectionId { get; set; }
        public string BillNumber { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true), Display (Name = "Date")]
        public DateTime BillDate { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true), Display (Name = "Date")]
        public DateTime MeterReadingDate { get; set; }

        public double CurrentMeterReading { get; set; }
        public double TotalUnit { get; set; }

        [Display (Name = "Current Amount"), DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal CurrentAmount { get; set; }

        [Display (Name = "Arrear Amount"), DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal ArrearAmount { get; set; }

        [Display (Name = "Net Amount"), DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal NetDemand { get; set; }

        public ElectricityConnection Connection { get; set; }
    }
}