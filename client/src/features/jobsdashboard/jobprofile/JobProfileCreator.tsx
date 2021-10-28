import { Button, MenuItem, Select, TextField } from "@mui/material";
import classes from "./JobProfileCreator.module.css";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import { useState } from "react";
import { JobLink } from "../../../models/JobLink";
import { JobProfile } from "../../../models/JobProfile";
import { useStore } from "../../../stores/store";
import ListLinks from "./listoflinks/ListLinks";
import { observer } from "mobx-react-lite";
import Loading from "../../../components/Loading";

const JobProfileCreator = () => {
  const [addedLinks, setAddedLinks] = useState("");
  const [links, setLinks] = useState<JobLink[]>([]);
  const initalValue: JobProfile = {
    id: "",
    nicheId: 1,
    jobLinks: [],
    photos: "",
    description: "",
    createAt: new Date(Date.now()),
  };

  const { profileStore } = useStore();

  const formik = useFormik({
    initialValues: initalValue,
    onSubmit: (values) => {
      values.jobLinks = links;
      profileStore.createJobProfile(values);
      console.log(values);
    },
  });

  if (profileStore.isLoading) return <Loading />;
  return (
    <>
      <form
        style={{
          height: "100%",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={formik.handleSubmit}
      >
        <Select
          className={classes.inputStyle}
          labelId="demo-simple-select-label"
          name="nicheId"
          id="nicheId"
          value={formik.values.nicheId}
          label="Niche"
          onChange={formik.handleChange}
        >
          <MenuItem value={1}>Frontend</MenuItem>
          <MenuItem value={2}>Backend</MenuItem>
        </Select>

        <div
          className={classes.inputStyle}
          style={{ display: "flex", alignItems: "center" }}
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Links"
            fullWidth
            value={addedLinks}
            onChange={(e) => setAddedLinks(e.target.value)}
          />

          <AddIcon
            style={{ cursor: "pointer" }}
            onClick={() => setLinks([...links, { url: addedLinks }])}
          />
        </div>
        <div>
          {links.length > 0 && (
            <div className={classes.links}>
              {links.map((l, index) => {
                return (
                  <ListLinks
                    key={index}
                    text={l.url}
                    handleDelete={() =>
                      setLinks(links.filter((l, i) => i !== index))
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className={classes.inputStyle}>
          <TextField
            label="Photos"
            id="photos"
            name="photos"
            value={formik.values.photos}
            onChange={formik.handleChange}
            fullWidth
          />
        </div>
        <div className={classes.inputStyle}>
          <TextField
            label="Description"
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            fullWidth
            multiline
            rows={4}
          />
        </div>
        <Button variant="contained" size="medium" type="submit">
          Create
        </Button>
      </form>
    </>
  );
};

export default observer(JobProfileCreator);
