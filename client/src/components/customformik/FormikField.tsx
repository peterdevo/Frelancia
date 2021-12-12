import { Field } from "formik";
import { TextField } from "@mui/material";

interface IProps {
  placeholder?: string;
  name: string;
  type: string;
  error?: boolean;
  helperText?: string;
  value?: string;
  row?: number;
  multiline?: boolean;
}
const FormikField = ({
  name,
  placeholder,
  type,
  error,
  value,
  helperText,
  row,
  multiline,
}: IProps) => {
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
        value={value}
        multiline={multiline}
        row={row}
      />
    </div>
  );
};

export default FormikField;
