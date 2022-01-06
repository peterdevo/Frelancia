import { Box } from "@mui/material";

interface IProps {
  children: any;
}
const MainLayout = ({ children }: IProps) => {
  return <Box style={{ padding:"20px" }}>{children}</Box>;
};

export default MainLayout;
