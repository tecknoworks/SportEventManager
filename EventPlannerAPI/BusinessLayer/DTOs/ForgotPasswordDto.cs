using System.ComponentModel.DataAnnotations;

namespace BusinessLayer.DTOs
{
    public class ForgotPasswordDto
    {
        [EmailAddress]
        public string Email { get; set; }
    }
}
