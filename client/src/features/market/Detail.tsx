import { Box, FormLabel, List, ListItemText, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import { ExternalLink } from "react-external-link";
import { toJS } from "mobx";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const { marketStore } = useStore();

  useEffect(() => {
    marketStore.getJobDetail(id);
  }, [marketStore]);

  console.log(toJS(marketStore.jobDetail));
  return (
    <>
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
      <Box
        sx={{
          padding: "90px",
          boxShadow: "#2D4263 0px 2px 8px 0px",
          width: "60%",
          margin: "40px auto ",
          minHeight: "70vh",
          marginTop: "40px",
          borderRadius: "2% 6% 5% 4% / 1% 1% 2% 4%",
          position: "relative",
          "&::after": {
            content: `''`,
            boxShadow: "#30475E 0px 2px 8px 0px",
            display: "block",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform:
              "translate3d(-50%, -50%, 0) scale(1.015) rotate(0.5deg) ",
            borderRadius: "1% 1% 2% 4% / 2% 6% 5% 4%",
          },
        }}
      >
        {Object.keys(marketStore.jobDetail).length > 0 && (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
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
            <Box
              sx={{
                width: "85%",
                margin: "20px auto",
                padding: "10px",
                marginTop: "20px",
              }}
            >
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
            <Box
              sx={{
                width: "85%",
                margin: "20px auto",
                padding: "10px",
                marginTop: "20px",
              }}
            >
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
                width: "85%",
                margin: "20px auto",
                padding: "10px",
                marginTop: "20px",
              }}
            >
              <FormLabel>Links to my works:</FormLabel>
              {marketStore.jobDetail.jobLinks.map((jl) => (
                <List
                  key={jl.id}
                  style={{
                    marginBottom: "10px",
                    borderRadius: "5px",
                    border: "1px solid lightgray",
                    color: "blue",
                    minWidth: "100px",
                    maxWidth: "400px",
                    marginRight: "5px",
                    marginTop: "20px",
                    textAlign: "center",
                  }}
                >
                  <ExternalLink href={jl.url}>
                    <ListItemText
                      primary={jl.url}
                      style={{ marginRight: "10px" }}
                    />
                  </ExternalLink>
                </List>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default observer(Detail);
