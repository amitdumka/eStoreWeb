using System;
namespace eStore.Shared.Models.Common
{
    public class StockList
    {
        public int StockListId { get; set; }
        public string Barcode { get; set; }
        public decimal Stock { get; set; }
        public DateTime LastAccess { get; set; }
        public int Count { get; set; }
    }
}
