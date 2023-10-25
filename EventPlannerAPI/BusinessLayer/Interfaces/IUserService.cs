using BusinessLayer.DTOs;
using Microsoft.AspNetCore.Identity;

namespace BusinessLayer.Interfaces
{
    public interface IUserService
    {
        Task<string> SendPasswordResetLinkAsync(ForgotPasswordDto forgotPasswordDto);
        Task<IdentityResult> SetNewPasswordAsync(SetNewPasswordDto setNewPasswordDto);
    }
}
