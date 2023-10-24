using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Contexts
{
    public class EventPlannerContext : IdentityDbContext<EventPlannerUser>
    {
        public EventPlannerContext(DbContextOptions<EventPlannerContext> options)
          : base(options) { }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

      
    }   

}
