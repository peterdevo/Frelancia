using System;

namespace Application.Market
{
    public class JobDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }  
        public string Introduction { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}