import { Button, CircularProgress, FormLabel, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Field, Form, Formik } from "formik";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import AccountImg from "../../../../components/AccountImg";
import FormikField from "../../../../components/customformik/FormikField";
import TextAreaComponent from "../../../../components/customformik/TextAreaComponent";
import { useStore } from "../../../../stores/store";

const EditAccountSetting = () => {
  const { userStore, accountStore } = useStore();
  useEffect(() => {
    userStore.getUpdatedUser();
  }, [userStore]);

  const editPhoto = async (file: File, photoId: string, preview: any) => {
    await userStore.editImage(file, photoId);
    userStore.setPreview(preview);
    accountStore.setPreview(preview);
  };
  console.log(toJS(userStore.updatedUser))
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
          <Typography variant="h6" component="h3" sx={{marginBottom:"2px"}}>
            Account
          </Typography>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              padding: "10px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 1px",
              
            }}
          >
            <AccountImg
              isEdit={true}
              editPhoto={(file: File, preview: any) =>
                editPhoto(file, values.updatedUser.photoDto.id, preview)
              }
              url={values.updatedUser.photoDto.url}
            />
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "10px 0px",
              }}
            >
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
          </div>

          <FormLabel>Biography:</FormLabel>
          <Field
            name="updatedUser.bio"
            type="text"
            value={values.updatedUser.bio}
            component={TextAreaComponent}
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
              <FormLabel>Social media:</FormLabel>
              <FormikField
                name="updatedUser.socialMedia"
                type="text"
                value={values.updatedUser.socialMedia}
              />
            </Box>
            <Box sx={{ width: "100%", marginRight: "10px" }}>
              <FormLabel>Language:</FormLabel>
              <FormikField
                name="updatedUser.language"
                type="text"
                value={values.updatedUser.language}
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
