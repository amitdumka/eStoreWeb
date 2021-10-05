using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Common
{
    // <summary>
    /// @Version: 5.0
    /// </summary>
    public class TranscationMode
    {
        [Display (Name = "Mode")]
        public int TranscationModeId { get; set; }

        //[Index(IsUnique = true)]
        [Display (Name = "Transaction Mode")]
        public string Transcation { get; set; }

        //public virtual ICollection<CashReceipt> CashReceipts { get; set; }
        //public virtual ICollection<CashPayment> CashPayments { get; set; }
    }

    public class PurchaseTaxType
    {
        public int PurchaseTaxTypeId { get; set; }

        [Display (Name = "Tax")]
        public string TaxName { get; set; }

        [Display (Name = "Tax Type")]
        public TaxType TaxType { get; set; }

        [Display (Name = "Composite Rate")]
        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal CompositeRate { get; set; }

        //Navigation
        //public ICollection<PurchaseItem> PurchaseItems { get; set; }
    }

    public class SaleTaxType
    {
        public int SaleTaxTypeId { get; set; }

        public string TaxName { get; set; }
        public TaxType TaxType { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal CompositeRate { get; set; }

        //Navigation
        //public ICollection<SaleItem> SaleItems { get; set; }
    }

    public class TaxName
    {
        public int TaxNameId { get; set; }

        [Display (Name = "Tax")]
        public string Name { get; set; }

        [Display (Name = "Tax Type")]
        public TaxType TaxType { get; set; }

        [Display (Name = "Composite Rate")]
        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal CompositeRate { get; set; }

        public bool OutPutTax { get; set; }
        //Navigation
        //public ICollection<PurchaseItem> PurchaseItems { get; set; }
    }
}