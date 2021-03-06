import {
  Button,
  CircularProgress,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import classes from "./JobProfileCreator.module.css";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form, FieldArray, Field } from "formik";
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
import CustomError from "../../../components/CustomError";
import TextAreaComponent from "../../../components/customformik/TextAreaComponent";
import ValidationErrors from "../../../errors/ValidationErrors";
import CustomFilesUploader from "../../../components/CustomFilesUploader";

const JobProfileCreator = () => {
  const [addedLinks, setAddedLinks] = useState("");
  const { profileStore } = useStore();
  const [validationErrors, setValidationErrors] = useState<string[]>();
  const initalValue: JobProfile = {
    id: "",
    nicheId: 1,
    profileName: "",
    userId: "",
    jobLinks: [],
    jobFiles: [],
    photos: [],
    description: "",
    createAt: new Date(Date.now()),
  };
  useEffect(() => {
    profileStore.getNiche();
  }, [profileStore]);

  const validationSchema = Yup.object().shape({
    profileName: Yup.string().required("Must have name"),
    description: Yup.string().required("Must have description"),
  });

  if (profileStore.isLoading) return <Loading />;

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initalValue}
      onSubmit={(values, { resetForm }) => {
        if (values.nicheId === undefined) {
          values.nicheId = profileStore.listOfNiches[0].id;
        }
        profileStore
          .createJobProfile(values, profileStore.imageFiles, profileStore.jobFiles)
          .catch((error) => setValidationErrors(error))
          .finally(() => {
            resetForm();
          });
      }}
    >
      {({ handleSubmit, errors, values, isSubmitting,resetForm }) => (
        <Form
          onSubmit={handleSubmit}
          style={{ padding: "20px", height: "100%" }}
        >
          <Button type="button" onClick={()=>{resetForm()}}>reset form</Button>
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
                <option defaultValue={jp.id} value={jp.id} key={index}>
                  {jp.title}
                </option>
              ))}
            </FormikSelect>

            <InputLabel sx={{ margin: "6px" }} htmlFor="my-input">
              Name of profile:
            </InputLabel>
            <FormikField placeholder="Name" name="profileName" type="field" />
            <CustomError error={errors.profileName} name="profileName" />

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
            <CustomError error={errors.jobLinks?.toString()} name="jobLinks" />

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

            {isSubmitting ? (
              <CircularProgress size={22} />
            ) : (
              <PhotoUploader
                usePhotoList={true}
                removeAll={false}
                buttonName="Upload image"
                getArrayImgs={(images) => {
                  profileStore.setImageFiles(images[images.length - 1]?.file);
                }}
              />
            )}

            <CustomFilesUploader />

            <InputLabel sx={{ margin: "6px" }} htmlFor="my-input">
              Description:
            </InputLabel>

            <Field
              placeholder="Description"
              name="description"
              component={TextAreaComponent}
            />
            <CustomError error={errors.description} name="description" />

            <Button
              disabled={isSubmitting}
              variant="contained"
              size="medium"
              type="submit"
              fullWidth
            >
              {isSubmitting ? (
                <CircularProgress size={22} />
              ) : (
                <Typography> Create</Typography>
              )}
            </Button>

            {validationErrors?.length! > 0 && (
              <ValidationErrors errors={validationErrors} />
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default observer(JobProfileCreator);
