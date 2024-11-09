import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <Box
      position="sticky"
      top="0"
      display="grid"
      justifyContent="space-between"
      alignItems="center"
      zIndex="99"
      bgcolor="white"
      p="10px 20px"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
    >
      <Box gridColumn="1">
        <Link to="/" style={{ textDecoration: "none", color: "#7241ff" }}>
          {" "}
          {/* Logo link with purple color */}
          <Typography variant="h6" fontWeight="bold">
            Logo
          </Typography>
        </Link>
      </Box>
      <Box
        gridColumn="2"
        display="flex"
        justifyContent="space-evenly"
        gap="30px"
      >
        <Link
          to="/hospitals"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            sx={{
              color: "#7241ff",
              "&:hover": {
                color: "#03B0FD",
              },
            }}
          >
            Hospitals
          </Typography>
        </Link>
        <Link to="/users" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography
            sx={{
              color: "#7241ff",
              "&:hover": {
                color: "#03B0FD",
              },
            }}
          >
            Users
          </Typography>
        </Link>
        <Link
          to="/patients"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            sx={{
              color: "#7241ff",
              "&:hover": {
                color: "#03B0FD",
              },
            }}
          >
            Patients
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default NavbarComponent;
