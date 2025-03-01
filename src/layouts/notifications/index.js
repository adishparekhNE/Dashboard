import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Divider } from "@mui/material";

function Notifications() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="playlist_add_check"
                title="Plan Status"
                count="In Progress"
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="calendar_month"
                title="Timeline"
                count="1 Year"
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="business_center"
                title="Goal"
                count="UX Designer"
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={12}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h6">Career Trajectory</MDTypography>
                <Divider />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox py={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={7}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h6">Action Plan</MDTypography>
                <Divider />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h6">Progress Tracker</MDTypography>
                <Divider />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
