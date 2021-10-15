

using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Domain
{
    public class JobProfile
    {
      public Guid Id { get; set; }

      [JsonIgnore]
      public Niche Niche { get; set; }
      public int NicheId { get; set; }
      public ICollection<JobLink> JobLinks { get; set; }

      [JsonIgnore]
      public Job Job { get; set; }
      public string Photos { get; set; }
      public string Description { get; set; }
      public DateTime CreateAt { get; set; }
    }
}
