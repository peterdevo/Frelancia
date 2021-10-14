

using System;
using System.Collections.Generic;

namespace Domain
{
    public class JobProfile
    {
      public Guid Id { get; set; }
      public string Niche { get; set; }
      public ICollection<JobLink> JobLinks { get; set; }
      public string Description { get; set; }
      public DateTime CreateAt { get; set; }
    }
}
