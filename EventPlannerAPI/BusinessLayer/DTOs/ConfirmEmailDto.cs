using System.ComponentModel.DataAnnotations;

namespace BusinessLayer.DTOs
{
    public class ConfirmEmailDto
    {

        [EmailAddress]
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
