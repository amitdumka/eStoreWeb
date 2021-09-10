using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.ViewModels
{
    public class CashBook
    {
        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true), Display (Name = "Date")]
        public DateTime EDate { get; set; }

        public string Particulars { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal CashIn { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal CashOut { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal CashBalance { get; set; }
    }
}