namespace DataAccessLayer.Models
{
    public class Message
    {
        public Guid Id { get; set; }
        public string MessageText { get; set; }
        public string UserId { get; set; }
        public DateTime Date {  get; set; }
        public EventPlannerUser User { get; set; }
        public ChatMessage ChatMessage { get; set; }
    }
}
