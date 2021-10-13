using System;
using System.Collections.Generic;
using System.Text;

namespace eStore.Shared.Modals.Sales
{
    public class DueRecoverd : BaseST
    {
        public int DueRecoverdId { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Recovery Date")]
        public DateTime PaidDate { get; set; }

        public int DuesListId { get; set; }
        public virtual DuesList DuesList { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal AmountPaid { get; set; }

        [Display(Name = "Is Partial Payment")]
        public bool IsPartialPayment { get; set; }

        public PaymentMode Modes { get; set; }
        public string Remarks { get; set; }

    }

}
