import { Button, TextField } from "@mui/material";
import classes from "./JobProfileCreator.module.css";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form, FieldArray, Field } from "formik";
import { useEffect, useState } from "react";
import { JobLink } from "../../../models/JobLink";
import { JobProfile } from "../../../models/JobProfile";
import { useStore } from "../../../stores/store";
import ListLinks from "./listoflinks/ListLinks";
import { observer } from "mobx-react-lite";
import Loading from "../../../components/Loading";
import FormikField from "../../../components/customformik/FormikField";
import FormikSelect from "../../../components/customformik/FormikSelect";
import * as Yup from "yup";

const JobProfileCreator = () => {
  const [addedLinks, setAddedLinks] = useState("");
  const [links, setLinks] = useState<JobLink[]>([]);
  const { profileStore } = useStore();
  const initalValue: JobProfile = {
    id: "",
    nicheId: profileStore.listOfNiches[0]?.id,
    profileName: "",
    userId: "",
    jobLinks: [],
    photos: "",
    description: "",
    createAt: new Date(Date.now()),
  };

  useEffect(() => {
    profileStore.getNiche();
  }, [profileStore]);

  const validationSchema = Yup.object().shape({
    profileName:Yup.string().required(),
    description: Yup.string().required(),
    photos: Yup.string().required(),
    jobLinks: Yup.array().min(1, "must have link").required(),
  });

  if (profileStore.isLoading) return <Loading />;
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initalValue}
      onSubmit={(values) => {
        profileStore.createJobProfile(values);
        console.log(values);
      }}
    >
      {({ handleSubmit, errors, values }) => (
        <Form
          onSubmit={handleSubmit}
          style={{ padding: "20px", height: "100%" }}
        >
          {profileStore.listOfNiches.length > 0 && (
            <FormikSelect name="nicheId">
              {profileStore.listOfNiches.map((jp, index) => (
                <option value={jp.id} key={index}>
                  {jp.title}
                </option>
              ))}
            </FormikSelect>
          )}

          <FormikField
            placeholder="Name"
            name="profileName"
            type="field"
            helperText={errors.profileName}
            error={errors.photos ? true : false}
          />
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
                  error={errors.jobLinks && links.length < 1 ? true : false}
                  helperText={links.length < 1 && errors.jobLinks}
                />
                <AddIcon
                  className={classes.icon}
                  fontSize="medium"
                  color="primary"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                  onClick={() => push({ url: addedLinks })}
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

          <FormikField
            placeholder="Photos"
            name="photos"
            type="field"
            helperText={errors.photos}
            error={errors.photos ? true : false}
          />
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
        </Form>
      )}
    </Formik>
  );
};

export default observer(JobProfileCreator);
