using System;
using System.Collections.Generic;
using System.Text;

namespace eStore.Shared.Modals
{
    public class Base
    {
        public string UserId { get; set; }
        public bool IsReadOnly { get; set; }
    }

    public class BaseST : Base
    {
        [DefaultValue(1)]
        [Display(Name = "Store")]
        public int StoreId { get; set; }
        public virtual Store Store { get; set; }
        public EntryStatus EntryStatus { get; set; }
    }
}
