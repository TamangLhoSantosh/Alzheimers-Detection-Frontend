import {
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Import the logout icon
import { useAuth } from "./authCotext";

const NavbarComponent = () => {
  const { isAuthenticated, user, logout } = useAuth(); // Assuming you have a logout function in your auth context
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleLogout = () => {
    logout(); // Assuming this function handles logging the user out
    handleCloseModal(); // Close the modal on logout
  };

  return (
    <Box
      position="sticky"
      top="0"
      display="grid"
      justifyContent="space-between"
      alignItems="center"
      zIndex="99"
      bgcolor="white"
      p="10px 20px"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
    >
      <Box gridColumn="1">
        <Link to="/" style={{ textDecoration: "none", color: "#7241ff" }}>
          {" "}
          {/* Logo link with purple color */}
          <Typography variant="h6" fontWeight="bold">
            Logo
          </Typography>
        </Link>
      </Box>
      {isAuthenticated && (
        <Box
          gridColumn="2"
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          gap="30px"
        >
          {user?.is_admin && (
            <Link
              to="/hospitals"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                sx={{
                  color: "#7241ff",
                  "&:hover": {
                    color: "#03B0FD",
                  },
                }}
              >
                Hospitals
              </Typography>
            </Link>
          )}
          {user?.is_hospital_admin && (
            <Link
              to="/users"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                sx={{
                  color: "#7241ff",
                  "&:hover": {
                    color: "#03B0FD",
                  },
                }}
              >
                Users
              </Typography>
            </Link>
          )}
          <Link
            to="/patients"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              sx={{
                color: "#7241ff",
                "&:hover": {
                  color: "#03B0FD",
                },
              }}
            >
              Patients
            </Typography>
          </Link>

          {/* Circular button for logout modal */}
          <IconButton
            onClick={handleOpenModal}
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "#7241ff",
              color: "white",
              "&:hover": {
                bgcolor: "#03B0FD",
              },
            }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Box>
      )}

      {/* Modal for Logout */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent>
          <Typography variant="h6">
            Are you sure you want to log out?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NavbarComponent;
