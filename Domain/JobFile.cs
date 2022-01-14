using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain
{
  public class JobFile
  {
    public int Id { get; set; }
    public string PublicId { get; set; }
    public string Name { get; set; }
    public string Url { get; set; }
    public Guid JobProfileId { get; set; }
    [JsonIgnore]
    public JobProfile JobProfile { get; set; }
  }
}