import { Box, Container, Grid, useTheme } from "@mui/material";
import Header from "../components/header";
import React from "react";
import { postApi } from "../utilis/postApi";
import BoxContain from "../components/home/box_contain";
import {
  ShoppingCart, // Assuming this icon for orders
  Campaign, // Assuming this icon for campaigns
  Storefront, // Assuming this icon for products
  PeopleAltRounded, // Using for users
  AdminPanelSettings, // Using for admins
} from "@mui/icons-material";

const Home = () => {
  const theme = useTheme();
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await postApi("/statistics");
      setData(res[0]);
    };
    fetchData();
  }, []);

  return (
    <Box className="homePage">
      <Container>
        <Box className="report_box" sx={{ mb: 8, mt: 2 }}>
          <Header title="Users and Admins" />
          <Grid container spacing={2}>
            <BoxContain
              title="Users"
              borderColor={theme.palette.blue}
              count={data.users}
              icon={
                <PeopleAltRounded
                  sx={{ color: theme.palette.blue, fontSize: "25px" }}
                />
              }
            />
            <BoxContain
              title="Admins"
              borderColor={theme.palette.green}
              count={data.admins}
              icon={
                <AdminPanelSettings
                  sx={{ color: theme.palette.green, fontSize: "25px" }}
                />
              }
            />
          </Grid>
        </Box>

        <Box className="report_box" sx={{ mb: 8, mt: 2 }}>
          <Header title="Orders" />
          <Grid container spacing={2}>
            <BoxContain
              title="New Orders"
              borderColor={theme.palette.orange}
              count={data.new_orders}
              icon={
                <ShoppingCart
                  sx={{ color: theme.palette.orange, fontSize: "25px" }}
                />
              }
            />
            <BoxContain
              title="Under Process"
              borderColor={theme.palette.purple}
              count={data.under_process_orders}
              icon={
                <ShoppingCart
                  sx={{ color: theme.palette.purple, fontSize: "25px" }}
                />
              }
            />
            <BoxContain
              title="Cancelled Orders"
              borderColor={theme.palette.red}
              count={data.cancelled_orders}
              icon={
                <ShoppingCart
                  sx={{ color: theme.palette.red, fontSize: "25px" }}
                />
              }
            />
          </Grid>
        </Box>

        <Box className="report_box" sx={{ mb: 8, mt: 2 }}>
          <Header title="Campaigns and Products" />
          <Grid container spacing={2}>
            <BoxContain
              title="Active Campaigns"
              borderColor={theme.palette.yellow}
              count={data.active_campigns}
              icon={
                <Campaign
                  sx={{ color: theme.palette.yellow, fontSize: "25px" }}
                />
              }
            />
            <BoxContain
              title="Finished Campaigns"
              borderColor={theme.palette.grey}
              count={data.finished_campigns}
              icon={
                <Campaign
                  sx={{ color: theme.palette.grey, fontSize: "25px" }}
                />
              }
            />
            <BoxContain
              title="Products"
              borderColor={theme.palette.teal}
              count={data.products}
              icon={
                <Storefront
                  sx={{ color: theme.palette.teal, fontSize: "25px" }}
                />
              }
            />
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
