import { Button, InputLabel, TextField, Typography } from "@mui/material";
import classes from "./JobProfileCreator.module.css";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form, FieldArray } from "formik";
import { useEffect, useState } from "react";
import { JobProfile } from "../../../models/JobProfile";
import { useStore } from "../../../stores/store";
import ListLinks from "./listoflinks/ListLinks";
import { observer } from "mobx-react-lite";
import Loading from "../../../components/Loading";
import FormikField from "../../../components/customformik/FormikField";
import FormikSelect from "../../../components/customformik/FormikSelect";
import PhotoUploader from "../../../components/photocomponents/PhotoUploader";
import * as Yup from "yup";

const JobProfileCreator = () => {
  const [addedLinks, setAddedLinks] = useState("");
  const { profileStore } = useStore();
  const [file, setFile] = useState<any>([]);
  const initalValue: JobProfile = {
    id: "",
    nicheId: profileStore.listOfNiches[0]?.id,
    profileName: "",
    userId: "",
    jobLinks: [],
    photos: [],
    description: "",
    createAt: new Date(Date.now()),
  };

  useEffect(() => {
    profileStore.getNiche();
  }, [profileStore]);

  const validationSchema = Yup.object().shape({
    profileName: Yup.string().required(),
    description: Yup.string().required(),
    jobLinks: Yup.array().min(1, "must have link").required(),
  });

  if (profileStore.isLoading) return <Loading />;
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initalValue}
      onSubmit={(values) => {
        console.log(file);
        profileStore.createJobProfile(values, file);
        // console.log(values);
      }}
    >
      {({ handleSubmit, errors, values }) => (
        <Form
          onSubmit={handleSubmit}
          style={{ padding: "20px", height: "100%" }}
        >
          {profileStore.listOfNiches.length > 0 && (
            <div>
              <Typography
                variant="h4"
                component="div"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                Create profile
              </Typography>
              <InputLabel sx={{ margin: "6px" }} htmlFor="my-input">
                Niche:
              </InputLabel>

              <FormikSelect name="nicheId">
                {profileStore.listOfNiches.map((jp, index) => (
                  <option value={jp.id} key={index}>
                    {jp.title}
                  </option>
                ))}
              </FormikSelect>

              <InputLabel sx={{ margin: "6px" }} htmlFor="my-input">
                Name of profile:
              </InputLabel>
              <FormikField
                placeholder="Name"
                name="profileName"
                type="field"
                helperText={errors.profileName}
                error={errors.profileName ? true : false}
              />
              <InputLabel sx={{ margin: "6px" }} htmlFor="my-input">
                Links:
              </InputLabel>
              <FieldArray
                name="jobLinks"
                render={({ push }) => (
                  <div
                    className={classes.inputStyle}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextField
                      style={{ width: "96%" }}
                      label="Links"
                      fullWidth
                      value={addedLinks}
                      onChange={(e) => setAddedLinks(e.target.value)}
                      error={
                        errors.jobLinks && values.jobLinks.length < 1
                          ? true
                          : false
                      }
                      helperText={values.jobLinks.length < 1 && errors.jobLinks}
                    />
                    <AddIcon
                      className={classes.icon}
                      fontSize="medium"
                      color="primary"
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                      onClick={() => push({ id: "", url: addedLinks })}
                    />
                  </div>
                )}
              />

              <FieldArray
                name="jobLinks"
                render={(arrayHelper) => (
                  <div>
                    {values.jobLinks.length > 0 && (
                      <div className={classes.links}>
                        {values.jobLinks.map((l, index) => {
                          return (
                            <ListLinks
                              key={index}
                              text={l.url}
                              handleDelete={() => arrayHelper.remove(index)}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              />

              <PhotoUploader
                usePhotoList={true}
                removeAll={false}
                buttonName="Upload image"
                getArrayImgs={(image) => {
                  image?.forEach((element) => {
                    setFile([...file, element?.file]);
                  });
                }}
              />

              <InputLabel sx={{ margin: "6px" }} htmlFor="my-input">
                Description:
              </InputLabel>

              <FormikField
                placeholder="Description"
                name="description"
                type="field"
                helperText={errors.description}
                error={errors.description ? true : false}
              />

              <Button variant="contained" size="medium" type="submit" fullWidth>
                Create
              </Button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default observer(JobProfileCreator);
