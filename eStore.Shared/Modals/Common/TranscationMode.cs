using System;
using System.Collections.Generic;
using System.Text;

namespace eStore.Shared.Modals.Common
{
    // <summary>
    /// @Version: 6.0
    /// </summary>
    public class TranscationMode
    {
        [Display(Name = "Mode")]
        public int TranscationModeId { get; set; }

        [Index(IsUnique = true)]
        [Display(Name = "Transaction Mode")]
        public string Transcation { get; set; }

    }
}
