
using System.Collections.Generic;
using Domain;

namespace Application.Market
{
  public class JobDetailDto
  {
    public string Title { get; set; }
    public string Introduction { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Bio { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
    public string Country { get; set; }
    public string Email { get; set; }
    public string UserPhoto { get; set; }
    public string Niche { get; set; }
    public string Language { get; set; }
    public string SocialMedia  { get; set; }
    public ICollection<JobLink> JobLinks { get; set; } = new List<JobLink>();
    public ICollection<Photo> Photos { get; set; } = new List<Photo>();
    public string Description { get; set; }

  }
}