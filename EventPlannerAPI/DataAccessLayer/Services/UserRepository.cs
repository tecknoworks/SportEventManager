using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;


namespace DataAccessLayer.Services
{
    public class UserRepository: IUserRepository
    {
        private readonly UserManager<EventPlannerUser> _userManager;
        private readonly SignInManager<EventPlannerUser> _signInManager;
        public UserRepository(UserManager<EventPlannerUser> userManager, SignInManager<EventPlannerUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }


        public async Task<bool> LogIn(string userIdentifier, string password)
        {
            try
            {
                if (string.IsNullOrEmpty(userIdentifier) || string.IsNullOrEmpty(password))
                {
                    throw new ArgumentException("User identifier and password cannot be null or empty.");
                }
                var userByEmail = await _userManager.FindByEmailAsync(userIdentifier);
                var userByUsername = await _userManager.FindByNameAsync(userIdentifier);
                if (userByEmail == null && userByUsername == null)
                {
                    return false;
                }
                var goodUser = userByEmail == null ? userByUsername : userByEmail;
                return await _userManager.CheckPasswordAsync(goodUser, password);
            }catch (Exception)
            {
                throw;
            }
           

        }


    }
}
