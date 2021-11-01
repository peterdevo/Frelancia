import { List, ListItem } from "@mui/material";

interface IProps {
  errors: string[];
}
const ValidationErrors = ({ errors }: IProps) => {
  return (
    <List style={{backgroundColor:"#FF7777"}}>
      {errors.map((e, i) => (
        <ListItem style={{color:"#F9F9F9"}} key={i}>- {e}</ListItem>
      ))}
    </List>
  );
};

export default ValidationErrors;
