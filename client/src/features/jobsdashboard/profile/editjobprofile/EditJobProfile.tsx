import {
  Button,
  CircularProgress,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Field, FieldArray, Form, Formik } from "formik";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { ImageListType } from "react-images-uploading";
import FormikField from "../../../../components/customformik/FormikField";
import PhotoList from "../../../../components/photocomponents/PhotoList";
import PhotoUploader from "../../../../components/photocomponents/PhotoUploader";
import { JobProfile } from "../../../../models/JobProfile";
import { useStore } from "../../../../stores/store";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TextAreaComponent from "../../../../components/customformik/TextAreaComponent";
import ClearIcon from "@mui/icons-material/Clear";
import CustomSingleFileUploader from "../../../../components/CustomSingleFileUploader";
const EditJobProfile = () => {
  const { profileStore } = useStore();
  const [addedLinks, setAddedLinks] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    profileStore.loadProfiles();
  }, [profileStore]);

  const handleOnSet = (jp: JobProfile) => {
    profileStore.setSelectProfile(jp);
  };

  console.log(toJS(profileStore.selectedProfile));

  return (
    <Box sx={{ padding: "20px" }}>
      <Box sx={{ display: "flex",gap:"1em" }}>
        {profileStore.jobProfiles.length > 0 ? (
          profileStore.jobProfiles.map((jp) => (
            <div
              key={jp.id}
              style={{
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
        initialValues={profileStore.selectedProfile}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          profileStore.editJobProfile(values).finally(() => resetForm());
        }}
      >
        {({ handleSubmit, values, isSubmitting, setSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            {values.id && (
              <div>
                <Box>
                  <Box sx={{ display: "inline-block", minWidth: "80%" }}>
                    <InputLabel sx={{ margin: "6px" }} htmlFor="my-input">
                      Profile name:
                    </InputLabel>
                    <FormikField
                      name="profileName"
                      type="field"
                      value={values.profileName}
                    />
                  </Box>
                  <Button
                    disabled={(values.id === "" && true) || isSubmitting}
                    variant="contained"
                    type="submit"
                    sx={{ margin: "35px 0px 0px 20px" }}
                  >
                    {isSubmitting ? <CircularProgress size={22} /> : "Save"}
                  </Button>
                </Box>
                <div>
                  <InputLabel sx={{ margin: "6px" }} htmlFor="my-input">
                    Photo:
                  </InputLabel>
                  <div>
                    <PhotoList
                      isIndex={false}
                      isLoading={isSubmitting}
                      photos={values.photos}
                      deletePhoto={(publicId) => {
                        setSubmitting(true);
                        profileStore
                          .deletePhoto(values.id, publicId)
                          .finally(() => setSubmitting(false));
                      }}
                    />
                    <PhotoUploader
                      removeAll={true}
                      usePhotoList={false}
                      buttonName="Add image"
                      isLoading={isSubmitting}
                      getArrayImgs={(images: ImageListType) =>
                        images.forEach((img: any) => {
                          setSubmitting(true);
                          profileStore
                            .addPhoto(values.id, img.file)
                            .finally(() => setSubmitting(false));
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
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {values.jobLinks.map((jp, index) => (
                        <div
                          key={jp.id}
                          style={{
                            minWidth: "200px",
                            display: "flex",
                            alignItems: "center",
                            marginRight: "30px",
                          }}
                        >
                          <FormikField
                            name={`jobLinks[${index}].url`}
                            type="field"
                            value={jp.url}
                          />
                          <Button
                            sx={{ margin: "0px 10px 0px 10px" }}
                            disabled={
                              (values.id === "" && true) || isSubmitting
                            }
                            variant="contained"
                            type="submit"
                          >
                            {isSubmitting ? (
                              <CircularProgress size={22} />
                            ) : (
                              "Save"
                            )}
                          </Button>

                          <Button
                            disabled={
                              (values.id === "" && true) || isSubmitting
                            }
                            onClick={() => {
                              setSubmitting(true);
                              profileStore
                                .deleteUpdatedLink(jp.id!)
                                .finally(() => setSubmitting(false));
                            }}
                            variant="contained"
                            type="button"
                            sx={{
                              backgroundColor: "red",
                              "&:hover": {
                                backgroundColor: "red",
                              },
                            }}
                          >
                            {isSubmitting ? (
                              <CircularProgress size={22} />
                            ) : (
                              "Delete"
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                />
                {isSubmitting ? (
                  <CircularProgress size={22} />
                ) : (
                  <Button
                    type="button"
                    sx={{
                      backgroundColor: "#FFAB76",
                      "&:hover": {
                        backgroundColor: "#FFAB76",
                      },
                    }}
                    onClick={() => setToggle(!toggle)}
                    variant="contained"
                  >
                    Add new link
                  </Button>
                )}
                {toggle && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <TextField
                      style={{ width: "50%" }}
                      label="Links"
                      fullWidth
                      value={addedLinks}
                      onChange={(e) => setAddedLinks(e.target.value)}
                    />
                    <Button
                      disabled={(values.id === "" && true) || isSubmitting}
                      variant="contained"
                      type="button"
                      sx={{ marginLeft: "10px" }}
                      onClick={() => {
                        setSubmitting(true);
                        profileStore
                          .addLink(values.id, { url: addedLinks })
                          .finally(() => setSubmitting(false));
                      }}
                    >
                      {isSubmitting ? <CircularProgress size={22} /> : "Save"}
                    </Button>
                  </Box>
                )}
                <Box>
                  <InputLabel sx={{ margin: "6px" }} htmlFor="my-input">
                    PDF:
                  </InputLabel>
                  {values.jobFiles.length > 0 && (
                    <Box>
                      <Box sx={{ display: "flex" }}>
                        {values.jobFiles.map((jf) => (
                          <Box
                            sx={{
                              color: "white",
                              marginRight: "10px",
                              display: "flex",
                              alignItems: "center",
                            }}
                            key={jf.id}
                          >
                            {isSubmitting ? (
                              <CircularProgress size={22} />
                            ) : (
                              <Box
                                sx={{
                                  backgroundColor: "#3FA796",
                                  padding: "20px",
                                  borderRadius: "10px",
                                  position: "relative",
                                  marginBottom: "10px",
                                }}
                              >
                                <Typography>{jf.name}</Typography>
                                <div
                                  onClick={() => {
                                    setSubmitting(true);
                                    profileStore
                                      .deleteFile(jf.id!)
                                      .finally(() => setSubmitting(false));
                                  }}
                                  style={{
                                    position: "absolute",
                                    top: "0px",
                                    right: "0px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <ClearIcon
                                    fontSize="small"
                                    sx={{ color: "white" }}
                                  />
                                </div>
                              </Box>
                            )}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                  <CustomSingleFileUploader
                    isLoading={isSubmitting}
                    setFile={(file) => {
                      setSubmitting(true);
                      profileStore
                        .addFile(values.id, file)
                        .finally(() => setSubmitting(false));
                    }}
                  />
                </Box>

                <Box>
                  <Box sx={{ display: "inline-block", minWidth: "80%" }}>
                    <InputLabel sx={{ margin: "6px" }} htmlFor="my-input">
                      Description:
                    </InputLabel>

                    <Field
                      name="description"
                      value={values.description}
                      component={TextAreaComponent}
                    />
                  </Box>
                  <Button
                    disabled={(values.id === "" && true) || isSubmitting}
                    variant="contained"
                    type="submit"
                    sx={{ margin: "120px 0px 0px 20px" }}
                  >
                    {isSubmitting ? <CircularProgress size={22} /> : "Save"}
                  </Button>
                </Box>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default observer(EditJobProfile);
