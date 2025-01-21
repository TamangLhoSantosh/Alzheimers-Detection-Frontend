import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const NotAuthorized = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="grey.100"
      p={2}
    >
      <Typography
        variant="h3"
        sx={{ color: "#7241FF", fontWeight: "bold" }}
        gutterBottom
      >
        The content is not available yet.
      </Typography>
      <Typography variant="body1" sx={{ color: "grey.700" }} gutterBottom>
        This happens because you do not have enough access level.
      </Typography>
      <Button
        component={Link}
        to="/login"
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: "#03B0FD",
          color: "white",
        }}
      >
        Go Back to Home
      </Button>
    </Box>
  );
};

export default NotAuthorized;
