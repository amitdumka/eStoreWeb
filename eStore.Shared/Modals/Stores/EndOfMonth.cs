using System;
using System.Collections.Generic;
using System.Text;

namespace eStore.Shared.Modals.Stores
{
    /// <summary>
    /// End of month : It record end of month.
    /// </summary>
    public class EndOfMonth : BaseST
    {
        public int EndOfMonthId { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Date")]
        // [Index(IsUnique = true)]
        public DateTime OnDate { get; set; }

        public float Shirting { get; set; }
        public float Suiting { get; set; }
        public int Readymade { get; set; }
        [Display(Name = "Accessories")]
        public int Access { get; set; }
        public int TailoringBooking { get; set; }
        public int TailoringDelivery { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal Expenses { get; set; }
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal Income { get; set; }
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal Purchase { get; set; }
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal Sales { get; set; }
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal Payments { get; set; }
    }
}
