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

import { FaSquare, FaCheckSquare, FaMinusSquare } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import TreeView, { flattenTree } from "react-accessible-treeview";
import cx from "classnames";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

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
        {
          name: "T",
          children: [
            { name: "Black Tea" },
            { name: "Green Tea" },
            { name: "Red Tea" },
            { name: "Matcha" },
          ],
        },
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

const chartData = {
  labels: ["To Do", "Completed"],
  datasets: [
    {
      label: "Plan Completed",
      data: [75, 25],
      backgroundColor: [
        // "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        // "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  cutout: 90, // Adjust the size of the hole in the center
  responsive: true,
};

function careerPlan() {
  const { user } = useAuth0();

  // Get Data for Overview Page
  const [careerData, setCareerData] = useState(null);

  useEffect(() => {
    document
      .querySelectorAll("li.tree-leaf-list-item")
      .forEach((el) => (el.style.display = "block"));
    document
      .querySelectorAll("ul li.tree-branch-wrapper")
      .forEach((el) => (el.style.display = "block"));
    const fetchCareerData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/career`,
          {
            email: user.email,
          }
        );
        setCareerData(response.data);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      }
    };

    fetchCareerData();
  }, [user.email]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
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
                icon="calendar_month"
                title="Timeline"
                count="1 Month"
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
                {careerData?.data}
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
                      document
                        .querySelectorAll("li.tree-leaf-list-item")
                        .forEach((el) => (el.style.display = "block"));
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
      <MDBox py={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h6">Recommended Courses</MDTypography>
                <Divider />
                <MDBox>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                      <iframe
                        width="260"
                        height="160"
                        src={`https://www.youtube.com/embed/${careerData?.recommended_videos[0]}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                      <iframe
                        width="260"
                        height="160"
                        src={`https://www.youtube.com/embed/${careerData?.recommended_videos[1]}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                      <iframe
                        width="260"
                        height="160"
                        src={`https://www.youtube.com/embed/${careerData?.recommended_videos[2]}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                      <iframe
                        width="260"
                        height="160"
                        src={`https://www.youtube.com/embed/${careerData?.recommended_videos[3]}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

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
