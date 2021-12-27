import { Alert } from "@mui/material";
import { ErrorMessage } from "formik";

interface IProps {
  name: string;
  error?: string;
}
const CustomError = ({ name, error }: IProps) => {
  return (
    <ErrorMessage
      name={name}
      component={() => (
        <Alert style={{margin:"10px 0px"}} variant="filled" severity="error">
          {error}
        </Alert>
      )}
    />
  );
};

export default CustomError;
