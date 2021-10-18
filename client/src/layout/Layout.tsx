import React from "react";
import classes from "./Layout.module.css"
interface IProps{
children:any
}
const Layout = ({children}:IProps) => {
  return <div className={classes.layout}>
    {children}</div>;
};

export default Layout;
