import { Tab } from "@mui/material";
import { NavLink, useRouteMatch } from "react-router-dom";

interface IProps {
  subPath: string;
  label:string
}
const TopTab = ({ subPath,label }: IProps) => {
  let { path } = useRouteMatch();
  return (
    <NavLink exact to={`${path}/${subPath}`} style={{ textDecoration: "none",color:"#FFFFFF" }}>
      <Tab label={label} />
    </NavLink>
  );
};
export default TopTab;
