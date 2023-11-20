namespace DataAccessLayer.Models
{
    public class Review
    {
        public Guid Id { get; set; }
        public string AuthorUserId { get; set; }
        public string UserId {  get; set; }
        public double Rating { get; set; }
        public Comment Comment { get; set; }
        public EventPlannerUser Author { get; set; }
        public EventPlannerUser User { get; set; }
    }
}
