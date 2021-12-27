import { Alert, List, ListItem } from "@mui/material";

interface IProps {
  errors: any;
}
const ValidationErrors = ({ errors }: IProps) => {
  return (
    <>
      {errors.map((e: any, i: any) => (
        <Alert variant="filled" severity="error" key={i} style={{margin:"3px 0px"}}>
          {e}
        </Alert>
      ))}
    </>
  );
};

export default ValidationErrors;
