using Newtonsoft.Json;

namespace eStore.Shared.Data.Json
{
    public partial class JsonToObject
    {
        [JsonProperty ("name")]
        public string Name { get; set; }

        [JsonProperty ("value")]
        public string Value { get; set; }
    }
}