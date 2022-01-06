import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Footer = () => (
  <Box sx={{ position: "fixed",textAlign:"right", bottom: 10,width:"90%",margin:"-50px ",padding:"10px" }}>
    <Typography>&copy; Copyright 2021 Peter, All right reserved </Typography>
  </Box>
);

export default Footer;
