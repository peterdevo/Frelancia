import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  FormLabel,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import FormikField from "../../components/customformik/FormikField";
import { useStore } from "../../stores/store";
import * as Yup from "yup";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  isOpen: boolean;
  setOpen: () => void;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});
const Login = ({ isOpen, setOpen }: IProps) => {
  const { accountStore } = useStore();
  return (
    <Dialog
      fullWidth
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={setOpen}
      aria-describedby="alert-dialog-slide-description"
    >
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={{ username: "", password: "", error: null }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          accountStore
            .login(values)
            .catch((error) =>
              setErrors({ error: "Invalid email or password" })
            );
          setTimeout(() => {
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({ handleSubmit, isSubmitting, errors }) => (
          <Form style={{ padding: "100px" }} onSubmit={handleSubmit}>
            <Typography
              style={{ textAlign: "center" }}
              variant="h4"
              component="h2"
            >
              Login
            </Typography>

            <FormLabel>Username:</FormLabel>
            <FormikField name="username" type="text" placeholder="Username" />
            <FormLabel>Password:</FormLabel>
            <FormikField name="password" type="text" placeholder="Password" />
            <ErrorMessage
              name="error"
              render={() => (
                <Alert style={{ marginBottom: "10px" }} severity="error">
                  {errors.error}
                </Alert>
              )}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              fullWidth
              style={{ backgroundColor: "#FDC1C1" }}
            >
              {isSubmitting ? <CircularProgress size={22} /> : "Login"}
            </Button>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default observer(Login);
