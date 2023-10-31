using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using DataAccessLayer.Exceptions;
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
            try
            {
                return Ok(await _userService.CreateUserAsyncLogic(newUser));
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

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail([FromQuery]ConfirmEmailDto confirmEmailDto)
        {
            try
            {
                return Ok(await _userService.ConfirmEmailAsyncLogic(confirmEmailDto));
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

        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            try
            {
                return Ok(await _userService.SendPasswordResetLinkAsync(forgotPasswordDto));
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

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost("SetNewPassword")]
        public async Task<IActionResult> SetNewPassword([FromBody] SetNewPasswordDto setNewPasswordDto)
        {
            try
            {
                return Ok(await _userService.SetNewPasswordAsync(setNewPasswordDto));
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

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost("CreateUserProfileDetails/{userId}")]
        public async Task<ActionResult<GetUserProfileDetailsDto>> CreateUserProfileDetails(string userId, UpsertUserProfileDetailsDto userDetails)
        {
            try
            {
                return Ok(await _userService.CreateUserProfileDetailsAsync(userId, userDetails));
            }
            catch(EventPlannerException ex)
            {
                return BadRequest(ex.Message);
            }
            catch(Exception)
            {
                return Problem("Something went wrong.");
            }
        }

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

    }
}
