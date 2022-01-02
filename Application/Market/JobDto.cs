using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Market
{
    public class JobDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }  
        public string Introduction { get; set; }
    }
}