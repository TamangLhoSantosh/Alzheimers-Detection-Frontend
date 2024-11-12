import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import CreateHospital from "./CreateHospital";
import apis from "../../services/apis";
import MessageComponent from "../generic/MessageComponent";
import useGetHospital, {
  HospitalData,
} from "../../hooks/admin/useGetHospitals";

const Hospital = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentHospital, setCurrentHospital] = useState<HospitalData | null>(
    null
  );
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const { hospitals, loading, error } = useGetHospital();

  // Function to close message
  const closeMessage = () => {
    setMessage("");
    setTitle("");
    setShowMessage(false);
  };

  // Function to handle API errors
  const handleApiError = (e: any) => {
    const errorMessage =
      e.response?.data?.detail || "An unexpected error occurred.";
    setShowMessage(true);
    setTitle("Error");
    setMessage(errorMessage);
  };

  // Function to handle new hospital addition
  const addHospital = async (newHospital: any) => {
    try {
      const response = await apis.createHospital(newHospital);
      if (response.status === 200) {
        setShowMessage(true);
        setTitle("Success");
        setMessage(response.data.message);
        setShowForm(false);
      }
    } catch (e: any) {
      handleApiError(e);
    }
  };

  // Function to handle hospital update
  const updateHospital = async (updatedHospital: any) => {
    try {
      const response = await apis.updateHospital(
        updatedHospital.id,
        updatedHospital
      );
      if (response.status === 202) {
        setShowMessage(true);
        setTitle("Success");
        setMessage(response.data.message);
        setShowForm(false);
      }
    } catch (e: any) {
      handleApiError(e);
    }
  };

  const handleEdit = (hospital: HospitalData) => {
    setCurrentHospital(hospital);
    setShowForm(true);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      <Typography
        variant="h4"
        fontWeight="bold"
        p={10}
        style={{ color: "#03B0FD" }}
      >
        Hospital Information
      </Typography>
      <Box display="grid" gridRow={4}>
        {/* Displaying multiple hospitals */}

        {loading ? (
          <Typography variant="body1" style={{ color: "#B0D9FF" }}>
            Loading hospital data...
          </Typography>
        ) : (hospitals ?? []).length === 0 ? (
          <Typography variant="body1" style={{ color: "#B0D9FF" }}>
            No hospitals found
          </Typography>
        ) : (
          (hospitals ?? []).map((hospital, index) => (
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
                onClick={() => handleEdit(hospital)}
                sx={{ mt: 2 }}
              >
                Edit
              </Button>
            </Box>
          ))
        )}
      </Box>
      <Box display="flex" justifyContent="center" gap={10}>
        {/* Refresh Button */}
        <Button
          variant="contained"
          color="primary"
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

        {/* Toggle Button for Create Hospital Form */}
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
            onAddHospital={currentHospital ? updateHospital : addHospital}
            onClose={() => setShowForm(false)}
            // hospitalData={currentHospital}
          />
        )}

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

export default Hospital;
