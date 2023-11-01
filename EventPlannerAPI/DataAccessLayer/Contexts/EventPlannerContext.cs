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
        public DbSet<Event> Events { get; set; }
        public DbSet<SportType> SportTypes { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<EventPosition> EventPositions { get; set; }
        public DbSet<ParticipantStatus> ParticipantStatuses { get; set; }
        public DbSet<Participant> Participants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserProfileDetails>()
                .HasOne(profile => profile.User)
                .WithOne(user => user.Profile)
                .HasForeignKey<UserProfileDetails>(profile => profile.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Event>()
                .HasOne(evnt => evnt.Author)
                .WithMany(user => user.Events)
                .HasForeignKey(evnt => evnt.AuthorUserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Event>()
                .HasOne(evnt => evnt.SportType)
                .WithMany(sportType => sportType.Events)
                .HasForeignKey(evnt => evnt.SportTypeId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<SportType>()
                .HasMany(sportType => sportType.Positions)
                .WithOne(position => position.SportType)
                .HasForeignKey(position => position.SportTypeId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<EventPosition>()
                .HasOne(eventPosition => eventPosition.Event)
                .WithMany(evnt => evnt.EventPositions)
                .HasForeignKey(eventPosition => eventPosition.EventId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<EventPosition>()
                .HasOne(eventPosition => eventPosition.Position)
                .WithMany()
                .HasForeignKey(eventPosition => eventPosition.PositionId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Participant>()
                .HasIndex(p => new { p.EventId, p.UserId })
                .IsUnique();

            modelBuilder.Entity<Participant>()
                .HasOne(participant => participant.User)
                .WithMany(user => user.Participants)
                .HasForeignKey(participant => participant.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Participant>()
                .HasOne(participant => participant.Event)
                .WithMany(evnt => evnt.Participants)
                .HasForeignKey(participant => participant.EventId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Participant>()
                .HasOne(participant => participant.Status)
                .WithMany()
                .HasForeignKey(participant => participant.StatusId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Participant>()
                .HasOne(participant => participant.EventPosition)
                .WithMany() 
                .HasForeignKey(participant => participant.EventPositionId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            // Seed SportType data for Football
            var footballId = Guid.NewGuid();  // Generate a unique identifier for Football
            modelBuilder.Entity<SportType>().HasData(new SportType
            {
                Id = footballId,
                Name = "Football"
            });

            // Seed Position data for Football
            modelBuilder.Entity<Position>().HasData(
                new Position { Id = Guid.NewGuid(), Name = "quarterback", SportTypeId = footballId },
                new Position { Id = Guid.NewGuid(), Name = "midfielder", SportTypeId = footballId },
                new Position { Id = Guid.NewGuid(), Name = "attacker", SportTypeId = footballId }
            );
        }
    }   
}
