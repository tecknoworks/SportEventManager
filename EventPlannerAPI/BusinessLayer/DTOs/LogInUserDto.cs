using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.DTOs
{
    public class LogInUserDto
    {
        [Required]
        public string UserIdentifier { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
