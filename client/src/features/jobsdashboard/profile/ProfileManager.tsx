import { Box } from "@mui/system";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import EditAccountSetting from "./editaccountsetting/EditAccountSetting";
import EditJob from "./editjob/EditJob";
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
          marginBottom: "40px",
          backgroundColor: "#DFAAAA",
          width:"100%",
          display:"flex",
          alignItems:"center",
          justifyContent:"space-evenly"
        }}
      >
        <TopTab subPath="editaccountsetting" label="Account setting" />
        <TopTab subPath="editjobprofile" label="Job profile" />
        <TopTab subPath="editjob" label="Job" />
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
          <Route exact path={`${path}/editjob`} component={EditJob} />
        </Switch>
      </Box>
    </Box>
  );
};

export default ProfileManager;
