namespace DataAccessLayer.Models
{
    public class Event
    {
        public Guid Id { get; set; }
        public string Name { get; set; }    
        public string Description { get; set; }
        public Guid SportTypeId { get; set; }
        public string Location { get; set; }
        public string LocationName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int MaximumParticipants { get; set; }
        public int SkillLevel { get; set; }
        public bool IsClosed { get; set; }
        public string AuthorUserId { get; set; }
        public EventPlannerUser Author {  get; set; }
        public SportType SportType { get; set; }
        public ICollection<EventPosition> EventPositions { get; set; }
        public ICollection<Participant> Participants { get; set; }
        public ChatEvent ChatEvent { get; set; }
    }
}
