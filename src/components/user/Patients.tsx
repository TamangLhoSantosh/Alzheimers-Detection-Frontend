import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import useGetPatient from "../../hooks/user/useGetPatients";
import MessageComponent from "../generic/MessageComponent";

const Patient = () => {
  // State for managing the message component display
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  // Fetch patients data
  const { data: patients, isLoading, error, refetch } = useGetPatient();

  // Handle error and display message component
  if (error) {
    setShowMessage(true);
    setTitle("Error");
    setMessage("Failed to fetch patients. Please try again later.");
  }

  // Function to close the message component
  const closeMessage = () => {
    setMessage("");
    setTitle("");
    setShowMessage(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      {/* Header Section */}
      <Typography
        variant="h4"
        fontWeight="bold"
        p={10}
        sx={{ color: "#03B0FD" }}
      >
        Patients
      </Typography>

      {/* Patient List Section */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gap={2}
        alignItems="center"
      >
        {isLoading ? (
          // Pulsar Loading Animation
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress
              sx={{
                color: "#03B0FD",
                animation: "pulsar 1.5s infinite",
                size: 50,
              }}
            />
          </Box>
        ) : (patients ?? []).length === 0 ? (
          // No Patients Found
          <Typography variant="body1" sx={{ color: "#B0D9FF" }}>
            No patients found
          </Typography>
        ) : (
          // Displaying Patients
          (patients ?? []).map((patient, index) => (
            <Box
              key={index}
              mb={4}
              p={2}
              borderRadius="8px"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#03B0FD", display: "flex", alignItems: "center" }}
              >
                {patient.first_name} {patient.middle_name} {patient.last_name}
              </Typography>
              <Typography variant="body1" sx={{ color: "#7241FF" }}>
                Contact: {patient.contact || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#03B0FD" }}>
                Gender: {patient.gender || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#7241FF" }}>
                Address: {patient.address}
              </Typography>
            </Box>
          ))
        )}
      </Box>

      {/* Actions Section */}
      <Box display="flex" justifyContent="center" gap={10}>
        {/* Refresh Data Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => refetch()}
          sx={{
            backgroundColor: "#7241FF",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          Refresh Data
        </Button>
        {/* Add Patient Button Placeholder */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {}}
          sx={{
            backgroundColor: "#03B0FD",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          Add Patient
        </Button>
        {/* Display Message Component */}
        {showMessage && (
          <MessageComponent
            title={title}
            message={message}
            onClose={closeMessage}
          />
        )}
      </Box>
    </Box>
  );
};

export default Patient;
