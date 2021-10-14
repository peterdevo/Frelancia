using System;
using System.Collections.Generic;

namespace Domain
{
  public class Niche
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public ICollection<JobProfile> JobProfiles { get; set; }
  }
}