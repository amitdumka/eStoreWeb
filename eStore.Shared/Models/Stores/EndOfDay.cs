using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Stores
{
    /// <summary>
    /// @Version: 5.0
    /// </summary>
    public class EndOfDay : BaseST
    {
        public int EndOfDayId { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "EOD Date")]
        // [Index(IsUnique = true)]
        public DateTime EOD_Date { get; set; }

        public float Shirting { get; set; }
        public float Suiting { get; set; }
        public int USPA { get; set; }

        [Display (Name = "FM/Arrow/Others")]
        public int FM_Arrow { get; set; }

        [Display (Name = "Arvind RTW")]
        public int RWT { get; set; }

        [Display (Name = "Accessories")]
        public int Access { get; set; }

        [Display (Name = "Cash at Store")]
        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal CashInHand { get; set; }

        //public int TailoringBooking { get; set; }
        //public int TailoringDelivery { get; set; }
    }

    public class PettyCashBook : BaseSNT
    {
        public int PettyCashBookId { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime OnDate { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal OpeningCash { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal ClosingCash { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal SystemSale { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal TailoringSale { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal ManualSale { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal CashReciepts { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal OhterReceipts { get; set; }

        public string RecieptRemarks { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal CardSwipe { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal BankDeposit { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal TotalExpenses { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal TotalPayments { get; set; }

        public string PaymentRemarks { get; set; }
        public string CustomerDuesNames { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal TotalDues { get; set; }
    }
}