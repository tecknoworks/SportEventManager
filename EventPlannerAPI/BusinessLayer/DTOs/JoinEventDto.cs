using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.DTOs
{
    public class JoinEventDto
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public Guid EventId { get; set; }
       
        public Guid? EventPositionId { get; set; }
    }
}
