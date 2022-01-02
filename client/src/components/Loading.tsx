import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { Typography } from "@mui/material";

interface IProps {
  text?: string;
}
const Loading = ({ text = "Loading..." }: IProps) => {
  return (
    <Backdrop
      open={true}
      style={{
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      sx={{ color: "black", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" style={{ marginRight: "5px" }} />
      <Typography>{text}</Typography>
    </Backdrop>
  );
};

export default Loading;
