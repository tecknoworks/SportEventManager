namespace DataAccessLayer.Models
{
    public class SportType
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public bool HasPositions { get; set; }
        public ICollection<Event> Events { get; set; }
        public ICollection<Position>? Positions { get; set; }
    }
}
