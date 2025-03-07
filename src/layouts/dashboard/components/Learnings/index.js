// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Learnings(props) {
  const data = props?.data;

  // Check if data is undefined, not an array, or doesn't have at least 2 elements
  if (!data || !Array.isArray(data) || data.length < 2) {
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
                &nbsp;<strong>2 in Progress</strong> this week
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <MDTypography variant="body2" color="text">
            No courses available at this time.
          </MDTypography>
        </MDBox>
      </Card>
    );
  }

  // Render iframes only if data is valid
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
              &nbsp;<strong>2 in Progress</strong> this week
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} xl={6}>
            <iframe
              width="281"
              height="160"
              src={`https://www.youtube.com/embed/${data[0]}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <iframe
              width="281"
              height="160"
              src={`https://www.youtube.com/embed/${data[1]}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default Learnings;
