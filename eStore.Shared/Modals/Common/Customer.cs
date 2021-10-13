using System;
using System.Collections.Generic;
using System.Text;

namespace eStore.Shared.Modals.Common
{
    /// <summary>
    /// Version: 6.0
    /// Customer: Record Customer Details
    /// </summary>
    public class Customer
    {
        public int CustomerId { set; get; }

        [Display(Name = "First Name")]
        public string FirstName { set; get; }

        [Display(Name = " Last Name")]
        public string LastName { set; get; }

        public int Age { set; get; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true), Display(Name = "Date of Birth")]
        public DateTime? DateOfBirth { get; set; }

        public string City { set; get; }

        [Display(Name = "Contact No")]
        public string MobileNo { set; get; }

        public Gender Gender { set; get; }

        [Display(Name = "Bill Count")]
        public int NoOfBills { set; get; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Purchase Amount")]
        public decimal TotalAmount { set; get; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? CreatedDate { get; set; }

        [Display(Name = "Full Name")]
        public string FullName { get { return FirstName + " " + LastName; } }

    }
}
