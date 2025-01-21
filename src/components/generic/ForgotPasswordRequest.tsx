import { ChangeEvent, FormEvent, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import MessageComponent from "./MessageComponent";
import useForgotPasswordRequest from "../../hooks/user/useForgotPasswordRequest";

const ForgotPasswordRequest = () => {
  const { isLoading, forgotPasswordRequest } = useForgotPasswordRequest();
  const [email, setEmail] = useState("");
  const [messageData, setMessageData] = useState<{
    message: string;
    title: string;
    open: boolean;
  }>({
    message: "",
    title: "",
    open: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Separate validation function for email
  const validateEmail = (email: string): boolean => {
    if (!email) {
      setMessageData({
        message: "Please enter your email address.",
        title: "Empty Field",
        open: true,
      });
      return false;
    }
    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessageData({
        message: "Please enter a valid email address.",
        title: "Invalid Email",
        open: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return;
    }
    forgotPasswordRequest(email, setMessageData);
  };

  const closeMessage = () =>
    setMessageData({ open: false, title: "", message: "" });

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
          Enter Your Email
        </Typography>
        <Box component="form" onSubmit={handleSubmit} mt={3}>
          <TextField
            label="Email"
            type="email"
            placeholder="Enter your email"
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
              disabled={isLoading} // Disable button when loading
              sx={{
                bgcolor: "#7241ff",
                "&:hover": {
                  bgcolor: "#03B0FD",
                },
              }}
            >
              {isLoading ? "Sending..." : "Send Link"}
              {/* Change button text based on loading state */}
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

export default ForgotPasswordRequest;
