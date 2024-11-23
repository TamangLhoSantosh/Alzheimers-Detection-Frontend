import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Modal,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useState } from "react";
import useGetUser, { UserData } from "../../hooks/admin/useGetUser";
import MessageComponent from "../generic/MessageComponent";
import CreateAccount from "./CreateAccount";

const User = () => {
  // State for managing the message component display
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  // State to toggle the form visibility
  const [showForm, setShowForm] = useState(false);

  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  // Fetch users data
  const { data: users, isLoading, error, refetch } = useGetUser();

  // Handle error and display message component
  if (error) {
    setShowMessage(true);
    setTitle("Error");
    setMessage("Failed to fetch users. Please try again later.");
  }

  // Function to close the message component
  const closeMessage = () => {
    setMessage("");
    setTitle("");
    setShowMessage(false);
  };

  // Function to handle editing a user
  const handleEdit = (user: UserData) => {
    setCurrentUser(user); // Set the selected user for editing
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
        User Information
      </Typography>

      {/* User List Section */}
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
        ) : (users ?? []).length === 0 ? (
          // No Users Found
          <Typography variant="body1" sx={{ color: "#B0D9FF" }}>
            No users found
          </Typography>
        ) : (
          // Displaying Users
          (users ?? []).map((user, index) => (
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
                {user.first_name} {user.middle_name} {user.last_name}
                <Box
                  sx={{ color: "red", display: "flex", alignItems: "center" }}
                >
                  {user.is_hospital_admin && <LocalHospitalIcon />}
                </Box>
                <Box
                  sx={{ color: "blue", display: "flex", alignItems: "center" }}
                >
                  {user.is_admin && <AdminPanelSettingsIcon />}
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: "#7241FF" }}>
                Contact: {user.contact || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#03B0FD" }}>
                Email: {user.email}
              </Typography>
              <Typography variant="body1" sx={{ color: "#7241FF" }}>
                Gender: {user.gender || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#03B0FD" }}>
                Address: {user.address}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEdit(user)} // Open the form to edit the selected user
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
        {/* Add User Button Placeholder */}
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
          Add User
        </Button>
        {/* Display Message Component */}
        {showMessage && (
          <MessageComponent
            title={title}
            message={message}
            onClose={closeMessage}
          />
        )}
        {/* Display Create Account Component */}
        <Modal open={showForm} onClose={() => setShowForm(false)}>
          <Box
            display="flex"
            justifyContent="center"
            width="100%"
            overflow="hidden"
          >
            <CreateAccount
              closeForm={() => {
                setShowForm(false);
                refetch();
              }}
              userData={currentUser}
            />
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default User;
