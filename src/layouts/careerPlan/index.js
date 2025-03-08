/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

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
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

import { FaSquare, FaCheckSquare, FaMinusSquare } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import TreeView, { flattenTree } from "react-accessible-treeview";
import cx from "classnames";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

// Styled components
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#2f88ec",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: "#fff",
  fontWeight: "500",
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[900]),
  backgroundColor: blue[900],
  "&:hover": {
    backgroundColor: blue[900],
  },
}));

// TreeView data
const folder = {
  name: "",
  children: [
    {
      name: "Week 1",
      children: [
        { name: "Explore Figma as a Software" },
        { name: "Open tool option" },
        { name: "Make a template of Size" },
        { name: "Add Images" },
        { name: "Quiz" },
      ],
    },
    {
      name: "Week 2",
      children: [
        { name: "Learn to Wireframe" },
        { name: "Explore the Figma tool for 30 minutes" },
        { name: "UX Design Fundamentals" },
      ],
    },
    {
      name: "Week 3",
      children: [
        { name: "Beets" },
        { name: "Carrots" },
        { name: "Celery" },
        { name: "Lettuce" },
        { name: "Onions" },
      ],
    },
    {
      name: "Week 4",
      children: [
        { name: "Beets" },
        { name: "Carrots" },
        { name: "Celery" },
        { name: "Lettuce" },
        { name: "Onions" },
      ],
    },
  ],
};

const data = flattenTree(folder);

// Doughnut chart data and options
const chartData = {
  labels: ["To Do", "Completed"],
  datasets: [
    {
      label: "Plan Completed",
      data: [75, 25],
      backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
      borderWidth: 1,
    },
  ],
};

const options = {
  cutout: 90, // Adjust the size of the hole in the center
  responsive: true,
};

// Main component
function careerPlan() {
  const { user } = useAuth0();
  const [careerData, setCareerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch career data on mount or when user.email changes
  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/career`,
          {
            email: user.email,
            transition_role: sessionStorage.getItem("Transition Role"),
          }
        );
        setCareerData(response.data);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareerData();
  }, [user.email]);

  // Render loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          <div>Loading...</div>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  // Process career trajectory data
  const trajectoryData = careerData?.career_path
    ? careerData.career_path.split(",")
    : [];

  // Main render
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* Current Role, Transition Role, and Timeline Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="business_center_icon"
                title="Current Role"
                count={sessionStorage.getItem("current_job")}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="business_center"
                title="Transition Role"
                count={sessionStorage.getItem("Transition Role")}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="calendar_month"
                title="Timeline"
                count="1 Month"
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      {/* Career Trajectory */}
      <MDBox>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={12}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h6">Career Trajectory</MDTypography>
                <Divider />
                <Stack direction="row" spacing={2}>
                  {trajectoryData.length > 0 ? (
                    trajectoryData.map((option) => (
                      <Item key={option}>{option}</Item>
                    ))
                  ) : (
                    <Item>No data available</Item>
                  )}
                </Stack>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* Action Plan and Progress Tracker */}
      <MDBox py={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={7}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h6">Action Plan</MDTypography>
                <Divider />
                <div className="checkbox">
                  <TreeView
                    data={data}
                    aria-label="Checkbox tree"
                    multiSelect
                    propagateSelect
                    propagateSelectUpwards
                    togglableSelect
                    nodeRenderer={({
                      element,
                      isBranch,
                      isExpanded,
                      isSelected,
                      isHalfSelected,
                      getNodeProps,
                      level,
                      handleSelect,
                      handleExpand,
                    }) => {
                      return (
                        <div
                          {...getNodeProps({ onClick: handleExpand })}
                          style={{ marginLeft: 40 * (level - 1) }}
                        >
                          {isBranch && <ArrowIcon isOpen={isExpanded} />}
                          <CheckBoxIcon
                            className="checkbox-icon"
                            onClick={(e) => {
                              handleSelect(e);
                              e.stopPropagation();
                            }}
                            variant={
                              isHalfSelected
                                ? "some"
                                : isSelected
                                ? "all"
                                : "none"
                            }
                          />
                          <span className="name">{element.name}</span>
                        </div>
                      );
                    }}
                  />
                </div>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h6">Progress Tracker</MDTypography>
                <Divider />
                <Doughnut data={chartData} options={options} />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* Recommended Courses */}
      <MDBox py={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h6">Recommended Courses</MDTypography>
                <Divider />
                <MDBox>
                  <Grid container spacing={3}>
                    {careerData?.recommended_videos &&
                    Array.isArray(careerData.recommended_videos) ? (
                      careerData.recommended_videos
                        .slice(0, 4)
                        .map((videoId, index) => (
                          <Grid item xs={12} md={6} lg={3} key={index}>
                            <iframe
                              width="260"
                              height="160"
                              src={`https://www.youtube.com/embed/${videoId}`}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            ></iframe>
                          </Grid>
                        ))
                    ) : (
                      <Grid item xs={12}>
                        <Item>No recommended videos available</Item>
                      </Grid>
                    )}
                  </Grid>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* Action Buttons */}
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3.5}>
            <ColorButton
              variant="contained"
              fullWidth
              size="large"
              sx={{ justifyContent: "center" }}
              endIcon={<FileDownloadOutlinedIcon />}
              onClick={() => console.log("Downloaded")}
            >
              Download Plan
            </ColorButton>
          </Grid>
          <Grid item xs={12} md={6} lg={2.5}>
            <ColorButton
              variant="contained"
              fullWidth
              size="large"
              sx={{ justifyContent: "center" }}
              endIcon={<EditNoteOutlinedIcon />}
            >
              Edit Plan
            </ColorButton>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

// TreeView helper components
const ArrowIcon = ({ isOpen, className }) => {
  const baseClass = "arrow";
  const classes = cx(
    baseClass,
    { [`${baseClass}--closed`]: !isOpen },
    { [`${baseClass}--open`]: isOpen },
    className
  );
  return <IoMdArrowDropright className={classes} />;
};

const CheckBoxIcon = ({ variant, ...rest }) => {
  switch (variant) {
    case "all":
      return <FaCheckSquare {...rest} />;
    case "none":
      return <FaSquare {...rest} />;
    case "some":
      return <FaMinusSquare {...rest} />;
    default:
      return null;
  }
};

export default careerPlan;
