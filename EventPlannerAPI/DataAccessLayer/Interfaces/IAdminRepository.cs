using DataAccessLayer.Helpers;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;

namespace DataAccessLayer.Interfaces
{
    public interface IAdminRepository
    {
        Task<List<EventPlannerUser>> GetUsersAsync();
        Task<IdentityResult> AddUserAsync(EventPlannerUser user, string password, RoleType role);
        Task<string> GenerateConfirmEmailTokenAsync(EventPlannerUser user);
        Task<EventPlannerUser> GetUserByIdAsync(string userId);
        Task<IdentityResult> EditUserAsync(EventPlannerUser user);
        Task<IdentityResult> DeleteUserAsync(EventPlannerUser user);
        Task<EventPlannerUser> FindByEmailAsync(string email);
        Task<string> GeneratePasswordResetTokenAsync(EventPlannerUser user);
        Task<bool> UserHasProfileAsync(string userId);
        Task<UserProfileDetails> CreateUserProfileDetailsAsync(string userId, UserProfileDetails userDetails);
        Task<IdentityResult> SetUserBlockStatusAsync(string userId, bool isBlocked);

    }
}
