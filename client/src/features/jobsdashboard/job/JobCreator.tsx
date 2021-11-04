import { Button, Checkbox, FormHelperText, Typography } from "@mui/material";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import FormikField from "../../../components/customformik/FormikField";
import FormikSelect from "../../../components/customformik/FormikSelect";
import Loading from "../../../components/Loading";
import { Job } from "../../../models/Job";
import { useStore } from "../../../stores/store";
import * as yup from "yup";

const JobCreator = () => {
  const { jobStore, profileStore } = useStore();
  const initalValue: Job = {
    id: "",
    title: "",
    jobProfile: null,
    jobProfileId: profileStore.jobProfiles[0]?.id,
    introduction: "",
    isShared: false,
    isActive: true,
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required(),
    jobProfileId: yup.number().required(),
    introduction: yup.string().required(),
    isShared: yup.bool().oneOf([true]),
  });

  useEffect(() => {
    profileStore.loadProfiles();
  }, [profileStore]);

  if (jobStore.isLoading) return <Loading />;

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={initalValue}
      onSubmit={(values) => {
        jobStore.createJob(values);
      }}
    >
      {({ handleSubmit, errors }) => (
        <Form
          onSubmit={handleSubmit}
          style={{
            height: "100%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormikField placeholder="Photos" type="text" name="title" />
          <FormikSelect name="jobProfileId">
            {profileStore.jobProfiles.map((jp) => (
              <option key={jp.id} value={jp.id}>
                {jp.nicheId}
              </option>
            ))}
          </FormikSelect>
          <FormikField
            placeholder="Introduction"
            type="text"
            name="introduction"
            error={errors.introduction ? true : false}
            helperText={errors.introduction}
          />
          <div style={{display:"flex",alignItems:"center"}}>
            <Field type="checkbox" name="isShared" component={Checkbox} />
            <Typography>
              Your proffesional profile and contacts are allowed to share.
            </Typography>
          </div>
          <ErrorMessage
            name="isShared"
            render={() => (
              <FormHelperText style={{ color: "red",margin:"10px 10px" }}>
                must have your permission before publising job
              </FormHelperText>
            )}
          />

          <Button variant="contained" type="submit">
            Create
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default observer(JobCreator);
