using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventPlannerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private IUserService _userService;

        public UserController(IUserService userService)
        {
            this._userService = userService;
        }

        [HttpPost("/login")]
        public async Task<IActionResult> Login([FromBody]LogInUserDto logInUserDto)
        {
            if(!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return BadRequest(errors);
            }
            if (await _userService.LogIn(logInUserDto))
            {
                var tokenString = _userService.GenerateTokenString(logInUserDto);
                return Ok(tokenString);
            }
            return BadRequest("bad request");

        }








        [HttpPost("/createUser")]
        public IActionResult CreateUser([FromBody] EventPlannerUser user)
        {
            try
            {
                return Ok("Create user works!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("/updateUser/{id}")]
        public IActionResult UpdateUser(int id, [FromBody] EventPlannerUser user)
        {
            try
            {
                return Ok("Update user works!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("/deleteUser/{id}")]
        public IActionResult DeleteUsers(int id)
        {
            try
            {
                return Ok("Delete user works!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
