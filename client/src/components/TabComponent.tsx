import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
const TabComponent = () => {
  const [value, setValue] = React.useState("one");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%",display:"flex",alignItems:"center",justifyContent:"space-evenly",backgroundColor:"#DFAAAA" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        style={{color:"whitesmoke"}}
        textColor="inherit"
        indicatorColor="secondary"
        
      >
        <Tab value="one" label="Account setting" />
        <Tab value="two" label="Job profile" />
        <Tab value="three" label="Job" />
        
      </Tabs>
    </Box>
  );
};

export default TabComponent;
