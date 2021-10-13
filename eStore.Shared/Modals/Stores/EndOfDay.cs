using System;
using System.Collections.Generic;
using System.Text;

namespace eStore.Shared.Modals.Stores
{
    public class EndOfDay:BaseST
    {
        public int EndOfDayId { get; set; }

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
        [Display(Name = "Cash at Store")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal CashInHand { get; set; }
    }
    
}
