import { Box, Button } from "@mui/material";
import React from "react";

const DateSelector = () => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}
    >
      <Button color="error" variant="contained">
        先月
      </Button>
      <div>日付</div>
      <Button color="primary" variant="contained">
        今月
      </Button>
    </Box>
  );
};

export default DateSelector;
