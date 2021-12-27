import { Button, Typography } from "@mui/material";
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
      activeStyle={{
        boxShadow: `white 5px 5px, ${btnColor} 10px 10px`,
      }}
      style={{
        backgroundColor: `${btnColor}`,
        height: height,
        textDecoration: "None",
        color: "white",
        borderRadius: "10px",
      }}
    >
      <Typography> {text}</Typography>
    </NavLink>
  );
};

export default ButtonComponent;
