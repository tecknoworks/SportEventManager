using Microsoft.AspNetCore.Identity;

namespace DataAccessLayer.Models
{
    public class EventPlannerUser : IdentityUser
    {
        public UserProfileDetails Profile { get; set; }
    }
}