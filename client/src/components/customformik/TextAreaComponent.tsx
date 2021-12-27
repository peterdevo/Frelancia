import { TextField } from "@mui/material";
import { FieldProps } from "formik";

const TextAreaComponent: React.ComponentType<FieldProps> = ({ field }) => {
  return (
    <TextField
      fullWidth
      multiline
      rows={4}
      {...field}
      style={{
        margin: "10px 0px",
        resize: "none",
      }}
    />
  );
};
export default TextAreaComponent;
