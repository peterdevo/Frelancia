import {
  Button,
  ImageListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
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
            
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontFamily: "Righteous" }}
            >
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
        <ImageListItem sx={{ maxWidth: "400px" }}>
          <img src="/junior.jpg" alt="img" />
        </ImageListItem>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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

          <Link
            style={{
              textDecoration: "none",
              marginTop: "50px",
              fontFamily: "Righteous",
              backgroundColor: "#B85252",
              padding: "10px",
              color: "white",
              borderRadius: "3px",
            }}
            to={"/jobmarket"}
          >
            Go to marketplace
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Entry;
