import { Typography } from "@mui/material";
import { NavLink, useRouteMatch } from "react-router-dom";

interface IProps {
  subPath: string;
  label: string;
}
const TopTab = ({ subPath, label }: IProps) => {
  let { path } = useRouteMatch();
  return (
    <NavLink
      exact
      to={`${path}/${subPath}`}
      style={{
        textDecoration: "none",
        padding: "10px",
        fontWeight: "bold",
        width:"150px",
        textAlign:"center",
        color:"white"

      }}
      activeStyle={{ borderBottom: "1.5px solid white" }}
    >
      <Typography style={{fontSize:"18px"}}>{label}</Typography>
    </NavLink>
  );
};
export default TopTab;
