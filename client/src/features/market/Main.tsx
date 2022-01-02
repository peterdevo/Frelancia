import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import MarketCard from "../../components/marketcomponents/MarketCard";
import { useStore } from "../../stores/store";
import { useHistory } from "react-router-dom";


const Main = () => {
  const { marketStore } = useStore();
  useEffect(() => {
    marketStore.getJobs();
  }, [marketStore]);

  const history = useHistory();

  const viewDetail = (id: string) => {
    history.push(`/detail/${id}`);
  };
  return (
    <div>
      <Typography
        variant="h5"
        component="div"
        sx={{ flexGrow: 1, fontFamily: "Righteous" }}
      >
        Frelancia
      </Typography>

      <Box sx={{ marginTop: "100px", display:"flex", }}>
        {marketStore.jobs.length > 0 &&
          marketStore.jobs.map((j) => (
            <MarketCard
              key={j.id}
              title={j.title}
              introduction={j.introduction}
              viewDetail={() => viewDetail(j.id)}
            />
          ))}
      </Box>
    </div>
  );
};

export default observer(Main);
