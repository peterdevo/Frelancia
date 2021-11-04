import { Field } from "formik";
import { FormControl,NativeSelect} from "@mui/material";

type Props = {
  name: string;
  children?: JSX.Element | JSX.Element[];
};
const FormikSelect = ({ children, name }: Props) => {
  return (
    <FormControl fullWidth>
      
      <Field
        type="select"
        as={NativeSelect}
        name={name}
        variant="standard"
        style={{
          marginBottom: "10px",
          padding: "5px 10px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          
        }}
      >
        {children}
      </Field>
    </FormControl>
  );
};

export default FormikSelect;
