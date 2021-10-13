using System;
using System.Collections.Generic;
using System.Text;

namespace eStore.Shared.Modals.Common
{
    /// <summary>
    /// @Version: 6.0
    /// </summary>
    public class CashInHand
    {
        public int CashInHandId { get; set; }

        // [Index(IsUnique = true)]
        [Display(Name = "Cash-in-hand Date")]
        public DateTime OnDate { get; set; }

        [Display(Name = "Opening Balance")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal OpenningBalance { get; set; }
        
        [Display(Name = "Cash-In Amount")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal CashIn { get; set; }

        [Display(Name = "Cash-Out Amount")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal CashOut { get; set; }
        
        [Display(Name = "ClosingBalance")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal ClosingBalance { get; set; }

        [Display(Name = "CashInHand")]
        public decimal InHand
        {
            get
            {
                return OpenningBalance + CashIn - CashOut;
            }
        }

        [DefaultValue(1)]
        public int? StoreId { get; set; }
        public virtual Store Store { get; set; }
    }
    public class CashInBank
    {
        public int CashInBankId { get; set; }

        [Display(Name = "Cash-in-Bank Date")]
        // [Index(IsUnique = true)]
        public DateTime OnDate { get; set; }

        [Display(Name = "Opening Balance")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal OpenningBalance { get; set; }

        
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal CashIn { get; set; }

        [Display(Name = "Cash-Out Amount")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal CashOut { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money")]
        [Display(Name = "ClosingBalance")]
        public decimal ClosingBalance { get; set; }

        [Display(Name = "CashInBank")]
        public decimal InHand
        {
            get
            {
                return OpenningBalance + CashIn - CashOut;
            }
        }

        //Version 3.0
        [DefaultValue(1)]
        public int? StoreId { get; set; }

        public virtual Store Store { get; set; }
    }
}
