namespace DataAccessLayer.Models
{
    public class EventPosition
    {
        public Guid Id { get; set; }
        public Guid EventId { get; set; }
        public Guid PositionId { get; set; }
        public int AvailablePositions { get; set; }
        public Position Position { get; set; }
        public Event Event { get; set; }
    }
}
