import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Nav from "./navdashboard/Nav";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import JobProfileCreator from "./jobprofile/JobProfileCreator";
import JobCreator from "./job/JobCreator";
import ProfileManager from "./profile/ProfileManager";
import InterestMangager from "./interest/InterestManager";

const DashBoard = () => {
  let { path } = useRouteMatch();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4} sx={{ border: "1px solid red" }}>
            <Nav />
          </Grid>
          <Grid item xs={7} sx={{ border: "1px solid red" }}>
            <Switch>
              <Route exact path={`${path}/`}>
                  <h1>Welcome to Dashboard</h1>
              </Route>
              <Route path={`${path}/createprofile`}component={JobProfileCreator}/>
              <Route path={`${path}/createjob`} component={JobCreator} />
              <Route path={`${path}/profile`} component={ProfileManager} />
              <Route path={`${path}/interest`} component={InterestMangager} />
            </Switch>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DashBoard;
