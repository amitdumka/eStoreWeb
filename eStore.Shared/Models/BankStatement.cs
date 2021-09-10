using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Banking
{
    public class BankStatement
    {
        public int BankStatementId { get; set; }
        public int BankAccountId { get; set; }
        public virtual BankAccount Account { get; set; }
        public string Naration { get; set; }
        public string RefNumber { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true), Display (Name = "Date")]
        public DateTime OnDate { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true), Display (Name = "Bank Date")]
        public DateTime BankDate { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money"), Display (Name = "In Amount")]
        public decimal InAmount { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money"), Display (Name = "Out Amount")]
        public decimal OutAmount { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money"), Display (Name = "Balance Amount")]
        public decimal Balance { get; set; }
    }
}