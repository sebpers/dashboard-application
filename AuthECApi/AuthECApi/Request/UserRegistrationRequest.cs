using System.ComponentModel.DataAnnotations;

namespace AuthECApi.Request
{
    public class UserRegistrationRequest
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }

        public string Role { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; } // Date of birth
        public int? LibraryId { get; set; }
    }
}
