using DataAccessLayer.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.DTOs
{
    public class RegisterWithRoleDto
    {
        public RegisterUserDto NewUser { get; set; }
        public RoleType Role { get; set; }
    }
}
