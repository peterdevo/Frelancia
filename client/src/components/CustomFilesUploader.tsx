import { Box, Button, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { useStore } from "../stores/store";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ClearIcon from "@mui/icons-material/Clear";

const CustomFilesUploader = () => {
  const { profileStore } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = (event: any) => {
    inputRef.current?.click();
  };
  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    profileStore.setJobFiles(fileUploaded);
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Button
        endIcon={<UploadFileIcon />}
        sx={{
          backgroundColor: "#D9534F",
          margin: "10px 20px 10px 0px",
          "&:hover": {
            backgroundColor: "#D9534F",
          },
        }}
        variant="contained"
        onClick={handleClick}
      >
        PDF
        <input
          ref={inputRef}
          type="file"
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </Button>

      <Box sx={{ display: "flex" }}>
        {profileStore.jobFiles.map((file, index) => (
          <Box
            sx={{
              backgroundColor: "#3FA796",
              padding:"20px",
              borderRadius: "10px",
              color: "white",
              marginRight: "10px",
              textAlign:"center",
              position: "relative"
            }}
            key={index}
          >
            <Typography>{file?.name}</Typography>
           
            <div
              onClick={() => {
                profileStore.setDeleteJobFiles(index);
              }}
              style={{
                position: "absolute",
                top: "0",
                right: "0px",
                cursor: "pointer",
              }}
            >
              <ClearIcon fontSize="small" sx={{ color: "white" }} />
            </div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default observer(CustomFilesUploader);
