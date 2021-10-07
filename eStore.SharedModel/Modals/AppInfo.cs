using System;

namespace eStore.Shared.Models
{
    /// <summary>
    /// @Version: 5.0
    /// </summary>
    public class AppInfo
    {
        public int AppInfoId { get; set; }
        public string Version { get; set; }
        public DateTime PublishDate { get; set; }
        public DateTime UpdateOn { get; set; }
        public string DatabaseVersion { get; set; }
        public bool IsEffective { get; set; }
    }
}