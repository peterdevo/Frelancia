import {
  Box,
  Button,
  CircularProgress,
  FormLabel,
  Typography,
} from "@mui/material";
import { Field, Formik, Form, FieldProps } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import FormikField from "../../../components/customformik/FormikField";
import Loading from "../../../components/Loading";
import { Job } from "../../../models/Job";
import { useStore } from "../../../stores/store";
import * as yup from "yup";
import CustomError from "../../../components/CustomError";
import TextAreaComponent from "../../../components/customformik/TextAreaComponent";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const JobCreator = () => {
  const { jobStore, profileStore, commonStore, accountStore } = useStore();

  const initalValue: Job = {
    id: "",
    title: "",
    jobProfileId: "",
    introduction: "",
    isShared: false,
    isActive: true,
  };

  const [selectedId, setSelectedId] = useState<string>("");

  const validationSchema = yup.object().shape({
    title: yup.string().required(),
    introduction: yup.string().required(),
    isShared: yup
      .bool()
      .oneOf([true], "Must agree to share profile and contacts to create job"),
  });

  useEffect(() => {
    if (commonStore.token) {
      accountStore.getUser().then(() => profileStore.loadProfiles());
    }
  }, [profileStore, commonStore, accountStore]);

  if (profileStore.jobProfiles.length < 0) return <Loading />;

  const checkboxComponent: React.ComponentType<FieldProps> = ({ field }) => (
    <input
      type="checkbox"
      {...field}
      style={{ width: "18px", height: "18px", margin: "20px 10px 20px 0px" }}
    />
  );

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={initalValue}
      onSubmit={(values, { resetForm }) => {
        jobStore.createJob(values).then(() => resetForm());
      }}
    >
      {({ handleSubmit, setFieldValue, errors, isSubmitting }) => (
        <Form
          onSubmit={handleSubmit}
          style={{
            height: "100%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {profileStore.jobProfiles.length > 0 ? (
            <div>
              <FormLabel>Choose your profile to create job:</FormLabel>
              <Box
                sx={{
                  display: "flex",
                  margin: "20px 0",
                  flexWrap: "wrap",
                }}
              >
                {profileStore.jobProfiles
                  .map((item) => ({ ...item, selectedId }))
                  .map((jp) => (
                    <div
                      onClick={() => {
                        setSelectedId(jp.id);
                        setFieldValue("jobProfileId", jp.id);
                      }}
                      key={jp.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        marginRight: "10px",
                        boxShadow: "rgba(99, 99, 99, 0.3) 0px 2px 8px 1px",
                        padding: "15px",
                        minWidth: "100px",
                        borderRadius: "5px",
                      }}
                    >
                      {jp.selectedId === jp.id && (
                        <ArrowRightIcon color="action" fontSize="large" />
                      )}
                      <Typography  key={jp.id}>{jp.profileName}</Typography>
                    </div>
                  ))}
              </Box>

              {selectedId !== "" && (
                <>
                  <FormLabel>Title:</FormLabel>
                  <FormikField placeholder="Title" type="text" name="title" />
                  <CustomError name="title" error={errors.title} />
                  <FormLabel>Introduction:</FormLabel>
                  <Field name="introduction" component={TextAreaComponent} />
                  <CustomError
                    name="introduction"
                    error={errors.introduction}
                  />

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Field name="isShared" component={checkboxComponent} />

                    <Typography>
                      Your proffesional profile and contacts are allowed to
                      share.
                    </Typography>
                  </div>

                  <CustomError name="isShared" error={errors.isShared} />

                  <Button
                    disabled={selectedId === "" || isSubmitting}
                    variant="contained"
                    type="submit"
                    fullWidth
                  >
                    {isSubmitting ? <CircularProgress size={22} /> : "Create"}
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div
              style={{
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4">
                You don't have any profile to create job!
              </Typography>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default observer(JobCreator);
