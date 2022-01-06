import {
  Button,
  CircularProgress,
  InputLabel,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { FieldArray, Form, Formik } from "formik";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ImageListType } from "react-images-uploading";
import FormikField from "../../../../components/customformik/FormikField";
import PhotoList from "../../../../components/photocomponents/PhotoList";
import PhotoUploader from "../../../../components/photocomponents/PhotoUploader";
import { JobProfile } from "../../../../models/JobProfile";
import { useStore } from "../../../../stores/store";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const EditJobProfile = () => {
  const { profileStore, accountStore, commonStore } = useStore();

  useEffect(() => {
    profileStore.loadProfiles();
  }, [profileStore]);

  const handleOnSet = (jp: JobProfile) => {
    profileStore.setSelectProfile(jp);
  };

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        {profileStore.jobProfiles.length > 0 ? (
          profileStore.jobProfiles.map((jp) => (
            <div
              key={jp.id}
              style={{
                padding: 10,
                color: "#2C272E",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "15px",
                  backgroundColor: "white",
                  boxShadow: "rgba(99, 99, 99, 0.3) 0px 2px 8px 1px",
                  borderRadius: "7px",
                  minWidth: "120px",
                }}
              >
                {!profileStore.isLoading ? (
                  <>
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => handleOnSet(jp)}
                    >
                      <EditOutlinedIcon />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0px 10px",
                        borderRadius: "5px",
                      }}
                      key={jp.id}
                    >
                      <Typography>{jp.profileName}</Typography>
                    </div>
                    <div
                      onClick={() => profileStore.deleteJobProfile(jp.id)}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <DeleteOutlineIcon />
                    </div>
                  </>
                ) : (
                  <CircularProgress size={22} />
                )}
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              width: "100%",
            }}
          >
            <Typography
              style={{ textAlign: "center", marginTop: "30%" }}
              variant="h4"
              component="h3"
            >
              You don't have any profile!
            </Typography>
          </div>
        )}
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
            {values.profile.id && (
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
                  disabled={
                    (values.profile.id === "" && true) || values.isLoading
                  }
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
