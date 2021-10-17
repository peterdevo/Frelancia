import React from "react";
import classes from "./ButtonComponent.module.css";

interface IProp {
  text: string,
  btnColor:string,
  height?:string
}
const ButtonComponent = ({ text,btnColor,height }: IProp) => {
  return (
    <div style={{ backgroundColor: btnColor,height }} className={classes.button}>
      {text}
    </div>
  );
};

export default ButtonComponent
