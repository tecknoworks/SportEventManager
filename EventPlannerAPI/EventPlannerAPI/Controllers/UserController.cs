using BusinessLayer.DTOs;
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

        public UserController(IUserService userLogicService)
        {
            _userService = userLogicService;
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
