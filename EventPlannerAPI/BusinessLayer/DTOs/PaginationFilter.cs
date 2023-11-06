using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.DTOs
{
    public class PaginationFilter
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SearchData { get; set; }

        public PaginationFilter()
        {
            this.PageNumber = 1;
            this.PageSize = 5;
            this.SearchData = string.Empty;
        }
        public PaginationFilter(int pageNumber, int pageSize, string searchData)
        {
            this.PageNumber = pageNumber;
            this.PageSize = pageSize;
            this.SearchData = searchData;
        }
    }
}
