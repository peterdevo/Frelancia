import { Box } from "@mui/system";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import EditAccountSetting from "./editaccountsetting/EditAccountSetting";
import ViewJob from "./viewjob/ViewActiveJob";
import EditJobProfile from "./editjobprofile/EditJobProfile";
import TopTab from "./toptabs/TopTab";

const ProfileManager = () => {
  let { path } = useRouteMatch();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          marginBottom: "10px",
          background: "rgb(255, 114, 114)",
          display:"flex",
          alignItems:"center",
          justifyContent:"space-evenly",
          borderRadius:"5px",
          padding:"5px"
          
        }}
      >
        <TopTab subPath="editaccountsetting" label="Account setting" />
        <TopTab subPath="editjobprofile" label="Job profile" />
        <TopTab subPath="viewjob" label="Job" />
      </Box>

      <Box>
        <Switch>
          <Route
            exact
            path={`${path}/editaccountsetting`}
            component={EditAccountSetting}
          />
          <Route
            exact
            path={`${path}/editjobprofile`}
            component={EditJobProfile}
          />
          <Route exact path={`${path}/viewjob`} component={ViewJob} />
        </Switch>
      </Box>
    </Box>
  );
};

export default ProfileManager;
