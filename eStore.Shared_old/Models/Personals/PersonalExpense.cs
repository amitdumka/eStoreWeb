using System;

public enum ExpenseCategory
{
    Clothing, Travelling, Hotels, Fooding,
    Comunications, Gifts, UnSecuredLoan, HomeExpenses, Others, Personal, Eletronics, MobilePhone,
    Payments, CreditCard, Medicine, MedicalExpenses, PremiumItems, PettyCash
}

namespace eStore.Shared.Models.Personals
{
    public class PersonalExpense
    {
        public int PersonalExpenseId { get; set; }
        public DateTime OnDate { get; set; }
        public ExpenseCategory Category { get; set; }
        public string Particulars { get; set; }
        public string Remarks { get; set; }
        public bool IsPrivate { get; set; }
        public PaymentMode PaymentMode { get; set; }
        public virtual Banking.BankAccount BankAccount { get; set; }
        public int? BankAccountId { get; set; }
        public string BankDetails { get; set; }
        public string InvoiceNo { get; set; }
        public decimal Amount { get; set; }
        public bool IsWithInvoice { get; set; }
        public string URL { get; set; }
        public bool IsReadOnly { get; set; }
        public string User { get; set; }
    }
}