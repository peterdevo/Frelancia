import { FormControl, Select } from "@mui/material";
import { FieldInputProps } from "formik";
import { ReactNode } from "react";



interface MaterialUISelectFieldProps extends FieldInputProps<string> {
  errorString?: string;
  children: ReactNode;
  label: string;
  required: boolean;
  defaultValue:string
}
const MaterialUISelect: React.FC<MaterialUISelectFieldProps> = ({
  name,
  children,
  defaultValue,
  onChange,

}) => {
  return (
    <FormControl fullWidth>
  
    <Select name={name} onChange={onChange} defaultValue={defaultValue}>
      {children}
    </Select>
   
  </FormControl>
  );
};

export default MaterialUISelect;
