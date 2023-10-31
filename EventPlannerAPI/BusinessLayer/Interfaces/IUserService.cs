using BusinessLayer.DTOs;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;

namespace BusinessLayer.Interfaces
{
    public interface IUserService
    {
        Task<IdentityResult> CreateUserAsyncLogic(RegisterUserDto user);
        Task<IdentityResult> ConfirmEmailAsyncLogic(ConfirmEmailDto confirmEmailDto);
        Task<string> SendPasswordResetLinkAsync(ForgotPasswordDto forgotPasswordDto);
        Task<IdentityResult> SetNewPasswordAsync(SetNewPasswordDto setNewPasswordDto);
        Task<bool> LogInAsync(LogInUserDto eventPlannerUser);
       
		Task<EventPlannerUser> GetUserByIdentifier(string userIdentifier);
		Task<IList<string>> GetRolesAsync(EventPlannerUser user);
        Task<GetUserProfileDetailsDto> CreateUserProfileDetailsAsync(string userId, UpsertUserProfileDetailsDto userDetails);
        Task<GetUserProfileDetailsDto> UpdateUserProfileDetailsAsync(string userId, UpsertUserProfileDetailsDto newUserDetails);

    }
}
