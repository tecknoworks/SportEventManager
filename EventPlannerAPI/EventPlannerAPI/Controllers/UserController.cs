﻿using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace EventPlannerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAuthService _authService;

        public UserController(IUserService _userService, IAuthService _authService)
        {
            this._userService = _userService;
            this._authService = _authService;
        }

		[ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] UserDto newUser)
        {
            var result = await _userService.CreateUserAsyncLogic(newUser);
            if (!result.Succeeded) return BadRequest(result.Errors);
            return Ok("User created!");  
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost("Login")]
        public async Task<IActionResult> LoginAsync([FromBody] LogInUserDto logInUserDto)
        {
 
            var resposnse = await _userService.LogInAsync(logInUserDto);
            if (!resposnse)
            {
                return BadRequest("Invalid credentials.");
            }
            var tokenString =await _authService.GenerateTokenString(logInUserDto);
            return Ok(tokenString);

        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            var errorMessage = await _userService.SendPasswordResetLinkAsync(forgotPasswordDto);
            if (!errorMessage.IsNullOrEmpty()) return BadRequest(errorMessage);
            return Ok("If there's an account associated with this email address, we've sent instructions for resetting the password.");
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost("SetNewPassword")]
        public async Task<IActionResult> SetNewPassword([FromBody] SetNewPasswordDto setNewPasswordDto)
        {
            var result = await _userService.SetNewPasswordAsync(setNewPasswordDto);
            if (!result.Succeeded) return BadRequest(result.Errors);
            return Ok("Password reset successfully.");   
        }
    }
}
