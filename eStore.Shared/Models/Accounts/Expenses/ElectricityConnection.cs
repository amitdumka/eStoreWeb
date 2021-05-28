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

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Start Date")]
        public DateTime OnDate { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Vacate Date")]
        public DateTime? VacatedDate { get; set; }

        public string City { get; set; }
        public string OwnerName { get; set; }
        public string MobileNo { get; set; }
        public decimal RentAmount { get; set; }
        public decimal AdvanceAmount { get; set; }
        public bool IsRented { get; set; }
        public RentType RentType { get; set; }
    }

    public class Rent : BaseST
    {
        public int RentId { get; set; }
        [Display(Name = "Location")]
        public int RentedLocationId { get; set; }
        public virtual RentedLocation Location { get; set; }
        public RentType RentType { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Date")]
        public DateTime OnDate { get; set; }

        public string Period { get; set; }

        [Display(Name = "Amount")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal Amount { get; set; }

        public PaymentMode Mode { get; set; }
        public string PaymentDetails { get; set; }
        public string Remarks { get; set; }
    }
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

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true), Display(Name = "Connection Date")]
        public DateTime ConnectinDate { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true), Display(Name = "Disconnection Date")]
        public DateTime? DisconnectionDate { get; set; }

        public int KVLoad { get; set; }
        public bool OwnedMetter { get; set; }

        [Display(Name = "Connection Amount"), DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TotalConnectionCharges { get; set; }
        [Display(Name = "Security Deposit"), DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal SecurityDeposit { get; set; }
        public string Remarks { get; set; }
    }

    public class EletricityBill : BaseSNT
    {
        public int EletricityBillId { get; set; }
        public int ElectricityConnectionId { get; set; }
        public string BillNumber { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true), Display(Name = "Date")]
        public DateTime BillDate { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true), Display(Name = "Date")]
        public DateTime MeterReadingDate { get; set; }

        public double CurrentMeterReading { get; set; }
        public double TotalUnit { get; set; }

        [Display(Name = "Current Amount"), DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal CurrentAmount { get; set; }
        [Display(Name = "Arrear Amount"), DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal ArrearAmount { get; set; }
        [Display(Name = "Net Amount"), DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal NetDemand { get; set; }

        public ElectricityConnection Connection { get; set; }
    }

    public class EBillPayment : BaseST
    {
        public int EBillPaymentId { get; set; }
        public int EletricityBillId { get; set; }
        public virtual EletricityBill Bill { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true), Display(Name = "Payment Date")]
        public DateTime PaymentDate { get; set; }
        [Display(Name = "Amount"), DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal Amount { get; set; }
        public PaymentMode Mode { get; set; }
        public string PaymentDetails { get; set; }
        public string Remarks { get; set; }
        public bool IsPartialPayment { get; set; }
        public bool IsBillCleared { get; set; }
    }
}
