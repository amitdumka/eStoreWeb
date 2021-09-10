using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Common
{
    /// <summary>
    /// @Version: 5.0
    /// </summary>
    public class CashDetail : BaseST
    {
        public int CashDetailId { set; get; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime OnDate { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        [Display (Name = "Total Amount")]
        public decimal TotalAmount { set; get; }

        [Display (Name = "2000")]
        public int C2000 { set; get; }

        [Display (Name = "1000")]
        public int C1000 { set; get; }

        [Display (Name = "500")]
        public int C500 { set; get; }

        [Display (Name = "100")]
        public int C100 { set; get; }

        [Display (Name = "50")]
        public int C50 { set; get; }

        [Display (Name = "20")]
        public int C20 { set; get; }

        [Display (Name = "10")]
        public int C10 { set; get; }

        [Display (Name = "5")]
        public int C5 { set; get; }

        [Display (Name = "Coin 10")]
        public int Coin10 { set; get; }

        [Display (Name = "Coin 5")]
        public int Coin5 { set; get; }

        [Display (Name = "Coin 2")]
        public int Coin2 { set; get; }

        [Display (Name = "Coin 1")]
        public int Coin1 { set; get; }
    }
}