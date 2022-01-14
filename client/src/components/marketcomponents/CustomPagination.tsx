import * as React from "react";
import Pagination from "@mui/material/Pagination";

interface IProps {
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const CustomPagination = ({ totalPages, setCurrentPage }: IProps) => {
  const onChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (  
    <Pagination
      sx={{ margin:"20px auto",padding:"10px"}}
      size="large"
      onChange={onChange}
      count={totalPages}
      color="primary"
    />
  );
};

export default CustomPagination;
