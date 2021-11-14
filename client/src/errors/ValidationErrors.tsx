import { List, ListItem } from "@mui/material";

interface IProps {
  errors: any;
}
const ValidationErrors = ({ errors }: IProps) => {
  
  return (
    <List style={{backgroundColor:"#FF7777",marginBottom:"10px"}}>
      {errors.map((e:any, i:any) => (
        <ListItem style={{color:"#F9F9F9"}} key={i}>{e}</ListItem>
      ))}
    </List>
  );
};

export default ValidationErrors;
