import { Button, TextField } from "@mui/material";
import classes from "./JobProfileCreator.module.css";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form } from "formik";
import { useState } from "react";
import { JobLink } from "../../../models/JobLink";
import { JobProfile } from "../../../models/JobProfile";
import { useStore } from "../../../stores/store";
import ListLinks from "./listoflinks/ListLinks";
import { observer } from "mobx-react-lite";
import Loading from "../../../components/Loading";
import FormikField from "../../../components/customformik/FormikField";
import FormikSelect from "../../../components/customformik/FormikSelect";
import * as yup from "yup";

const JobProfileCreator = () => {
  const [addedLinks, setAddedLinks] = useState("");
  const [links, setLinks] = useState<JobLink[]>([]);
  const initalValue: JobProfile = {
    id: "",
    nicheId: 1,
    jobLinks: [],
    photos: "",
    description: "",
    createAt: new Date(Date.now()),
  };

  const { profileStore } = useStore();

  const validationSchema = yup.object().shape({
    description: yup.string().required(),
    jobLinks: yup.array().min(1, "must have link"),
  });

  if (profileStore.isLoading) return <Loading />;
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initalValue}
      onSubmit={(values) => {
        values.jobLinks = links;
        profileStore.createJobProfile(values);
        console.log(values);
      }}
    >
      {({ handleSubmit, errors }) => (
        <Form onSubmit={handleSubmit} style={{ padding: "20px" }}>
          <FormikSelect name="nicheId">
            {[
              { nicheId: 1, niche: "Frontend" },
              { nicheId: 2, niche: "Backend" },
            ].map((jp, index) => (
              <option key={index}>{jp.niche}</option>
            ))}
          </FormikSelect>

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
              style={{ cursor: "pointer", borderRadius: "50%",}}
              onClick={() => setLinks([...links, { url: addedLinks }])}
            />
          </div>
          <div>
            {links.length > 0 && (
              <div className={classes.links}>
                {links.map((l, index) => {
                  return (
                    <ListLinks
                      key={index}
                      text={l.url}
                      handleDelete={() =>
                        setLinks(links.filter((l, i) => i !== index))
                      }
                    />
                  );
                })}
              </div>
            )}
          </div>

          <FormikField placeholder="Photos" name="photos" type="field" />
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
