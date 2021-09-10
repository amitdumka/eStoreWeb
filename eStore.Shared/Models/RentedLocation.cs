using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Accounts.Expenses
{
    /// <summary>
    /// @Version: 5.0
    /// </summary>

    public class RentedLocation : BaseSNT
    {
        public int RentedLocationId { get; set; }
        public string PlaceName { get; set; }
        public string Address { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "Start Date")]
        public DateTime OnDate { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "Vacate Date")]
        public DateTime? VacatedDate { get; set; }

        public string City { get; set; }
        public string OwnerName { get; set; }
        public string MobileNo { get; set; }

        [Display (Name = "Rent Amount"), DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal RentAmount { get; set; }

        [Display (Name = "Advance Amount"), DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal AdvanceAmount { get; set; }

        public bool IsRented { get; set; }
        public RentType RentType { get; set; }
    }
}