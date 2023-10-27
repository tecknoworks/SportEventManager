namespace BusinessLayer.DTOs
{
    public class UpsertUserProfileDetailsDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Country { get; set; }
        public string? County { get; set; }
        public string? City { get; set; }
        public string? ProfilePhoto { get; set; }
    }
}
