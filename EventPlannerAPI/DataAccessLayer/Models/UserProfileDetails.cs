namespace DataAccessLayer.Models
{
    public class UserProfileDetails
    {
        public Guid Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName{ get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Country {  get; set; }    
        public string? County { get; set; }
        public string? City {  get; set; }   
        public string? ProfilePhoto { get; set; }

        public EventPlannerUser? User { get; set; }
        public string UserId { get; set; }
    }
}
