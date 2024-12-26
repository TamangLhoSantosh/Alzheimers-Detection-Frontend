import { ChangeEvent, FormEvent, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import MessageComponent from "./MessageComponent";
import { useParams } from "react-router-dom";
import useForgotPasswordConfirm from "../../hooks/user/useForgotPasswordConfirm";

const ForgotPasswordConfirm = () => {
  const { token } = useParams<{ token: string }>();
  const { isLoading, forgotPasswordConfirm } = useForgotPasswordConfirm(
    token ?? ""
  );

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [messageData, setMessageData] = useState({
    open: false,
    message: "",
    title: "",
  });

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate password and update message data if necessary
  const validatePassword = () => {
    if (formData.password !== formData.confirmPassword) {
      setMessageData({
        open: true,
        message: "Passwords do not match",
        title: "Error",
      });
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validatePassword()) return;
    forgotPasswordConfirm(formData.password, setMessageData);
  };

  // Close message dialog
  const closeMessage = () => {
    if (messageData.title === "Success") {
      window.location.href = "/login";
    }
    setMessageData({ open: false, message: "", title: "" });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        background: "linear-gradient(to bottom, #02FBFF, #03B0FD)",
        padding: "20px",
      }}
    >
      <Box
        width="30%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        bgcolor="white"
        p="20px"
        borderRadius="8px"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom color="#7241ff">
          Reset Your Password
        </Typography>

        <Box component="form" onSubmit={handleSubmit} mt={3}>
          <TextField
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your new password"
            fullWidth
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your new password"
            fullWidth
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isLoading}
              sx={{
                bgcolor: "#7241ff",
                "&:hover": {
                  bgcolor: "#03B0FD",
                },
              }}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </Box>
        </Box>
      </Box>

      {messageData.open && (
        <MessageComponent
          message={messageData.message}
          title={messageData.title}
          onClose={closeMessage}
        />
      )}
    </Box>
  );
};

export default ForgotPasswordConfirm;
