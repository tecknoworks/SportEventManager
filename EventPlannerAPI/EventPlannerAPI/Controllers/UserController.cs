﻿using BusinessLayer.Interfaces;
using BusinessLayer.DTOs;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventPlannerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserLogicServices _userLogicServices;
        public UserController(IUserLogicServices userLogicServices) 
        {
            _userLogicServices = userLogicServices;
        }

        [HttpGet("/getUsers")] 
        public IActionResult GetUsers()
        {
            try
            {
                return Ok("Get users works!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost("/createUser")]
        public async Task<IActionResult> CreateUser([FromBody] UserDto newUser)
        {
            try
            {
                await _userLogicServices.CreateUserAsyncLogic(newUser);
                return Ok();
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
