import { Field } from "formik";
import { TextField } from "@mui/material";

interface IProps {
  placeholder?: string;
  name: string;
  type: string;
  error?: boolean;
  helperText?:string,
  value?:string
}
const FormikField = ({ name, placeholder, type, error,value,helperText }: IProps) => {
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
        
      />
    </div>
  );
};

export default FormikField;
