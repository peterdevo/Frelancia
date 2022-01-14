import { Box, LinearProgress, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import MarketCard from "../../components/marketcomponents/MarketCard";
import { useStore } from "../../stores/store";
import { useHistory } from "react-router-dom";
import Footer from "../../components/Footer";
import MainLayout from "../../layout/MainLayout";
import CustomPagination from "../../components/marketcomponents/CustomPagination";
import { PagingParams } from "../../models/Pagination";
import { toJS } from "mobx";
import CustomMenu from "../../components/marketcomponents/CustomMenu";

const Main = () => {
  const { marketStore, profileStore } = useStore();
  const {
    setPagingParams,
    pagination,
    getJobs,
    jobs,
    loading,
    setFilterNicheId,
  } = marketStore;
  const { getNiche, listOfNiches } = profileStore;

  useEffect(() => {
    getJobs();
    getNiche();
  }, [marketStore]);

  const setOnPageChange = (page: number) => {
    setPagingParams(new PagingParams(page));
    getJobs();
  };

  const filterNiche = (nicheId: number) => {
    setFilterNicheId(nicheId);
    getJobs();
  };

  const history = useHistory();

  const viewDetail = (id: string) => {
    history.push(`/detail/${id}`);
  };

  return (
    <MainLayout>
      <Typography
        variant="h5"
        component="div"
        sx={{ flexGrow: 1, fontFamily: "Righteous" }}
      >
        Frelancia
      </Typography>

      <Box sx={{ width: "90%", margin: "auto" }}>
        <CustomMenu
          setSelectedValue={(selectedValue) => filterNiche(selectedValue)}
          niches={listOfNiches}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {marketStore.jobs.map((j) => (
            <MarketCard
              key={j.id}
              title={j.title}
              introduction={j.introduction}
              viewDetail={() => viewDetail(j.id)}
            />
          ))}
        </Box>

        {pagination && (
          <Box>
            <Typography
              sx={{ textAlign: "center", fontSize: "14px", color: "gray" }}
            >
              {pagination.totalItems} active applicants
            </Typography>
            <Box sx={{ display: "flex" }}>
              <CustomPagination
                setCurrentPage={(page) => setOnPageChange(page)}
                totalPages={pagination!.totalPages}
              />
            </Box>
          </Box>
        )}
        {loading && (
          <LinearProgress color="primary" sx={{ marginTop: "50px" }} />
        )}
      </Box>
      <Footer />
    </MainLayout>
  );
};

export default observer(Main);
