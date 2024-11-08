import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import CreateHospital from "./CreateHospital";
import apis from "../../services/apis";
import MessageComponent from "../generic/MessageComponent";

interface HospitalData {
  name: string;
  email: string;
  contact: string;
  address: string;
}

const Hospital = () => {
  const [hospitalData, setHospitalData] = useState<HospitalData[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  // Function to close message
  const closeMessage = () => {
    setMessage("");
    setTitle("");
    setShowMessage(false);
  };

  // Function to fetch hospital data
  const fetchHospitalData = async () => {
    try {
      const response = await apis.getHospitalData();
      if (response.status === 200) setHospitalData(response.data);
    } catch (e: any) {
      // Handle error
      if (e.response) {
        setShowMessage(true);
        setTitle("Error");
        setMessage(e.response.data.detail);
      }
    }
  };

  // Fetch hospital data on component mount
  useEffect(() => {
    fetchHospitalData();
  }, []);

  // Function to handle new hospital addition
  const addHospital = async (newHospital: HospitalData) => {
    try {
      const response = await apis.createHospital(newHospital);
      if (response.status === 200) {
        console.log(response);
        setShowMessage(true);
        setTitle("Success");
        setMessage(response.data.message);
        fetchHospitalData();
      }
    } catch (e: any) {
      // Handle error
      if (e.response) {
        setShowMessage(true);
        setTitle("Error");
        setMessage(e.response.data.detail);
      }
    }
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
        {hospitalData.length === 0 ? (
          <Typography variant="body1" style={{ color: "#B0D9FF" }}>
            Loading hospital data...
          </Typography>
        ) : (
          hospitalData.map((hospital, index) => (
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
            </Box>
          ))
        )}
      </Box>
      <Box display="flex" justifyContent="center" gap={10}>
        {/* Refresh Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={fetchHospitalData}
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
            onAddHospital={addHospital}
            onClose={() => setShowForm(false)}
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
