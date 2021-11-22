using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.JobProfiles
{
  public class JobProfileDto
  {
    public Guid Id { get; set; }
    public Niche Niche { get; set; }
    public string Photos { get; set; }
    public string Description { get; set; }
    public DateTime CreateAt { get; set; }
  }
}