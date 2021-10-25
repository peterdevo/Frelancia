import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Loading from "../../../../components/Loading";
import { useStore } from "../../../../stores/store";
// import { toJS } from "mobx";
import ListLinks from "../../jobprofile/listoflinks/ListLinks";
import classes from "./EditJobProfile.module.css";

const EditJobProfile = () => {
  const { profileStore } = useStore();

  useEffect(() => {
    if (profileStore.jobProfiles.length <= 0) {
      profileStore.loadProfiles();
    }
  }, [profileStore]);

  const formik = useFormik({
    initialValues: profileStore.selectedProfile,
    enableReinitialize: true,
    onSubmit: (values) => {
      // console.log(toJS(values));
    },
  });

  const handleOnchange = (e: any) => {
    profileStore.setSelectProfile(e.target.value);
  };

  if (profileStore.isLoading) return <Loading />;
  return (
    <>
      {profileStore.jobProfiles.length > 0 && (
        <div
          style={{
            height: "100%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className={classes.inputStyle}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value=""
              label="Profile"
              onChange={handleOnchange}
              fullWidth
            >
              {profileStore.jobProfiles.map((profile) => (
                <MenuItem key={profile.id} value={profile.id}>
                  {profile.description}
                </MenuItem>
              ))}
            </Select>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className={classes.inputStyle}>
              <Select
                labelId="demo-simple-select-label"
                name="nicheId"
                id="nicheId"
                value={formik.values.nicheId}
                label="Niche"
                onChange={formik.handleChange}
                fullWidth
              >
                <MenuItem value={1}>Frontend</MenuItem>
                <MenuItem value={2}>Backend</MenuItem>
              </Select>
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

            <div>
              {formik.values.jobLinks.map((l, index) => {
                return <ListLinks key={index} text={l.url} />;
              })}
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
            <Button variant="contained" size="medium" type="submit" fullWidth>
              Update
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default observer(EditJobProfile);
