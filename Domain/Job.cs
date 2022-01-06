using System;
using System.Text.Json.Serialization;

namespace Domain
{
    public class Job
    {
        public Guid Id { get; set; }
        public string Title { get; set; }  

         [JsonIgnore]     
        public JobProfile JobProfile { get; set; }
        public Guid JobProfileId { get; set; }
        public User User { get; set; }
        public string UserId { get; set; }
        public string Introduction { get; set; }
        public bool IsShared { get; set; }=false;
        public bool IsActive { get; set; }=true;
        public DateTime CreatedAt { get; set; }
        
    }
}