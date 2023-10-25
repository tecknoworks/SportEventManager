using AutoMapper;
using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BusinessLayer.Services
{
    public class UserService:IUserService
    {
        private IUserRepository _userService;
        private IMapper _mapper;
        private IConfiguration _config;

        public UserService(IUserRepository _userService, IMapper _mapper, IConfiguration _config)
        {
            this._userService = _userService;
            this._mapper = _mapper;
        }


        public async Task<bool> LogIn(LogInUserDto userDto)
        {
            try
            {
                return await _userService.LogIn(userDto.UserIdentifier, userDto.Password);
            }catch (Exception)
            {
                throw;
            }
           
        }

        public string GenerateTokenString(LogInUserDto logInUserDto)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, logInUserDto.UserIdentifier),
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Jwt:Key").Value));

            var signingCred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature);

            var securityToken = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                issuer: _config.GetSection("Jwt:Issuer").Value,
                audience: _config.GetSection("Jwt:Audience").Value,
                signingCredentials: signingCred);

            string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
            return tokenString;
        }







    }
}
