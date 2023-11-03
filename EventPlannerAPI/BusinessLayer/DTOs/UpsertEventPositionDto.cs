using System.ComponentModel.DataAnnotations;

namespace BusinessLayer.DTOs
{
    public class UpsertEventPositionDto
    {
        [Required]
        public Guid PositionId { get; set; }
        [Required]
        public int AvailablePositions { get; set; }
    }
}
