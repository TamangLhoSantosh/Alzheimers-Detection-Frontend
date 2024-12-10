import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Modal,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetTest from "../../hooks/user/useGetTest";
import CreateTest from "./CreateTest";

const TestList = () => {
  const { patientId } = useParams();
  const { data: tests, isLoading, error, refetch } = useGetTest(patientId, "");

  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      {/* Header */}
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        sx={{ color: "#03B0FD" }}
      >
        Tests for Patient
      </Typography>

      {/* Test List Section */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gap={2}
        width="100%"
        maxWidth={800}
      >
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress sx={{ color: "#03B0FD", size: 50 }} />
          </Box>
        ) : error ? (
          <Snackbar open={!!error} message={error} autoHideDuration={3000} />
        ) : Array.isArray(tests) && tests.length === 0 ? (
          <Typography variant="body1" sx={{ color: "#B0D9FF" }}>
            No tests available for this patient.
          </Typography>
        ) : Array.isArray(tests) ? (
          tests.map((test, index) => (
            <Box
              key={index}
              p={2}
              borderRadius="8px"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
              onClick={() => navigate(`/patient/tests/${patientId}/${test.id}`)}
              style={{ cursor: "pointer" }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#03B0FD", marginBottom: 1 }}
              >
                Test {index + 1}
              </Typography>
              <Typography variant="body1" sx={{ color: "#7241FF" }}>
                Description: {test.description}
              </Typography>
              <Typography variant="body1" sx={{ color: "#03B0FD" }}>
                Result: {test.result || "Pending"}
              </Typography>
            </Box>
          ))
        ) : null}
      </Box>

      {/* Actions Section */}
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
          color="primary"
          onClick={() => setShowForm(true)}
          sx={{
            backgroundColor: "#03B0FD",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          Create Test
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => refetch()}
          sx={{
            backgroundColor: "#7241FF",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          Refetch
        </Button>
      </Box>

      {/* Create Test Form */}
      <Modal open={showForm} onClose={() => setShowForm(false)}>
        <Box
          display="flex"
          justifyContent="center"
          width="100%"
          overflow="hidden"
        >
          <CreateTest
            onClose={() => {
              setShowForm(false);
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default TestList;
