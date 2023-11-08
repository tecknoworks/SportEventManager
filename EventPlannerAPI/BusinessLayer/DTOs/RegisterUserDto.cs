﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.DTOs
{
    public class RegisterUserDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [MinLength(10, ErrorMessage = "Phone number must be at least 10 digits long.")]
        [RegularExpression(@"^\d+$", ErrorMessage = "Phone number must be only digits.")]
        public string PhoneNumber { get; set; }
        [Required]
        public string Password { get; set; }
        
    }
}
