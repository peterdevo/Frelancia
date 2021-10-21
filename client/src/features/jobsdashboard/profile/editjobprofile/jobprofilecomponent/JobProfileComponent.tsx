import { Box } from "@mui/system";
import { JobProfile } from "../../../../../models/JobProfile";

interface IProps {
  jobProfile: JobProfile;
}
const JobProfileComponent = ({ jobProfile }: IProps) => {
  return (
    <Box>
      <h2>{jobProfile.nicheId}</h2>
      <div>
        {jobProfile.jobLinks.map((jl) => {
          return <div key={jl.id}>{jl.url}</div>;
        })}
      </div>
      <div>{jobProfile.photos}</div>
      <div>{jobProfile.description}</div>
    </Box>
  );
};
export default JobProfileComponent;
