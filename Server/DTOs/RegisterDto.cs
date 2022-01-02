using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
  public class RegisterDto
  {
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    [RegularExpression("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$",
     ErrorMessage ="Password must have at least 0-8 characters,one digit,one lowercase character,one uppercase character")]
    public string Password { get; set; }
    [Required]
    public string Username { get; set; }
  }
}