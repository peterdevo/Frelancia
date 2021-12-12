import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import AccountImg from "../../../components/AccountImg";
import ButtonComponent from "../../../components/ButtonComponent";
import CardComponent from "../../../components/CardComponent";
import Loading from "../../../components/Loading";
import Viewer from "../../../components/Viewer";
import { useStore } from "../../../stores/store";

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
    <>
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
          }}
        >
          <AccountImg
            isEdit={false}
            editPhoto={() => console.log()}
            url={accountStore.user?.userPhoto}
          />
          <Typography>{`${accountStore.user?.firstName} ${accountStore.user?.lastName}`}</Typography>
        </Box>

        <div>
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
          <ButtonComponent
            path="/dashboard/interest"
            text="Interested"
            btnColor="#56BBB5"
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Viewer views="10" />
        </div>

        <Button
          onClick={() => accountStore.logOut()}
          variant="contained"
          style={{ backgroundColor: "#FDC1C1" }}
        >
          Logout
        </Button>
      </CardComponent>
    </>
  );
};

export default observer(Nav);
