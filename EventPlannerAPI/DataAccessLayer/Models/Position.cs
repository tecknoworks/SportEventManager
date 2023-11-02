namespace DataAccessLayer.Models
{
    public class Position
    {
        public Guid Id { get; set; }
        public Guid SportTypeId { get; set; }
        public string Name { get; set; }
        public SportType SportType { get; set;}
    }
}
