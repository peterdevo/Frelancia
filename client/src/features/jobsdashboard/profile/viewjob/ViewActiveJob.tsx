import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../../stores/store";

const ViewActiveJob = () => {
  const { jobStore } = useStore();

  useEffect(() => {
    jobStore.loadJobs();
  }, [jobStore]);

  const formik = useFormik({
    initialValues: jobStore.selectedJob,
    onSubmit(values) {
      // console.log(toJS(values));
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {jobStore.jobs.map((job) => (
          <Card
            key={job.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "7px",
              position: "relative",
              margin:"20px"
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {job.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.introduction}
                </Typography>
              </CardContent>
            </CardActionArea>
            {job.isActive ? (
              <div
                style={{
                  position: "absolute",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#4E9F3D",
                  top: 5,
                  right: 10,
                }}
              ></div>
            ) : (
              <div
                style={{
                  position: "absolute",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "red",
                  top: 5,
                  right: 10,
                }}
              ></div>
            )}
            <div>
              <Button
                style={{ marginRight: "5px", backgroundColor: "red" }}
                variant="contained"
                size="small"
                type="submit"
                onClick={() => jobStore.setActivate(job)}
              >
                Activate
              </Button>
              <Button
                style={{ marginRight: "5px", backgroundColor: "#E26A2C" }}
                variant="contained"
                size="small"
                type="submit"
                onClick={() => {
                  jobStore.setDeActivate(job);
                }}
              >
                Deactivate
              </Button>
              <Button
                style={{ backgroundColor: "#8E0505" }}
                variant="contained"
                size="small"
                type="submit"
                onClick={() => jobStore.setDeleteJob(job?.id!)}
              >
                Delete job
              </Button>
            </div>
          </Card>
        ))}
      </form>
    </>
  );
};

export default observer(ViewActiveJob);
