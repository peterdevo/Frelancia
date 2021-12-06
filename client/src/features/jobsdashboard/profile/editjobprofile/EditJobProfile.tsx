import { Button, CircularProgress, InputLabel } from "@mui/material";
import { Box } from "@mui/system";
import { FieldArray, Form, Formik } from "formik";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { ImageListType } from "react-images-uploading";
import FormikField from "../../../../components/customformik/FormikField";
import Loading from "../../../../components/Loading";
import PhotoList from "../../../../components/photocomponents/PhotoList";
import PhotoUploader from "../../../../components/photocomponents/PhotoUploader";
import { JobProfile } from "../../../../models/JobProfile";
import { useStore } from "../../../../stores/store";

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
  };

  return (
    <Box sx={{ padding: "10px" }}>
      <InputLabel sx={{ margin: "6px" }} htmlFor="my-input">
        Profiles:
      </InputLabel>

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

                console.log(jp);
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
        initialValues={{
          profile: profileStore.selectedProfile,
          isLoading: profileStore.isLoading,
        }}
        enableReinitialize
        onSubmit={(values) => {
          profileStore.editJobProfile(values.profile);
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            {selectedId && (
              <div>
                <div>
                  <InputLabel sx={{ margin: "6px" }} htmlFor="my-input">
                    Photo:
                  </InputLabel>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <PhotoList
                      isIndex={false}
                      isLoading={values.isLoading}
                      photos={values.profile.photos}
                      deletePhoto={(publicId) => {
                        profileStore.deletePhoto(values.profile.id, publicId);
                      }}
                    />
                    <PhotoUploader
                      removeAll={true}
                      usePhotoList={false}
                      buttonName="Add more image"
                      isLoading={values.isLoading}
                      getArrayImgs={(images: ImageListType) =>
                        images.forEach((img: any) => {
                          profileStore.addPhoto(values.profile.id, img.file);
                        })
                      }
                    />
                  </div>
                </div>

                <InputLabel sx={{ margin: "6px" }} htmlFor="my-input">
                  Links:
                </InputLabel>
                <FieldArray
                  name="jobLinks"
                  render={() => (
                    <div>
                      {values.profile.jobLinks.map((jp, index) => (
                        <FormikField
                          key={index}
                          name={`profile.jobLinks[${index}].url`}
                          type="field"
                          value={jp.url}
                        />
                      ))}
                    </div>
                  )}
                />
                <InputLabel sx={{ margin: "6px" }} htmlFor="my-input">
                  Description:
                </InputLabel>
                <FormikField
                  placeholder="Description"
                  name="profile.description"
                  type="field"
                  value={values.profile.description}
                />

                <Button
                  disabled={(selectedId === "" && true) || values.isLoading}
                  variant="contained"
                  size="medium"
                  type="submit"
                  fullWidth
                  onClick={() => {
                    setFieldValue("isLoading", profileStore.isLoading);
                  }}
                >
                  {values.isLoading ? <CircularProgress size={22} /> : "Update"}
                </Button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default observer(EditJobProfile);
