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
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useAuth } from "./authContext";

const NavbarComponent = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleLogout = () => {
    logout();
    handleCloseModal();
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
          {(user?.is_admin || user?.is_hospital_admin) && (
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
        <DialogContent style={{ textAlign: "center", padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            <Typography
              variant="h5"
              gutterBottom
              style={{ fontWeight: "bold" }}
              sx={{
                color: "#7241FF",
                padding: "20px 30px",
                borderRadius: "5px",
                marginTop: "20px",
              }}
            >
              Log Out Confirmation
            </Typography>
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Are you sure you want to log out?
          </Typography>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center", padding: "20px" }}>
          <Button
            onClick={handleCloseModal}
            color="secondary"
            variant="outlined"
            style={{ marginRight: "10px" }}
          >
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NavbarComponent;
