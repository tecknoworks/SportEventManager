using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;


namespace DataAccessLayer.Services
{
    public class UserService: IUserService
    {
        private readonly UserManager<EventPlannerUser> _userManager;
        private readonly SignInManager<EventPlannerUser> _signInManager;
        public UserService(UserManager<EventPlannerUser> userManager, SignInManager<EventPlannerUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }


        public async Task<bool> LogIn(string userIdentifier, string password)
        {
            var userByEmail =await _userManager.FindByEmailAsync(userIdentifier);
            var userByUsername= await _userManager.FindByNameAsync(userIdentifier);
            if (userByEmail == null && userByUsername==null) {
                return false;
            }
            var goodUser = userByEmail == null ? userByUsername : userByEmail;
            return await _userManager.CheckPasswordAsync(goodUser, password);

        }


    }
}
