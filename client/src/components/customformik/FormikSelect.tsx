import { Field } from "formik";
import { FormControl} from "@mui/material";

type Props = {
  name: string;
  children?: JSX.Element | JSX.Element[];
};
const FormikSelect = ({ children, name }: Props) => {
  return (
    <FormControl fullWidth>
      
      <Field
        type="select"
        as={"select"}
        name={name}
        variant="standard"
        style={{
          marginBottom: "10px",
          padding: "20px 2px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          border:"1px solid lightgray",
          outline:"none",
          fontSize:"15px"
          
        }}
      >
        {children}
      </Field>
    </FormControl>
  );
};

export default FormikSelect;
