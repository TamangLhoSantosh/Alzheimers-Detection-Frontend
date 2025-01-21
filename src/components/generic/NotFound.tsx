import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" color="error" fontWeight="bold">
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
        Oops! The page you’re looking for doesn’t exist.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{ mt: 3 }}
        style={{ backgroundColor: "teal" }}
      >
        Go Back to Home
      </Button>
    </Box>
  );
};

export default NotFound;
