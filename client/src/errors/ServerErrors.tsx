import { Container, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";

const ServerErrors = () => {
  const { commonStore } = useStore();
  return (
    <>
      <Container >
        <Typography variant="h3" component="h3">
          {commonStore.error?.message}
        </Typography>
        <Container style={{ border: "1px solid black", padding: "30px" }}>
          <Typography component="h2">
            {commonStore.error?.statusCode} status code
          </Typography>
          <Typography style={{ color: "blue" }} component="h2">
            Stack Trace
          </Typography>
          <Typography component="h2">{commonStore.error?.details}</Typography>
        </Container>
      </Container>
    </>
  );
};

export default observer(ServerErrors);
