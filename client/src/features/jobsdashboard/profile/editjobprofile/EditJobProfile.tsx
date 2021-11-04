import { Button, MenuItem, Select } from "@mui/material";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import FormikField from "../../../../components/customformik/FormikField";
import FormikSelect from "../../../../components/customformik/FormikSelect";
import Loading from "../../../../components/Loading";
import { useStore } from "../../../../stores/store";
import ListLinks from "../../jobprofile/listoflinks/ListLinks";
import classes from "./EditJobProfile.module.css";

const EditJobProfile = () => {
  const { profileStore } = useStore();

  useEffect(() => {
    profileStore.loadProfiles();
  }, [profileStore]);

  const handleOnchange = (e: any) => {
    profileStore.setSelectProfile(e.target.value);
  };

  if (profileStore.isLoading) return <Loading />;

  return (
    <>
      {profileStore.jobProfiles.length > 0 && (
        <div>
          <div className={classes.inputStyle}>
            <Select
              value={profileStore.selectedProfile.id}
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
        </div>
      )}
      <Formik
        initialValues={profileStore.selectedProfile}
        enableReinitialize
        onSubmit={(values) => {}}
      >
        {({ handleSubmit, values, handleReset }) => (
          <Form onSubmit={handleSubmit}>
            <FormikSelect name="nicheId">
              {[1, 2].map((jp, index) => (
                <option key={index}>{jp}</option>
              ))}
            </FormikSelect>

            <FormikField
              placeholder={values.photos}
              name="photos"
              type="field"
            />

            <div>
              {values.jobLinks.map((l, index) => {
                return (
                  <ListLinks
                    key={index}
                    text={l.url}
                    handleDelete={() => {
                      profileStore.setUpdatedLinks(
                        profileStore.selectedProfile.jobLinks.filter(
                          (link) => link.id !== l.id
                        )
                      );
                      handleReset();
                    }}
                  />
                );
              })}
            </div>

            <FormikField
              placeholder="Description"
              name="description"
              type="field"
            />
            <Button variant="contained" size="medium" type="submit" fullWidth>
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default observer(EditJobProfile);
