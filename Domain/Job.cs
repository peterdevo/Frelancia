using System;

namespace Domain
{
    public class Job
    {
        public Guid Id { get; set; }
        public string Title { get; set; }       
        public JobProfile JobProfile { get; set; }
        public Guid JobProfileId { get; set; }
        public User User { get; set; }
        public string UserId { get; set; }
        public string Introduction { get; set; }
        public bool IsShared { get; set; }=false;
        public bool IsActive { get; set; }=true;
        
    }
}