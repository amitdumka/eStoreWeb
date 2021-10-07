using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Accounts.Expenses
{
    public class Rent : BaseST
    {
        public int RentId { get; set; }

        [Display (Name = "Location")]
        public int RentedLocationId { get; set; }

        public virtual RentedLocation Location { get; set; }
        public RentType RentType { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "Date")]
        public DateTime OnDate { get; set; }

        public string Period { get; set; }

        [Display (Name = "Amount")]
        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal Amount { get; set; }

        public PaymentMode Mode { get; set; }
        public string PaymentDetails { get; set; }
        public string Remarks { get; set; }
    }
}