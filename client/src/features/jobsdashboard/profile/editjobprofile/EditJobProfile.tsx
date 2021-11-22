import { Button, FormLabel, getDividerUtilityClass } from "@mui/material";
import { Box } from "@mui/system";
import { FieldArray, Form, Formik } from "formik";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import FormikField from "../../../../components/customformik/FormikField";

import Loading from "../../../../components/Loading";
import { JobProfile } from "../../../../models/JobProfile";
import { useStore } from "../../../../stores/store";
import ListLinks from "../../jobprofile/listoflinks/ListLinks";

const EditJobProfile = () => {
  const { profileStore, accountStore, commonStore } = useStore();
  const [selectedId, setSelectedId] = useState<string>("");
  useEffect(() => {
    if (commonStore.token) {
      accountStore.getUser().then(() => profileStore.loadProfiles());
    }
  }, [profileStore, accountStore, commonStore]);

  const handleOnSet = (jp: JobProfile) => {
    profileStore.setSelectProfile(jp);
    console.log(toJS(jp));
  };

  if (profileStore.isLoading) return <Loading />;

  return (
    <Box sx={{ padding: "10px" }}>
      <FormLabel>Profiles:</FormLabel>
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
                const { selectedId, ...rest } = jp;
                handleOnSet(rest);
              }}
              key={jp.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
              <div
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
                key={jp.id}
              >
                {jp.profileName}
              </div>
            </div>
          ))}
      </Box>

      <Formik
        initialValues={profileStore.selectedProfile}
        enableReinitialize
        onSubmit={(values) => {
          profileStore.editJobProfile(values);
          console.log(toJS(values));
        }}
      >
        {({ handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            <FormLabel>Photos:</FormLabel>
            <FormikField
              placeholder={values.photos}
              name="photos"
              type="field"
              value={values.photos}
            />

            <FieldArray
              name="jobLinks"
              render={() => (
                <div>
                  {values.jobLinks.map((jp, index) => (
                    <FormikField key={index} name={`jobLinks[${index}].url`} type="field" value={jp.url} />
                  ))}
                </div>
              )}
            />
            <FormLabel>Description:</FormLabel>
            <FormikField
              placeholder="Description"
              name="description"
              type="field"
              value={values.description}
            />
            <Button disabled={selectedId==""&&true} variant="contained" size="medium" type="submit" fullWidth>
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default observer(EditJobProfile);
