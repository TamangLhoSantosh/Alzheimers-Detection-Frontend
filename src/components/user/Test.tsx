import { Box, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useGetTest from "../../hooks/user/useGetTest";

const Test = () => {
  const navigate = useNavigate();
  const { patientId, testId } = useParams();
  const { data: test } = useGetTest(patientId, testId);

  // Check if 'test' is an array or a single object
  const isArray = Array.isArray(test);
  const singleTest = isArray ? null : test; // Handle single test case

  // If test is an array and testId is present, show the first element
  const displayTest = isArray ? test[0] : singleTest;

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
      {displayTest && (
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
            <strong>Description:</strong> {displayTest.description || "N/A"}
          </Typography>
          <Typography variant="body1">
            <strong>Result:</strong> {displayTest.result || "Pending"}
          </Typography>

          {/* Display Image if available */}
          {displayTest?.test_images?.[0]?.image_url && (
            <Box mt={2}>
              <img
                src={`http://localhost:8000/${displayTest.test_images[0].image_url}`}
                alt={`Test Result for ${testId}`}
                style={{ maxWidth: "100%", borderRadius: "10px" }}
              />
            </Box>
          )}
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
