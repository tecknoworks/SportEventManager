using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Comment
    {
        public Guid Id { get; set; }
        public Guid ReviewId { get; set; }
        public string Message { get; set; }
        public Review Review { get; set; }
    }
}
