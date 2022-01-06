import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

interface IProps {
  title?: string;
  introduction?: string;
  viewDetail:()=>void
}
const MarketCard = ({ title, introduction,viewDetail }: IProps) => {
  return (
    <Card sx={{ width: "300px",height: "300px",cursor:"none",marginRight:"20px",marginBottom:"20px" }}>
      <CardActionArea >
        <Box
          sx={{
            backgroundColor:"rgb(253, 193, 193)",
            width: "100%",
            height: "70px",
          }}
        ></Box>
        <CardContent>
          <Typography gutterBottom >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{minHeight:"100px"}}>
            {introduction}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{display:"flex",justifyContent:"space-between"}}>
        <Button size="small" color="primary" onClick={viewDetail}  >
          View profile
        </Button>
        <Button size="small" color="primary" >
          Contact
        </Button>
      </CardActions>
    </Card>
  );
};

export default MarketCard;
