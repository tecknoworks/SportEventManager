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
        Task<string> GenerateConfirmEmailTokenAsync(EventPlannerUser user);
        Task<EventPlannerUser> GetUserByIdAsync(string userId);
        Task<IdentityResult> EditUserAsync(EventPlannerUser user);
        Task<IdentityResult> DeleteUserAsync(EventPlannerUser user);
        Task<EventPlannerUser> FindByEmailAsync(string email);
        Task<string> GeneratePasswordResetTokenAsync(EventPlannerUser user);
    }
}
