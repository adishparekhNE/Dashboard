import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Divider from "@mui/material/Divider";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/Projects/data";

import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";

function Projects() {
  const { columns, rows } = data();
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Continue Learning
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>2 in Progress</strong> this month
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} xl={6}>
            <DefaultProjectCard
              image={homeDecor1}
              label="Programming with Mosh"
              title="Javascript Course for Beginners"
              description="Learn JavaScript basics with this quick, beginner-friendly course! ⚡ Perfect for new coders ready to build real skills and start programming with confidence."
              action={{
                type: "internal",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <DefaultProjectCard
              image={homeDecor2}
              label="Programming with Mosh"
              title="Javascript Course for Beginners"
              description="Learn JavaScript basics with this quick, beginner-friendly course! ⚡ Perfect for new coders ready to build real skills and start programming with confidence."
              action={{
                type: "internal",
              }}
            />
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default Projects;
