import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <Box
      position="fixed"
      top="0"
      display="grid"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      zIndex="99"
    >
      <Box gridColumn="1" p="20px">
        Logo
      </Box>
      <Box
        gridColumn="2"
        p="20px"
        display="flex"
        justifyContent="space-evenly"
        gap="30px"
      >
        <Link
          to="/hospitals"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography>Hospitals</Typography>
        </Link>
        <Link to="/users" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography>Users</Typography>
        </Link>
        <Link
          to="/patients"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography>Patients</Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default NavbarComponent;
