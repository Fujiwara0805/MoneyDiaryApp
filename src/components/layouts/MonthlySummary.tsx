import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const MonthlySummary = () => {
  return (
    <Grid container>
      <Grid item>
        <Card>
          <CardContent>
            <Stack>
              <ArrowUpwardIcon />
              <Typography>収入</Typography>
            </Stack>
            <Typography>¥300</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MonthlySummary;
