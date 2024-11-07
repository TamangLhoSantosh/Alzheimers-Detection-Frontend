import { Box, Typography } from "@mui/material";
import CreateHospital from "./CreateHospital";

const Hospital = () => {
  return (
    <Box display="flex">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Hospital
      </Typography>
      <Box>
        <CreateHospital />
      </Box>
    </Box>
  );
};

export default Hospital;
