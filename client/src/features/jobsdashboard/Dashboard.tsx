import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Nav from "./navdashboard/Nav";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import JobProfileCreator from "./jobprofile/JobProfileCreator";
import JobCreator from "./job/JobCreator";
import ProfileManager from "./profile/ProfileManager";
import CardComponent from "../../components/CardComponent";
import TestErrors from "../../errors/TestErrors";

const DashBoard = () => {
  let { path } = useRouteMatch();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Nav />
          </Grid>
          <Grid item xs={7}>
            <CardComponent>
              <Switch>
                <Route exact path={`${path}/`}>
                  <TestErrors/>
                </Route>
                <Route
                  path={`${path}/createprofile`}
                  component={JobProfileCreator}
                />
                <Route path={`${path}/createjob`} component={JobCreator} />
                <Route path={`${path}/profile`} component={ProfileManager} />
              </Switch>
            </CardComponent>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DashBoard;
