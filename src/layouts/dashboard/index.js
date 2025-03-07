// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard components
import MDBox from "components/MDBox";
import { Divider } from "@mui/material";

// Material Dashboard components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal";

// Dashboard components
import Learnings from "layouts/dashboard/components/Learnings";
import Resources from "layouts/dashboard/components/Resources";
import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";

function Dashboard() {
  const { user } = useAuth0();

  const timestamp = Date.now();
  const date = new Date(timestamp);

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  // Logic for Stepper
  const steps = [
    { title: "Week 1 " },
    { title: "Week 2" },
    { title: "Week 3" },
    { title: "Week 4" },
  ];

  const [activeStep, setActiveStep] = useState(0);

  function Milestone1() {
    return <h2>Week 1</h2>;
  }

  function Milestone2() {
    return <h2>Week 2</h2>;
  }

  function Milestone3() {
    return <h2>Week 3</h2>;
  }

  function Milestone4() {
    return <h2>Week 4</h2>;
  }

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return <Milestone1 />;
      case 1:
        return <Milestone2 />;
      case 2:
        return <Milestone3 />;
      case 3:
        return <Milestone4 />;
      default:
        return null;
    }
  }

  // Get Data for Overview Page
  const [overviewData, setOverviewData] = useState(null);

  useEffect(() => {
    document.querySelector(".MuiPaper-root").style.visibility = "visible";

    const fetchOverview = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/overview`,
          {
            email: user.email,
          }
        );
        setOverviewData(response.data);
        sessionStorage.setItem("current_job", response.data.current_job);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      }
    };

    fetchOverview();
  }, [user.email]);

  getSectionComponent();

  const formattedDate = date.toLocaleDateString("en-US", options);

  const transitionRole = window.sessionStorage.getItem("Transition Role");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTypography variant="h5" fontWeight="medium">
        Welcome, {user.name}!
      </MDTypography>
      <MDTypography variant="button" color="text" fontWeight="regular">
        {formattedDate}
      </MDTypography>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="business_center_icon"
                title="Transition Role"
                count={transitionRole}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="business_center_icon"
                title="Current Role"
                count={overviewData?.current_job}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Plan Status"
                count="Week 1"
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox py={1}>
          <Grid container spacing={3}>
            <Grid item xs={11} md={11} lg={11}>
              <Card>
                <MDBox p={2}>
                  <MDTypography variant="h6">Milestones</MDTypography>
                  <Divider />
                  <Stepper steps={steps} activeStep={activeStep} />
                  <div style={{ padding: "20px" }}>
                    {/* {getSectionComponent()} */}
                    {/* {activeStep !== 0 && activeStep !== steps.length - 1 && (
                      <button onClick={() => setActiveStep(activeStep - 1)}>
                        Previous
                      </button>
                    )}
                    {activeStep !== steps.length - 1 && (
                      <button onClick={() => setActiveStep(activeStep + 1)}>
                        Next
                      </button>
                    )}
                    {activeStep === steps.length - 1} (
                    <button onClick={() => setActiveStep(4)}>Reset</button>) */}
                  </div>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={7}>
              <Learnings data={overviewData?.recommended_videos} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Resources />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
