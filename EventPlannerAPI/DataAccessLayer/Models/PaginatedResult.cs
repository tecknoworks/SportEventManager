using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class PaginatedResult<T>
    {
        public int TotalEvents { get; set; }
        public IList<T> Events { get; set; }
    }

}
