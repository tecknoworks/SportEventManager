using DataAccessLayer.Helpers;

namespace DataAccessLayer.Models
{
    public class Participant
    {
        public Guid Id { get; set; }
        public Guid EventId { get; set; }
        public string UserId { get; set; }
        public ParticipantStatus Status { get; set; }
        public Guid? EventPositionId { get; set; }
        public EventPlannerUser User { get; set; }
        public Event Event { get; set; }
        public EventPosition? EventPosition { get; set; }
    }
}
