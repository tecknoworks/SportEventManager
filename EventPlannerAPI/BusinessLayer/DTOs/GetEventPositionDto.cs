namespace BusinessLayer.DTOs
{
    public class GetEventPositionDto
    {
        public Guid EventId { get; set; }
        public Guid PositionId { get; set; }
        public string PositionName { get; set; }
        public int AvailablePositions { get; set; }
    }
}
