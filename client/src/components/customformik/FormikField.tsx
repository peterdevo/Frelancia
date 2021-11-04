import { Field } from "formik";
import { TextField } from "@mui/material";

interface IProps {
  placeholder?: string;
  name: string;
  type: string;
  error?: boolean;
  helperText?:string
}
const FormikField = ({ name, placeholder, type, error,helperText }: IProps) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <Field
        name={name}
        as={TextField}
        fullWidth
        type={type}
        placeholder={placeholder}
        helperText={helperText}
        error={error}
      />
    </div>
  );
};

export default FormikField;
