import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Niche } from "../../models/Niche";

interface IProps {
  niches?: Niche[];
}
const CustomMenu = ({ niches }: IProps) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <FormControl
      sx={{ width: "150px",margin:"40px 0px", border: "1px solid white", outline: "none" }}
    >
      <InputLabel id="demo-simple-select-label">Niche</InputLabel>
      <Select
        IconComponent={FilterListIcon}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        {niches!.length > 0 &&
          niches?.map((n) => <MenuItem key={n.id} value={n.id}>{n.title}</MenuItem>)}
      </Select>
    </FormControl>
  );
};
export default CustomMenu;
