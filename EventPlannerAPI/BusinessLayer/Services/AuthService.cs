using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using DataAccessLayer.Helpers;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Services
{
    public class AuthService: IAuthService
    {
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration _configuration)
        {
            this._configuration = _configuration;

        }

        public async Task<string> GenerateTokenString(EventPlannerUser user, IList<string> roles)
        {

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(SolutionConfigurationConstants.JwtIdClaim, user.Id)
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("Jwt:Key").Value));

            var signingCred = new SigningCredentials(securityKey, SolutionConfigurationConstants.JwtAlgorithm);

            var securityToken = new JwtSecurityToken(
            claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                issuer: _configuration.GetSection("Jwt:Issuer").Value,
                audience: _configuration.GetSection("Jwt:Audience").Value,
                signingCredentials: signingCred);

            string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
            return await Task.FromResult<string>(tokenString);
        }
    }
}
