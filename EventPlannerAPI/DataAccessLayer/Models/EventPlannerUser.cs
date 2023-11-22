using Microsoft.AspNetCore.Identity;

namespace DataAccessLayer.Models
{
    public class EventPlannerUser : IdentityUser
    {
        public UserProfileDetails Profile { get; set; }
        public ICollection<Event> Events { get; set; }
        public ICollection<Participant> Participants { get; set; }
        public ICollection<Review> GivenReviews { get; set; }
        public ICollection<Review> RecievedReviews { get; set; }
        public bool IsBlocked { get; set; }
    }
}