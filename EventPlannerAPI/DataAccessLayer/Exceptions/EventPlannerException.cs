namespace DataAccessLayer.Exceptions
{
    public class EventPlannerException : Exception
    {
        public EventPlannerException() { }
        public EventPlannerException(string message) : base(message) { }
    }
}
