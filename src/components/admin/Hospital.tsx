import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";

const Hospital = () => {
  const [hospitalData, setHospitalData] = useState([{}]);

  // Simulating an API call to load hospital data
  useEffect(() => {
    const fetchHospitalData = async () => {
      // Simulating an API call with a delay (e.g., 2 seconds)
      setTimeout(() => {
        setHospitalData([
          {
            name: "Blue Waters Hospital",
            email: "contact@bluewaters.com",
            contact: "+1122334455",
            address: "789 Blue Waters Road, Coastal City, Country",
          },
          {
            name: "Sunny Side Medical Center",
            email: "info@sunnyside.com",
            contact: "+0987654321",
            address: "456 Sunny Side Ave, City, Country",
          },
          {
            name: "Green Valley Clinic",
            email: "support@greenvalley.com",
            contact: "+1234567890",
            address: "123 Green Valley Road, City, Country",
          },
        ]);
      }, 2000);
    };

    fetchHospitalData();
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" p={3}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        style={{ color: "#03B0FD" }} // Using #03B0FD for the main heading
      >
        Hospital Information
      </Typography>

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
              style={{ color: "#03B0FD" }} // Using #03B0FD for hospital names
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

      {/* Refresh Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setHospitalData([])} // Simulate data refresh
        style={{
          backgroundColor: "#7241FF", // Using #7241FF for the button
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          marginTop: "20px",
        }}
      >
        Refresh Data
      </Button>
    </Box>
  );
};

export default Hospital;
