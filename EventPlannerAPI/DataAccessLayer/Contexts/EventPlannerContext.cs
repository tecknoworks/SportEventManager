using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Contexts
{
    public class EventPlannerContext : IdentityDbContext<EventPlannerUser>
    {
        public EventPlannerContext(DbContextOptions<EventPlannerContext> options)
          : base(options) { }

        public DbSet<UserProfileDetails> UserProfileDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserProfileDetails>()
                .HasOne(profile => profile.User)
                .WithOne(user => user.Profile)
                .HasForeignKey<UserProfileDetails>(profile => profile.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }   
}
