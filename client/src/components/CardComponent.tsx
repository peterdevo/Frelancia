import React from "react";
import classes from "./CardComponent.module.css";

interface IProps {
  children?: any;
  CustomStyle?:React.CSSProperties
}
const CardComponent = ({ children,CustomStyle }: IProps) => {
  return <div style={CustomStyle} className={classes.card}>{children}</div>;
};

export default CardComponent;
