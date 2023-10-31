using BusinessLayer.DTOs;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Interfaces
{
    public interface IAdminService
    {
        Task<List<UserDetailsDto>> GetUsersAsyncLogic();
        Task<IdentityResult> AddUserAsyncLogic(UserDto newUser, string role);
        Task<IdentityResult> EditUserAsyncLogic(EdittedUserDetails newUserEdited, string userId);
        Task<IdentityResult> DeleteUserAsyncLogic(string userId);
        Task<string> SendRecoverPasswordEmailAsyncLogic(ForgotPasswordDto forgotPasswordDto);
    }
}
