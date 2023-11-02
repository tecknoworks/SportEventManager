using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.DTOs
{
    public class EditedUserWithIdDto
    {
       public EditedUserDetails NewUserEdited { get; set; }
        public string UserId { get; set; }
    }
}
