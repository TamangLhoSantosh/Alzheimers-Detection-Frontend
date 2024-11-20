import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import CreateHospital from "./CreateHospital";
import MessageComponent from "../generic/MessageComponent";
import useGetHospital, {
  HospitalData,
} from "../../hooks/admin/useGetHospitals";

const Hospital = () => {
  // State to toggle form visibility
  const [showForm, setShowForm] = useState(false);

  // State to hold the currently selected hospital for editing
  const [currentHospital, setCurrentHospital] = useState<HospitalData | null>(
    null
  );

  // State for managing feedback messages
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  // Fetch hospital data from the custom hook
  const {
    data: hospitals,
    isLoading: loading,
    error,
    refetch,
  } = useGetHospital();

  // Handle errors and display a message component using useEffect
  useEffect(() => {
    if (error) {
      setShowMessage(true);
      setTitle("Error");
      setMessage("Failed to fetch hospitals. Please try again later.");
    }
  }, [error]); // Runs only when `error` changes

  // Function to close the message component
  const closeMessage = () => {
    setMessage("");
    setTitle("");
    setShowMessage(false);
  };

  // Function to handle editing a hospital
  const handleEdit = (hospital: HospitalData) => {
    setCurrentHospital(hospital); // Set the selected hospital for editing
    setShowForm(true); // Open the form
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      {/* Header Section */}
      <Typography
        variant="h4"
        fontWeight="bold"
        p={10}
        style={{ color: "#03B0FD" }}
      >
        Hospital Information
      </Typography>

      {/* Hospital List Section */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)" // Arrange hospitals in a 3-column grid
        gap={2}
        alignItems="center"
      >
        {loading ? (
          // Display circular loading spinner while data is being fetched
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="200px"
          >
            <CircularProgress style={{ color: "#03B0FD" }} />
          </Box>
        ) : (hospitals ?? []).length === 0 ? (
          // Display message when no hospitals are found
          <Typography variant="body1" style={{ color: "#B0D9FF" }}>
            No hospitals found
          </Typography>
        ) : (
          // Display each hospital in a card format
          (hospitals ?? []).map((hospital, index) => (
            <Box
              key={index}
              mb={4}
              p={2}
              borderRadius="8px" // Rounded corners
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" // Subtle shadow for better appearance
            >
              {/* Hospital details */}
              <Typography
                variant="h6"
                fontWeight="bold"
                style={{ color: "#03B0FD" }}
              >
                {hospital.name}
              </Typography>
              <Typography variant="body1" style={{ color: "#7241FF" }}>
                Email: {hospital.email}
              </Typography>
              <Typography variant="body1" style={{ color: "#03B0FD" }}>
                Contact: {hospital.contact}
              </Typography>
              <Typography variant="body1" style={{ color: "#7241FF" }}>
                Address: {hospital.address}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEdit(hospital)} // Open the form to edit the selected hospital
                sx={{ mt: 2 }}
              >
                Edit
              </Button>
            </Box>
          ))
        )}
      </Box>

      {/* Action Buttons */}
      <Box display="flex" justifyContent="center" gap={10}>
        {/* Button to refresh hospital data */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => refetch()}
          style={{
            backgroundColor: "#7241FF",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          Refresh Data
        </Button>

        {/* Button to toggle the Create Hospital form */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(!showForm)}
          style={{
            backgroundColor: "#03B0FD",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          Add Hospital
        </Button>

        {/* Create Hospital Form */}
        {showForm && (
          <CreateHospital
            onClose={() => {
              setShowForm(false); // Close the form
              refetch(); // Refresh the hospital list
              setCurrentHospital(null); // Reset the selected hospital
            }}
            hospitalData={currentHospital} // Pass the selected hospital for editing
          />
        )}

        {/* Display feedback messages */}
        {showMessage && (
          <MessageComponent
            title={title}
            message={message}
            onClose={closeMessage} // Close the message component
          />
        )}
      </Box>
    </Box>
  );
};

export default Hospital;
