using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Stores
{
    /// <summary>
    /// @Version: 5.0
    /// Abolsute.
    /// </summary>
    public class ArvindPayment : BaseGT
    {
        public int ArvindPaymentId { get; set; }
        public ArvindAccount Arvind { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime OnDate { get; set; }

        public string InvoiceNo { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal Amount { get; set; }

        public string BankDetails { get; set; }
        public string Remarks { get; set; }
    }
}