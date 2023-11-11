namespace BusinessLayer.DTOs
{
    public class ChatDetailsDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public int ParticipantsCount { get; set; }
    }
}
