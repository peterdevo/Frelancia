import { Button, TextField } from "@mui/material";
import { Formik, Form, Field, FieldArray } from "formik";
import { useState } from "react";
import { JobProfile } from "../../../models/JobProfile";
import { useStore } from "../../../stores/store";

const JobProfileCreator = () => {
  const [addedLinks, setAddedLinks] = useState("");
  const initalValue: JobProfile = {
    id: "",
    nicheId: -1,
    jobLinks: [],
    photos: "",
    description: "",
    createAt: new Date(Date.now()),
  };

  const { profileStore } = useStore();

  return (
    <>
      <Formik
        initialValues={initalValue}
        onSubmit={(values) => {
          profileStore.createJobProfile(values);
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form>
            <Field as="select" name="nicheId">
              <option value={1}>Frontend</option>
              <option value={2}>Backend</option>
            </Field>

            <input
              value={addedLinks}
              onChange={(e) => setAddedLinks(e.target.value)}
            />
            <FieldArray name="jobLinks">
              {({ push }) => (
                <div>
                  <Button
                    type="button"
                    onClick={() => push({ url: addedLinks })}
                  >
                    Add
                  </Button>
                </div>
              )}
            </FieldArray>
            <div>
              {values.jobLinks.map((l) => (
                <div>{l.url}</div>
              ))}
            </div>
            <Field type="photos" name="photos" placeholder="photos" />
            <Field
              id="description"
              name="description"
              placeholder="description"
            />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default JobProfileCreator;
