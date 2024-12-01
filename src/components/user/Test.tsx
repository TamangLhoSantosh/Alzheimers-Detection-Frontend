import { Box, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useGetTest from "../../hooks/user/useGetTest";

const Test = () => {
  const navigate = useNavigate();
  const { patientId, testId } = useParams();
  const { data: test } = useGetTest(patientId, testId);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: "#03B0FD", mb: 4 }}
      >
        Test {testId}
      </Typography>

      {/* Show test details */}
      {test && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          mt={4}
          p={2}
          sx={{
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Test Details
          </Typography>
          <Typography variant="body1">
            <strong>Description:</strong> {test.description || "N/A"}
          </Typography>
          <Typography variant="body1">
            <strong>Result:</strong> {test.result || "Pending"}
          </Typography>
        </Box>
      )}

      <Box mt={4} display="flex" gap={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{
            backgroundColor: "#7241FF",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          Go Back
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#7241FF",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          Upload Image
        </Button>
      </Box>
    </Box>
  );
};

export default Test;
