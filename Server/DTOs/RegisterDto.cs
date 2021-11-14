using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
  public class RegisterDto
  {
    [Required]
    public string DisplayName { get; set; }
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    [StringLength(8, MinimumLength = 4)]
    public string Password { get; set; }
    [Required]
    public string Username { get; set; }
  }
}