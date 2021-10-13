using System;
using System.Collections.Generic;
using System.Text;

namespace eStore.Shared.Modals.Stores
{
    /// <summary>
    /// Client : Version 6.0
    /// It has details of Client which has Lic to use eStore SRP
    /// </summary>
    public class Client
    {
        public int    ClinetId { get; set; }
        public string ClientName { get; set; }
        public string Address { get; set; }
        public string ContactNumber { get; set; }
        public string EMail { get; set; }
        public string LicKey { get; set; }
        public string OnDate { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        
    }
}
