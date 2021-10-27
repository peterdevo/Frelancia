import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./ButtonComponent.module.css";

interface IProps {
  text: string;
  btnColor: string;
  height?: string;
  path: string;
}
const ButtonComponent = ({ path, text, btnColor, height }: IProps) => {
  return (
    <NavLink
      className={classes.button}
      exact
      to={path}
      activeStyle={{backgroundImage: `linear-gradient(to right, #FF7777,${btnColor})` }}
      style={{
        backgroundColor:`${btnColor}`,
        height: height,
        textDecoration: "None",
        color:"white",
        borderRadius:"10px"

      }}
    >
      {text}
    </NavLink>
  );
};

export default ButtonComponent;
