namespace BusinessLayer.DTOs
{
    public class SendNotificationDto
    {
        public string UserId { get; set; }
        public Guid EventId { get; set; }
        public string Message { get; set; }
    }
}
