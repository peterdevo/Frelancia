import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface IProps {
  views: string;
}
const Viewer = ({ views }: IProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <VisibilityIcon /> {views}{" "}
    </div>
  );
};

export default Viewer;
