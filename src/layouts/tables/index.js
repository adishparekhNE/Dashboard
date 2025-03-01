// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Tables() {
  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log(event.target.value);
    if (event.target.value) {
      window.sessionStorage.setItem("Transition Role", event.target.value);
      navigate("/overview");
    }
  };

  const styles = {
    padding: "10px",
    margin: "0 auto",
  };

  const input = {
    padding: "10px",
  };

  const label = {
    padding: "10px",
  };

  useEffect(() => {
    document.querySelector(".MuiPaper-root").style.visibility = "hidden";
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Select the Role you want to Transition to
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <FormControl fullWidth style={styles}>
                  <InputLabel id="demo-simple-select-label" styel={label}>
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="simple-select"
                    value=""
                    label="Transition Role"
                    onChange={handleChange}
                    style={input}
                  >
                    <MenuItem value={"Software Engineer"}>
                      Software Engineer
                    </MenuItem>
                    <MenuItem value={"Project Manager"}>
                      Project Manager
                    </MenuItem>
                    <MenuItem value={"UX Designer"}>UX Designer</MenuItem>
                    <MenuItem value={"Senior Software Engineer"}>
                      Senior Software Engineer
                    </MenuItem>
                  </Select>
                </FormControl>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
