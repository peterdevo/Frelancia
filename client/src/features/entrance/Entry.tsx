import {
  Button,
  IconButton,
  ImageListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Login from "../users/Login";
import Register from "../users/Register";

const Entry = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  return (
    <>
      <div>
        <Box sx={{ flexGrow: 1, backgroundColor: "none" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Frelancia
            </Typography>
            <Button
              style={{
                backgroundColor: "#F0EAEA",
                color: "black",
                marginRight: "10px",
              }}
              onClick={() => setIsLoginOpen(true)}
              color="inherit"
            >
              Login
            </Button>
            <Button
              style={{ backgroundColor: "#F0EAEA", color: "black" }}
              onClick={() => setIsRegisterOpen(true)}
              color="inherit"
            >
              Register
            </Button>
          </Toolbar>
        </Box>

        <Login isOpen={isLoginOpen} setOpen={() => setIsLoginOpen(false)} />
        <Register
          isOpen={isRegisterOpen}
          setOpen={() => setIsRegisterOpen(false)}
        />
      </div>
      <Box
        sx={{
          minHeight: "70vh",
          width: "90%",
          margin: "50px auto",
          borderRadius: "10px",
          boxShadow: "rgba(99, 99, 99, 0.7) 0px 2px 8px 0px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <ImageListItem sx={{ maxWidth: "400px"}}>
          <img src="/junior.jpg" alt="img"  />
        </ImageListItem>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography>Life begins at the end of your comfort zone.</Typography>
          <Typography
            style={{
              backgroundColor: "#FDC1C1",
              color: "#686868",
              marginTop: "10px",
              padding: "20px",
              
            }}
          >
            Frelancia let you decide your own path.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Entry;
