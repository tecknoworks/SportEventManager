using DataAccessLayer.Models;
using System.ComponentModel.DataAnnotations;

namespace BusinessLayer.DTOs
{
    public class CreateEventDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public Guid SportTypeId { get; set; }
        [Required]
        public string Location { get; set; }
        [Required]
        public string LocationName { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public int MaximumParticipants { get; set; }
        public bool IsClosed = false;
        [Required]
        public int SkillLevel { get; set; }
        [Required]
        public string AuthorUserId { get; set; }
        public List<UpsertEventPositionDto>? EventPositions { get; set; }
    }
}
