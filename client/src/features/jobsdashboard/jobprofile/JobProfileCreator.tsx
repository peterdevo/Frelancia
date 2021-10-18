import React from "react";
import { Formik, Form, Field } from "formik";
import { JobProfile } from "../../../models/JobProfile";

const JobProfileCreator = () => {
  const initalValue: JobProfile = {
    id: "",
    nicheId: 1,
    jobLinks: [],
    photos: "",
    description: "",
    createAt: new Date(Date.now()),
  };
  return (
    <>
      <Formik
        initialValues={initalValue}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
        }}
      >
        <Form>
          <Field id="nicheId" name="nicheId" placeholder="niche id" />
          <Field id="jobLinks" name="jobLinks" placeholder="jobLinks" />
          <Field id="photos" name="photos" placeholder="photos" />
          <Field id="description" name="description" placeholder="description" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default JobProfileCreator;
