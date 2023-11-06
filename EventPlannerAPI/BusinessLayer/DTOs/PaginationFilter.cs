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
        public Guid SportTypeId { get; set; }
        public DateTime StartDate { get; set; }
        public double MaximumDuration { get; set; }
        public string Location { get; set; }
        public string AuthorUserId { get; set; }

        public PaginationFilter()
        {
            this.PageNumber = 1;
            this.PageSize = 5;
            this.SearchData = string.Empty;
            this.SportTypeId= Guid.Empty;
            this.StartDate = new DateTime();
            this.MaximumDuration = 0.0;
            this.Location = string.Empty;
            this.AuthorUserId = string.Empty;
        }
        public PaginationFilter(int pageNumber, int pageSize, string searchData, Guid sportTypeId, DateTime startDate, double maximumDuration, string location, string authorUserId)
        {
            this.PageNumber = pageNumber;
            this.PageSize = pageSize;
            this.SearchData = searchData;
            this.SportTypeId = sportTypeId;
            this.StartDate = startDate;
            this.MaximumDuration = maximumDuration;
            this.Location = location;
            this.AuthorUserId = authorUserId;
        }

        public bool IsEmpty()
        {
            throw new NotImplementedException();
        }
    }
}
