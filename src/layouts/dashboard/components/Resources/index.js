// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SimCardOutlinedIcon from "@mui/icons-material/SimCardOutlined";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[100]),
  backgroundColor: blue[100],
  "&:hover": {
    backgroundColor: blue[200],
  },
}));

function Resources() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3} pb={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Resources
        </MDTypography>
        <Divider />
        <ColorButton
          variant="contained"
          fullWidth
          size="large"
          justifyContent="left"
          sx={{ justifyContent: "left" }}
          startIcon={<AccountCircleOutlinedIcon sx={{ mr: 1 }} />}
        >
          Profile
        </ColorButton>
        &nbsp;
        <ColorButton
          variant="contained"
          fullWidth
          size="large"
          sx={{ justifyContent: "left" }}
          startIcon={<SimCardOutlinedIcon sx={{ mr: 1 }} />}
        >
          Customized Career Plan
        </ColorButton>
      </MDBox>
    </Card>
  );
}

export default Resources;
