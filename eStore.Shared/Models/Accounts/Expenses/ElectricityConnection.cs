using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Accounts.Expenses
{
    /// <summary>
    /// @Version: 5.0
    /// </summary>
    public class ElectricityConnection : BaseSNT
    {
        public int ElectricityConnectionId { get; set; }
        public string LocationName { get; set; }
        public string ConnectioName { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PinCode { get; set; }
        public string ConsumerNumber { get; set; }
        public string ConusumerId { get; set; }
        public ConnectionType Connection { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true), Display (Name = "Connection Date")]
        public DateTime ConnectinDate { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true), Display (Name = "Disconnection Date")]
        public DateTime? DisconnectionDate { get; set; }

        public int KVLoad { get; set; }
        public bool OwnedMetter { get; set; }

        [Display (Name = "Connection Amount"), DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal TotalConnectionCharges { get; set; }

        [Display (Name = "Security Deposit"), DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal SecurityDeposit { get; set; }

        public string Remarks { get; set; }
    }
}