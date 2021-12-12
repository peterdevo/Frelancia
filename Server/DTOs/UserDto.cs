using Domain;

namespace Server.DTOs
{
  public class UserDto
  {
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Token { get; set; }
    public string UserName { get; set; }
    public string UserPhoto { get; set; }
  }
}