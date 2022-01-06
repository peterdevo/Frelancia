import { Field } from "formik";
import { TextField } from "@mui/material";

interface IProps {
  placeholder?: string;
  name: string;
  type: string;
  value?: string;
 
}
const FormikField = ({
  name,
  type,
  value,
  placeholder

}: IProps) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <Field
        name={name}
        as={TextField}
        fullWidth
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete='off'
        
      />
    </div>
  );
};

export default FormikField;
