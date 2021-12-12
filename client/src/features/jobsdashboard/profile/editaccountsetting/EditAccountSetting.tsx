import { Button, CircularProgress, FormLabel, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import AccountImg from "../../../../components/AccountImg";
import FormikField from "../../../../components/customformik/FormikField";
import { useStore } from "../../../../stores/store";

const EditAccountSetting = () => {
  const { userStore, accountStore } = useStore();
  useEffect(() => {
    userStore.getUpdatedUser();
  }, [userStore]);

  const editPhoto = async (
    file: File,
    photoId: string,
    deletedPublicId: string,
    preview: any
  ) => {
    await userStore.editImage(file, photoId, deletedPublicId);
    userStore.setPreview(preview);
    accountStore.setPreview(preview);
  };
  return (
    <Formik
      enableReinitialize
      initialValues={{
        updatedUser: userStore.updatedUser,
        isLoading: userStore.isLoading,
      }}
      onSubmit={(values) => {
        userStore.editUser(values.updatedUser);
      }}
    >
      {({ values, handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit} style={{ padding: 10 }}>
          <Typography variant="h5" component="h3">
            Account
          </Typography>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "20px",
            }}
          >
            <AccountImg
              isEdit={true}
              editPhoto={(file: File, preview) =>
                editPhoto(
                  file,
                  values.updatedUser.photoDto.id,
                  values.updatedUser.photoDto.publicId,
                  preview
                )
              }
              url={values.updatedUser.photoDto.url}
            />
          </div>
          <Box style={{ display: "flex", margin: "10px 0px" }}>
            <Box sx={{ width: "100%", marginRight: "10px" }}>
              <FormLabel>First name:</FormLabel>
              <FormikField
                name="updatedUser.firstName"
                type="text"
                value={values.updatedUser.firstName}
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <FormLabel>Last name:</FormLabel>
              <FormikField
                name="updatedUser.lastName"
                type="text"
                value={values.updatedUser.lastName}
              />
            </Box>
          </Box>

          <FormLabel>Biography:</FormLabel>
          <FormikField
            name="updatedUser.bio"
            type="text"
            value={values.updatedUser.bio}
            multiline={true}
            row={4}
          />
          <Box style={{ display: "flex", margin: "10px 0px" }}>
            <Box sx={{ width: "100%", marginRight: "10px" }}>
              <FormLabel>State:</FormLabel>
              <FormikField
                name="updatedUser.state"
                type="text"
                value={values.updatedUser.state}
              />
            </Box>
            <Box sx={{ width: "100%", marginRight: "10px" }}>
              <FormLabel>City:</FormLabel>
              <FormikField
                name="updatedUser.city"
                type="text"
                value={values.updatedUser.city}
              />
            </Box>
          </Box>
          <Box style={{ display: "flex", margin: "10px 0px" }}>
            <Box sx={{ width: "100%", marginRight: "10px" }}>
              <FormLabel>Zipcode:</FormLabel>
              <FormikField
                name="updatedUser.zipCode"
                type="text"
                value={values.updatedUser.zipCode}
              />
            </Box>
            <Box sx={{ width: "100%", marginRight: "10px" }}>
              <FormLabel>Country:</FormLabel>
              <FormikField
                name="updatedUser.country"
                type="text"
                value={values.updatedUser.country}
              />
            </Box>
          </Box>
          <Button
            disabled={values.isLoading}
            type="submit"
            variant="contained"
            fullWidth
            onClick={() => {
              setFieldValue("isLoading", userStore.isLoading);
            }}
          >
            {values.isLoading ? <CircularProgress size={22} /> : "Update"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default observer(EditAccountSetting);
