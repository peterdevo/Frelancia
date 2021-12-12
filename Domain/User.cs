using System.Collections.Generic;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
  public class User : IdentityUser
  {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Bio { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
    public string Country { get; set; }

    [JsonIgnore]
    public UserPhoto UserPhoto { get; set; }
    public ICollection<JobProfile> JobProfiles { get; set; } = new List<JobProfile>();
    public ICollection<Job> Jobs { get; set; } = new List<Job>();
  }
}