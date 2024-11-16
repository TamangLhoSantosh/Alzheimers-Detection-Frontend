import { ChangeEvent, FormEvent, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MessageComponent from "../generic/MessageComponent";
import useLogin, { LoginaData } from "../../hooks/user/useLogin";

const Login = () => {
  const [values, setValues] = useState<LoginaData>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useLogin();

  // State to handle messages
  const [messageData, setMessageData] = useState<{
    message: string;
    title: string;
    open: boolean;
  }>({
    message: "",
    title: "",
    open: false,
  });

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Close message component
  const closeMessage = () =>
    setMessageData({ open: false, title: "", message: "" });

  // Validate form fields
  const validate = () => values.username !== "" && values.password !== "";

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      setMessageData({
        message: "Please Enter All Values",
        title: "Empty Fields",
        open: true,
      });
      return;
    }

    login(values);

    if (isLoading) return;

    if (error) {
      setMessageData({
        message: error || "An error occurred",
        title: "Error",
        open: true,
      });
    } else {
      setMessageData({
        message: "Login Successful",
        title: "Success",
        open: true,
      });
    }
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
      {/* Loading State */}
      {isLoading && (
        <Box
          display="flex"
          position="absolute"
          top="50%"
          justifyContent="center"
          alignItems="center"
          zIndex={99}
          sx={{
            background: "linear-gradient(to bottom, #02FBFF, #03B0FD)",
            padding: "20px",
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="white">
            Loading...
          </Typography>
        </Box>
      )}

      {/* Login Form */}
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
        <Typography variant="h4" fontWeight="bold" gutterBottom color="#7241ff">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} mt={3}>
          {/* Username Field */}
          <TextField
            label="Username"
            name="username"
            type="text"
            placeholder="Enter your username"
            fullWidth
            onChange={handleChange}
            required
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#03B0FD",
                },
                "&:hover fieldset": {
                  borderColor: "#7241ff",
                },
              },
            }}
          />

          {/* Password Field with Toggle */}
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            fullWidth
            onChange={handleChange}
            required
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#03B0FD",
                },
                "&:hover fieldset": {
                  borderColor: "#7241ff",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Login Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              bgcolor: "#7241ff",
              "&:hover": {
                bgcolor: "#03B0FD",
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Box>

      {/* Message Component */}
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

export default Login;
