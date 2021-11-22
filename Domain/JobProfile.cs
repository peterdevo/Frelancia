

using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Domain
{
  public class JobProfile
  {
    public Guid Id { get; set; }
    public string ProfileName { get; set; }
    [JsonIgnore]
    public Niche Niche { get; set; }
    public int NicheId { get; set; }
    public ICollection<JobLink> JobLinks { get; set; }=new List<JobLink>();
    public string UserId { get; set; }
    public User User { get; set; }

    [JsonIgnore]
    public ICollection<Job> Job { get; set; }
    public string Photos { get; set; }
    public string Description { get; set; }
    public DateTime CreateAt { get; set; }
  }
}
