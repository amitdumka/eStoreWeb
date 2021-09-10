using eStore.Shared.Models.Stores;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace eStore.Shared.Models
{
    public class BaseST : BaseGT
    {
        [DefaultValue (1)]
        [Display (Name = "Store")]
        public int StoreId { get; set; }

        public virtual Store Store { get; set; }
    }

    public class BaseGT
    {
        public string UserId { get; set; }
        public EntryStatus EntryStatus { get; set; }
        public bool IsReadOnly { get; set; }
    }

    public class BaseNT
    {
        public string UserId { get; set; }
        public bool IsReadOnly { get; set; }
    }

    public class BaseSNT : BaseNT
    {
        [DefaultValue (1)]
        [Display (Name = "Store")]
        public int StoreId { get; set; }

        public virtual Store Store { get; set; }
    }
}