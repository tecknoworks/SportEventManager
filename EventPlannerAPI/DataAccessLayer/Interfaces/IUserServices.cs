using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public interface IUserServices
    {
        public Task<IdentityResult> CreateUserAsync(EventPlannerUser user, string password);
    }
}
