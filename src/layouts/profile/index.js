// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";

import { useAuth0 } from "@auth0/auth0-react";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Overview() {
  const { user } = useAuth0();

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
                        Software Engineer
                      </MDTypography>
                      <MDTypography
                        variant="h6"
                        color="text"
                        fontWeight="regular"
                      >
                        IT
                      </MDTypography>
                      <MDTypography
                        variant="h6"
                        color="text"
                        fontWeight="regular"
                      >
                        B.Tech in Computer Science
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
                        IT
                      </MDTypography>
                      <MDTypography
                        variant="h6"
                        color="text"
                        fontWeight="regular"
                      >
                        B.Tech in Computer Science
                      </MDTypography>
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Projects
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Architects design houses
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor1}
                label="project #2"
                title="modern"
                description="As Uber works through a huge amount of internal management turmoil."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                // authors={[
                //   { image: team1, name: "Elena Morison" },
                //   { image: team2, name: "Ryan Milly" },
                //   { image: team3, name: "Nick Daniel" },
                //   { image: team4, name: "Peterson" },
                // ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor2}
                label="project #1"
                title="scandinavian"
                description="Music is something that everyone has their own specific opinion about."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor3}
                label="project #3"
                title="minimalist"
                description="Different people have different taste, and various types of music."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor4}
                label="project #4"
                title="gothic"
                description="Why would anyone pick blue over pink? Pink is obviously a better color."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
