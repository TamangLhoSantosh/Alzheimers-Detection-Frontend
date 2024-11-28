import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Modal,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetPatient, { PatientData } from "../../hooks/user/useGetPatients";
import MessageComponent from "../generic/MessageComponent";
import CreatePatient from "./CreatePatient";

const Patient = () => {
  const navigate = useNavigate();

  // State for managing the message component display
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [currentPatient, setCurrentPatient] = useState<PatientData | null>(
    null
  );

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

  // Function to handle clicking on a patient
  const handleClick = (patient: PatientData) => {
    navigate(`/patient/tests/${patient.id}`);
  };

  // Function to handle editing a patient
  const handleEdit = (patient: PatientData) => {
    setCurrentPatient(patient); // Set the selected patient for editing
    setShowForm(true); // Open the form
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
              onClick={() => handleClick(patient)}
              style={{ cursor: "pointer" }}
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
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEdit(patient)} // Open the form to edit the selected user
                sx={{ mt: 2 }}
              >
                Edit
              </Button>
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
          onClick={() => {
            setShowForm(true);
          }}
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

        {/* Create Hospital Form */}
        <Modal open={showForm} onClose={() => setShowForm(false)}>
          <Box
            display="flex"
            justifyContent="center"
            width="100%"
            overflow="hidden"
          >
            <CreatePatient
              onClose={() => {
                setShowForm(false);
                refetch();
                setCurrentPatient(null);
              }}
              patientData={currentPatient}
            />
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Patient;
