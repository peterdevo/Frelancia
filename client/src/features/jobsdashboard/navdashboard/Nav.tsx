import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import AccountImg from "../../../components/AccountImg";
import ButtonComponent from "../../../components/ButtonComponent";
import CardComponent from "../../../components/CardComponent";
import Loading from "../../../components/Loading";
import { useStore } from "../../../stores/store";
import LogoutIcon from "@mui/icons-material/Logout";

const Nav = () => {
  const { accountStore, commonStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      accountStore.getUser().finally(() => commonStore.setApploaded());
    } else {
      commonStore.setApploaded();
    }
  }, [accountStore, commonStore]);

  if (!commonStore.appLoaded) return <Loading />;
  return (
    <CardComponent
      CustomStyle={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          margin: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "20vh",
        }}
      >
        <AccountImg
          isEdit={false}
          editPhoto={() => console.log()}
          url={accountStore.user?.userPhoto}
        />
        <Typography
          style={{ marginTop: "20px", fontSize: "20px" }}
        >{`${accountStore.user?.firstName} ${accountStore.user?.lastName}`}</Typography>
      </Box>

      <Box
        sx={{
          height: "30vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}
      >
        <ButtonComponent
          path="/dashboard/createprofile"
          text="Create profile"
          btnColor="#D4955A"
        />
        <ButtonComponent
          path="/dashboard/createjob"
          text="Create job"
          btnColor="#5A8BD4"
        />
        <ButtonComponent
          path="/dashboard/profile/editaccountsetting"
          text="View profile"
          btnColor="#9F5AD4"
        />
      </Box>

      <Button
        onClick={() => accountStore.logOut()}
        variant="contained"
        style={{
          backgroundColor: "#FF7272",
          marginTop: "100px",
          fontSize: "14px",
        }}
      >
        <LogoutIcon style={{ marginRight: "5px" }} /> Logout
      </Button>
    </CardComponent>
  );
};

export default observer(Nav);
