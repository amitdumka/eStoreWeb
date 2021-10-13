using System;
using System.Collections.Generic;
using System.Text;

namespace eStore.Shared.Modals.Common
{   
    /// <summary>
    /// Contact: Version 6.0
    /// Record A contact details 
    /// </summary>
    public class Contact
    {
        public int ContactId { get; set; }

        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Phone]
        [Display(Name = "Mobile No")]
        public string MobileNo { get; set; }

        [Display(Name = "Phone No")]
        public string PhoneNo { get; set; }

        [EmailAddress]
        [Display(Name = "eMail")]
        public string? EMailAddress { get; set; }

        [Display(Name = "Notes")]
        public string Remarks { get; set; }
    }
}
