import {
  Box,
  Button,
  FormHelperText,
  FormLabel,
  Typography,
} from "@mui/material";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import FormikField from "../../../components/customformik/FormikField";
import Loading from "../../../components/Loading";
import { Job } from "../../../models/Job";
import { useStore } from "../../../stores/store";
import * as yup from "yup";

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
    isShared: yup.bool().oneOf([true]),
  });

  useEffect(() => {
    if (commonStore.token) {
      accountStore.getUser().then(() => profileStore.loadProfiles());
    }
  }, [profileStore, commonStore, accountStore]);

  if (profileStore.jobProfiles.length < 0) return <Loading />;

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={initalValue}
      onSubmit={(values) => {
        console.log(values);
        jobStore.createJob(values);
      }}
    >
      {({ handleSubmit, errors, setFieldValue }) => (
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
              <FormLabel>Choose your project:</FormLabel>
              <Box
                sx={{
                  display: "flex",
                  margin: "10px 0",
                  boxShadow: "rgba(99, 99, 99, 0.3) 0px 2px 8px 1px",
                  padding: "15px",
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
                        borderRadius: "5px",
                      }}
                    >
                      <div
                        style={{
                          width: "15px",
                          height: "15px",
                          borderRadius: "10px",
                          marginRight: "5px",
                          background: `${
                            jp.selectedId === jp.id ? "#678983" : "white"
                          }`,
                        }}
                      ></div>
                      <div key={jp.id}>{jp.profileName}</div>
                    </div>
                  ))}
              </Box>

              {selectedId !== "" && (
                <>
                  <FormLabel>Title:</FormLabel>
                  <FormikField placeholder="Title" type="text" name="title" />
                  <FormLabel>Description:</FormLabel>
                  <FormikField
                    placeholder="Introduction"
                    type="text"
                    name="introduction"
                    error={errors.introduction ? true : false}
                    helperText={errors.introduction}
                  />
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Field type="checkbox" name="isShared" />
                    <Typography>
                      Your proffesional profile and contacts are allowed to
                      share.
                    </Typography>
                  </div>
                  <ErrorMessage
                    name="isShared"
                    render={() => (
                      <FormHelperText
                        style={{ color: "red", margin: "10px 10px" }}
                      >
                        must have your permission before publising job
                      </FormHelperText>
                    )}
                  />
                  <Button
                    disabled={selectedId === "" && true}
                    variant="contained"
                    type="submit"
                    fullWidth
                  >
                    Create
                  </Button>
                </>
              )}
            </div>
          ) : (
            <Typography style={{ margin: "auto" }} variant="h4" component="h3">
              You don't have any profile to create job!
            </Typography>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default observer(JobCreator);
