using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.DTOs
{
    public class UserDetailsDto
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        [MinLength(10, ErrorMessage = "Phone number must be at least 10 digits long.")]
        public string PhoneNumber { get; set; }
        public bool IsBlocked { get; set; }
    }
}
