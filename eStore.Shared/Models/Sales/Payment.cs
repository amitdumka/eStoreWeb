using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Sales
{
    public class DailySalePayment
    {
        public int DailySalePaymentId { get; set; }
        public PayMode Mode { get; set; }
        public int DailySaleId { get; set; }
        public string InvNo { get; set; }
        public int PaymentRefNo { get; set; }
        public string LinkInfo { get; set; }
        public virtual DailySale Sale { get; set; }
    }

    public class CouponPayment : PaymentBasicInfo
    {
        public int CouponPaymentId { get; set; }
        public string CouponNumber { get; set; }
    }

    public class PointRedeemed : PaymentBasicInfo
    {
        public int PointRedeemedId { get; set; }
        public string CustomerMobileNumber { get; set; }
    }

    public class EDC : BaseSNT
    {
        public int EDCId { get; set; }
        public int TID { get; set; }
        public string EDCName { get; set; }
        public int AccountNumberId { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime StartDate { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime? EndDate { get; set; }

        public bool IsWorking { get; set; }
        public string MID { get; set; }
        public string Remark { get; set; }
    }

    public class EDCTranscation : BaseSNT
    {
        public int EDCTranscationId { get; set; }
        public int EDCId { get; set; }
        public virtual EDC CardMachine { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal Amount { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime OnDate { get; set; }

        public string CardEndingNumber { get; set; }
        public CardMode CardTypes { get; set; }
        public string InvoiceNumber { get; set; }
    }

    public class MixAndCouponPayment : PaymentBasicInfo
    {
        public int MixAndCouponPaymentId { get; set; }
        public MixAndCouponPayment Mode { get; set; }
        public string Details { get; set; }
    }

    public class PaymentBasicInfo : BaseSNT
    {
        public int DailySaleId { get; set; }
        public virtual DailySale DailySale { get; set; }
        public string InvoiceNumber { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime OnDate { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal Amount { get; set; }

        public string Remarks { get; set; }
        public PayMode Mode { get; set; }
    }

    public class BankPayment : PaymentBasicInfo
    {
        public int BankPaymentId { get; set; }

        public string ReferenceNumber { get; set; }
    }

    public class WalletPayment : PaymentBasicInfo
    {
        public int WalletPaymentId { get; set; }
        public WalletType WalletType { get; set; }
        public string CustomerMobileNoRef { get; set; }
    }
}