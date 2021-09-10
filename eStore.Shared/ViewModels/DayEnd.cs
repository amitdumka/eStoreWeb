using eStore.Shared.Models.Common;
using eStore.Shared.Models.Stores;

namespace eStore.Shared.ViewModels
{
    /// <summary>
    /// deals with Day end Process.
    /// </summary>
    public class DayEnd
    {
        public EndOfDay EndOfDay { get; set; }
        public CashDetail CashDetail { get; set; }
    }
}