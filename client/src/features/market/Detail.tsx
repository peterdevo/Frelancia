import { Box, FormLabel, List, ListItemText, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import { ExternalLink } from "react-external-link";
import { toJS } from "mobx";
import MainLayout from "../../layout/MainLayout";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const { marketStore } = useStore();

  useEffect(() => {
    marketStore.getJobDetail(id);
  }, [marketStore]);

  return (
    <MainLayout>
      <Typography
        variant="h5"
        component="div"
        sx={{
          flexGrow: 1,
          fontFamily: "Righteous",
        }}
      >
        Frelancia
      </Typography>

      {Object.keys(marketStore.jobDetail).length > 0 && (
        <Box
          sx={{
            padding: "90px",
            width: "60%",
            margin: "40px auto ",
            minHeight: "70vh",
            marginTop: "40px",
            borderRadius: "2% 6% 5% 4% / 1% 1% 2% 4%",
            boxShadow: "#4479e1 0px 2px 8px 2px",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${marketStore.jobDetail.userPhoto})`,
                    width: "170px",
                    height: "170px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    marginBottom: "20px",
                  }}
                ></Box>

                <Typography>
                  {marketStore.jobDetail.firstName}
                  {marketStore.jobDetail.lastName}
                </Typography>
              </Box>
              <Box>
                <FormLabel>City:</FormLabel>
                <Typography>
                  {marketStore.jobDetail.city === ""
                    ? "..."
                    : marketStore.jobDetail.city}
                </Typography>
                <br></br>
                <FormLabel>State:</FormLabel>
                <Typography>
                  {marketStore.jobDetail.state === ""
                    ? "..."
                    : marketStore.jobDetail.state}
                </Typography>
              </Box>
              <Box>
                <FormLabel>Zipcode:</FormLabel>
                <Typography>
                  {marketStore.jobDetail.zipCode === ""
                    ? "..."
                    : marketStore.jobDetail.zipCode}
                </Typography>
                <br></br>
                <FormLabel>Country:</FormLabel>
                <Typography>
                  {marketStore.jobDetail.country === ""
                    ? "..."
                    : marketStore.jobDetail.country}
                </Typography>
              </Box>
              <Box>
                <FormLabel>Email:</FormLabel>
                <Typography>{marketStore.jobDetail.email}</Typography>
                <br></br>
                <FormLabel>Social contact:</FormLabel>
                <Typography>{marketStore.jobDetail.socialMedia}</Typography>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FormLabel>Focus area:</FormLabel>
                  <Typography sx={{ margin: "10px 10px" }}>
                    {marketStore.jobDetail.niche}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FormLabel>Languages:</FormLabel>
                  <Typography sx={{ margin: "10px 10px" }}>
                    {marketStore.jobDetail.language}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ margin: "20px 0px" }}>
                <FormLabel>About me:</FormLabel>
                <Typography>{marketStore.jobDetail.bio}</Typography>
              </Box>
            </Box>
            <Box>
              <FormLabel>My works:</FormLabel>

              <Box
                sx={{ margin: "20px 0px", display: "flex", flexWrap: "wrap" }}
              >
                {marketStore.jobDetail.photos.length > 0 &&
                  marketStore.jobDetail.photos.map((p, i) => (
                    <div
                      key={p.id}
                      style={{
                        backgroundImage: `url(${p.url})`,
                        width: "200px",
                        height: "200px",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        borderRadius: "10px",
                        margin: "10px 10px",
                      }}
                    ></div>
                  ))}
              </Box>
            </Box>

            <Box
              sx={{
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                padding: "10px",
              }}
            >
              <FormLabel>Links to my works:</FormLabel>
              <br></br>
              <Box sx={{display:"flex"}}>
                {marketStore.jobDetail.jobLinks.map((jl) => (
                  <ExternalLink href={jl.url}>
                    <ListItemText
                      primary={jl.url}
                      style={{
                        marginRight: "10px",
                        marginTop: "5px",
                        color: "white",
                        backgroundColor: "#4479e1",
                        display: "inline-block",
                        padding: "10px",
                        borderRadius: "10px",
                      }}
                    />
                  </ExternalLink>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </MainLayout>
  );
};

export default observer(Detail);
