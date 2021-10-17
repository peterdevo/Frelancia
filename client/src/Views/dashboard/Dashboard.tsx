import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TabComponent from "../../components/TabComponent";
import CardComponent from "../../components/CardComponent";
import ButtonComponent from "../../components/ButtonComponent";
import AccountImg from "../../components/AccountImg";
import Viewer from "../../components/Viewer";

const DashBoard = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <CardComponent
            CustomStyle={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <AccountImg />
            <div>
              <ButtonComponent text="Create profile" btnColor="#D4955A" />
              <ButtonComponent text="Create job" btnColor="#5A8BD4" />
              <ButtonComponent text="View profile" btnColor="#9F5AD4" />
              <ButtonComponent text="Interested" btnColor="#56BBB5" />
            </div>
            <div style={{marginBottom:"20px"}}>
              <Viewer views="10" />
            </div>

            <ButtonComponent text="Logout" btnColor="#DFAAAA" height="30px" />
          </CardComponent>
        </Grid>

        <Grid item xs={7}>
          <CardComponent>
            <TabComponent />
          </CardComponent>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashBoard;
