
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Domain
{
    public class Photo
    {
        
        public int Id { get; set; }
        public string PublicId { get; set; }
        public string Url { get; set; }
        public Guid JobProfileId { get; set; }
        [JsonIgnore]
        public JobProfile JobProfile { get; set; }
        
    }
}