import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Job } from "../../../models/Job";
import { useStore } from "../../../stores/store";
import classes from "./JobCreator.module.css";

const JobCreator = () => {
  const { jobStore, profileStore } = useStore();
  const initalValue: Job = {
    id: "",
    title: "",
    jobProfile: null,
    jobProfileId: "",
    introduction: "",
    isShared: false,
    isActive:true
  };

  useEffect(() => {
    if (profileStore.jobProfiles.length <= 0) {
      profileStore.loadProfiles();
    }
  }, [profileStore]);

  const formik = useFormik({
    initialValues: initalValue,
    onSubmit: (value) => {
      jobStore.createJob(value);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        height: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className={classes.inputStyle}>
        <TextField
          label="Title"
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          fullWidth
        />
      </div>
      <div className={classes.inputStyle}>
        <Select
          labelId="demo-simple-select-label"
          name="jobProfileId"
          id="jobProfileId"
          value={formik.values.jobProfileId}
          label="Niche"
          fullWidth
          onChange={formik.handleChange}
        >
          {profileStore.jobProfiles.length > 0 &&
            profileStore.jobProfiles.map((jp) => {
              return (
                <MenuItem key={jp.id} value={jp.id}>
                  {jp.nicheId}
                </MenuItem>
              );
            })}
        </Select>
      </div>

      <div className={classes.inputStyle}>
        <TextField
          label="Introduction"
          id="introduction"
          name="introduction"
          value={formik.values.introduction}
          onChange={formik.handleChange}
          fullWidth
          multiline
          rows={4}
        />
      </div>

      <FormControlLabel
        sx={{ display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"20px"}}
        control={
          <Checkbox
            value={formik.values.isShared}
            name="isShared"
            id="isShared"
            defaultChecked
            onChange={formik.handleChange}
          />
        }
        label=" Your proffesional profile and contacts are allowed to share."
      />
      <Button variant="contained" type="submit">Create</Button>
    </form>
  );
};

export default observer(JobCreator);
