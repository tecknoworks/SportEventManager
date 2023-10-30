using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public interface IAdminRepository
    {
        Task<List<EventPlannerUser>> GetUsersAsync();
        Task<IdentityResult> AddUserAsync(EventPlannerUser user, string password, string role);
    }
}
