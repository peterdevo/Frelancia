import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useStore } from "../../../../stores/store";

const ViewActiveJob = () => {
  const { JobStore } = useStore();
  useEffect(() => {
    if (JobStore.jobs.length <= 0) {
      JobStore.loadJobs();
    }
  }, [JobStore]);
  return (
    <>
      {JobStore.jobs.map((job) => (
        <Card key={job.id} sx={{ maxWidth: "100%" }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {job.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {job.introduction}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Active
              </Typography>
            </CardContent>
            <Button style={{marginRight:"5px",backgroundColor:"green"}} variant="contained" size="medium" type="submit">Activate</Button>
            <Button style={{backgroundColor:"red"}} variant="contained" size="medium" type="submit">Deactivate</Button>
          </CardActionArea>
        </Card>
      ))}
    </>
  );
};

export default ViewActiveJob;
