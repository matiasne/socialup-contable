import React from "react";
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavbarBusiness } from "./navbarBusiness/navbarBusiness";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";

export const DashboardBusiness = () => {
  function createData(time: string, amount?: number) {
    return { time, amount };
  }

  const data = [
    createData("00:00", 0),
    createData("03:00", 300),
    createData("06:00", 600),
    createData("09:00", 800),
    createData("12:00", 1500),
    createData("15:00", 2000),
    createData("18:00", 2400),
    createData("21:00", 2400),
    createData("24:00", undefined),
  ];

  return (
    <div>
      <NavbarBusiness />
      <Grid container>
        <Grid item xs={7}></Grid>
        <Grid item xs={5}>
          <LineChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis dataKey="time" />
            <YAxis>
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: "middle",
                }}
              >
                Sales ($)
              </Label>
            </YAxis>
            <Line
              isAnimationActive={false}
              type="monotone"
              dataKey="amount"
              dot={false}
            />
          </LineChart>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}></Grid>
      </Grid>
    </div>
  );
};
