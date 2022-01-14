import { Box, Button, CircularProgress } from "@mui/material";
import { useRef } from "react";

interface IProps {
  setFile: (file: File) => void;
  isLoading: boolean;
}
const CustomSingleFileUploader = ({ setFile, isLoading }: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = (event: any) => {
    inputRef.current?.click();
  };
  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    setFile(fileUploaded);
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {isLoading ? (
        <CircularProgress size={22} />
      ) : (
        <Button
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
      )}
    </Box>
  );
};
export default CustomSingleFileUploader;
