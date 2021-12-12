

namespace Domain
{
  public class UserPhoto
  {
    public int Id { get; set; }
    public string PublicId { get; set; }
    public string Url { get; set; }
    public User User { get; set; }
    public string UserId { get; set; }
  }
}