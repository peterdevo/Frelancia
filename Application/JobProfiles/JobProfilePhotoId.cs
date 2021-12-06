
using System.Collections.Generic;
using Domain;

namespace Application.JobProfiles
{
    public class JobProfilePhotoId
    {
        public JobProfile JobProfile { get; set; }
        public ICollection<string> DeletePhotoIds { get; set; }
        
        
    }
}