import { Box, Typography } from "@mui/material";

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
        <Typography>Hospitals</Typography>
        <Typography>Users</Typography>
        <Typography>Patients</Typography>
      </Box>
    </Box>
  );
};

export default NavbarComponent;
