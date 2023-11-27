using DataAccessLayer.Models;
using System.ComponentModel.DataAnnotations;

namespace BusinessLayer.DTOs
{
    public class UpdateEventDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
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
        [Required]
        public int SkillLevel { get; set; }
        [Required]
        public bool IsClosed { get; set; }
        public ICollection<UpsertEventPositionDto> EventPositions { get; set; }
    }
}
