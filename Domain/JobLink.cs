
using System.Text.Json.Serialization;

namespace Domain
{
    public class JobLink
    {
        public int Id { get; set; }
        public string URL { get; set; }

        [JsonIgnore]
        public JobProfile JobProfile { get; set; }
    }
}
