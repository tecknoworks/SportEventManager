using BusinessLayer.DTOs;
using Microsoft.AspNetCore.Identity;

namespace BusinessLayer.Interfaces
{
    public interface IUserService
    {
		Task<IdentityResult> CreateUserAsyncLogic(UserDto user);

        Task<IdentityResult> ConfirmEmailAsyncLogic(ConfirmEmailDto confirmEmailDto);
        Task<string> SendPasswordResetLinkAsync(ForgotPasswordDto forgotPasswordDto);
        Task<IdentityResult> SetNewPasswordAsync(SetNewPasswordDto setNewPasswordDto);
        Task<bool> LogInAsync(LogInUserDto eventPlannerUser);
       
    }
}
