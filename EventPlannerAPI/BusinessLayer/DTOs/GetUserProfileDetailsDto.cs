using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.DTOs
{
    public class GetUserProfileDetailsDto
    {
        public string? UserName { get; set; }
        [MinLength(10, ErrorMessage = "Phone number must be at least 10 digits long.")]
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Country { get; set; }
        public string? County { get; set; }
        public string? City { get; set; }
        public string? ProfilePhoto { get; set; }
    }
}
