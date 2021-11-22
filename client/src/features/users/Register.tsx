import {
  Button,
  CircularProgress,
  Dialog,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import FormikField from "../../components/customformik/FormikField";
import { useStore } from "../../stores/store";
import * as Yup from "yup";
import ValidationErrors from "../../errors/ValidationErrors";
import { observer } from "mobx-react-lite";

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
const Register = ({ isOpen, setOpen }: IProps) => {
  const { accountStore } = useStore();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(),
    password: Yup.string().required(),
    displayName: Yup.string().required(),
    userName: Yup.string().required(),
  });

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
        initialValues={{
          email: "",
          password: "",
          displayName: "",
          userName: "",
          error: null,
        }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          accountStore.register(values).catch((error) => setErrors({ error }));

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
              Register
            </Typography>
            <FormikField name="email" type="text" placeholder="Email" />
            <FormikField name="password" type="text" placeholder="Password" />
            <FormikField
              name="displayName"
              type="text"
              placeholder="Display name"
            />
            <FormikField name="userName" type="text" placeholder="Username" />
            <ErrorMessage
              name="error"
            
              render={() => <ValidationErrors errors={errors.error} />}
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              style={{ backgroundColor: "#FDC1C1" }}
            >
              {isSubmitting ? <CircularProgress size={22} /> : "Register"}
            </Button>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default observer(Register);
