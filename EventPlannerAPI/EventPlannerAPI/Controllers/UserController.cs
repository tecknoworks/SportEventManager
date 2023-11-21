using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using BusinessLayer.Services;
using DataAccessLayer.Exceptions;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
        public async Task<IActionResult> CreateUser([FromBody] RegisterUserDto newUser)
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
            try
            {
                var resposnse = await _userService.LogInAsync(logInUserDto);
                if (!resposnse)
                {
                    return BadRequest("Invalid credentials.");
                }
                var user = await _userService.GetUserByIdentifier(logInUserDto.UserIdentifier);
                var roles = await _userService.GetRolesAsync(user);

                var tokenString = await _authService.GenerateTokenString(user, roles);
                return Ok(tokenString);
            }
            catch (EventPlannerException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail([FromQuery]ConfirmEmailDto confirmEmailDto)
        {
            var errorMessage = await _userService.ConfirmEmailAsyncLogic(confirmEmailDto);
            if (!errorMessage.Succeeded) return BadRequest(errorMessage);
            return Ok("If there's an account associated with this email address, we've sent you an email to activate your account.");
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

        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpGet("GetUserProfileDetails/{userId}")]
        public async Task<ActionResult<GetUserProfileDetailsDto>> GetUserProfileDetails(string userId)
        {
            try
            {
                return Ok(await _userService.GetUserProfileDetailsAsync(userId));
            }
            catch (EventPlannerException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception) 
            {
                return Problem("Something went wrong.");
            }
        }

        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPut("UpdateUserProfileDetails/{userId}")]
        public async Task<ActionResult<GetUserProfileDetailsDto>> UpdateUserProfileDetails(string userId, UpsertUserProfileDetailsDto userDetails)
        {
            try
            {
                return Ok(await _userService.UpdateUserProfileDetailsAsync(userId, userDetails));
            }
            catch (EventPlannerException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return Problem("Something went wrong.");
            }
        }

        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpGet("GetEventsByUserId/{userId}")]
        public async Task<ActionResult<List<Event>>> GetEventsByUserId(string userId)
        {
            try
            {
                return Ok(await _userService.GetJoinedEventsAsync(userId));
            }
            catch (EventPlannerException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return Problem("An error occurred while retrieving events.");
            }
        }

        [HttpGet("GetAverageRating/{userId}")]
        public async Task<ActionResult<double>> GetAverageRatingForUser(string userId)
        {
            try
            {
                double averageRating = await _userService.GetAverageRatingForUserAsync(userId);
                return Ok(averageRating);
            }
            catch (EventPlannerException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return Problem("Something went wrong.");
            }
        }
    }
}
