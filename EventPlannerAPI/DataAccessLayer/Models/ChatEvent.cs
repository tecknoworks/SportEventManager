namespace DataAccessLayer.Models
{
    public class ChatEvent
    {
        public Guid Id { get; set; }
        public Guid EventID { get; set; }
        public bool IsClosed { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public Event Event { get; set; }
        public ICollection<ChatMessage> ChatMessages { get; set; }
    }
}
