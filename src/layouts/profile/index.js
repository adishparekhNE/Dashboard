// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Fab from "@mui/material/Fab";

// Overview page components
import Header from "layouts/profile/components/Header";

import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Overview() {
  const { user } = useAuth0();

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    document.querySelector(".MuiPaper-root").style.visibility = "visible";

    const fetchOverview = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/profile`,
          {
            email: user.email,
          }
        );
        console.log("PROFILE:::", response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      }
    };

    fetchOverview();
  }, [user.email]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <MDBox p={2} lineHeight={0}>
                  <MDTypography variant="h5">General Information</MDTypography>
                  <Divider />
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                      <MDTypography variant="h6" fontWeight="regular">
                        CURRENT ROLE:
                      </MDTypography>
                      <MDTypography variant="h6" fontWeight="regular">
                        DEPARTMENT:
                      </MDTypography>
                      <MDTypography variant="h6" fontWeight="regular">
                        EDUCATION:
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={8}>
                      <MDTypography
                        variant="h6"
                        color="text"
                        fontWeight="regular"
                      >
                        {profileData?.current_job}
                      </MDTypography>
                      <MDTypography
                        variant="h6"
                        color="text"
                        fontWeight="regular"
                      >
                        {profileData?.department}
                      </MDTypography>
                      <MDTypography
                        variant="h6"
                        color="text"
                        fontWeight="regular"
                      >
                        {profileData?.education}
                      </MDTypography>
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <MDBox p={2} lineHeight={0}>
                  <MDTypography variant="h5">Contact Information</MDTypography>
                  <Divider />
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                      <MDTypography variant="h6" fontWeight="regular">
                        EMAIL ADDRESS:
                      </MDTypography>
                      <MDTypography variant="h6" fontWeight="regular">
                        PHONE NUMBER:
                      </MDTypography>
                      <MDTypography variant="h6" fontWeight="regular">
                        HOME ADDRESS:
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={8}>
                      <MDTypography
                        variant="h6"
                        color="text"
                        fontWeight="regular"
                      >
                        {user.email}
                      </MDTypography>
                      <MDTypography
                        variant="h6"
                        color="text"
                        fontWeight="regular"
                      >
                        +1{profileData?.phone}
                      </MDTypography>
                      <MDTypography
                        variant="h6"
                        color="text"
                        fontWeight="regular"
                      >
                        {profileData?.address}
                      </MDTypography>
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={1} mb={3} lineHeight={1.25}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Card>
                <MDBox p={2} lineHeight={0}>
                  <MDTypography variant="h5">Skill Sets</MDTypography>
                  <Divider />
                  {profileData?.skills.map((label, index) => (
                    <Fab
                      variant="extended"
                      key={index}
                      size="medium"
                      color="primary"
                      sx={{ mr: 1 }}
                    >
                      {label}
                    </Fab>
                  ))}
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={1} mb={3} lineHeight={1.25}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Card>
                <MDBox p={2} lineHeight={0}>
                  <MDTypography variant="h5">Personality Traits</MDTypography>
                  <Divider />
                  {profileData?.personality_traits.map((label, index) => (
                    <Fab
                      variant="extended"
                      key={index}
                      size="medium"
                      color="success"
                      sx={{ mr: 1 }}
                    >
                      {label}
                    </Fab>
                  ))}
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
