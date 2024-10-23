import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  // State to store user input values (email and password)
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // State to store validation error messages for email and password fields
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // State to toggle password visibility in the password field
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle input field changes and validate values
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    let error = "";

    // Simple regex pattern for email validation
    const emailPattern = /^[^\s@]+/;
    // Regex pattern for password validation (at least 8 characters)
    const passwordPattern = /^.{8,}$/;

    // Validate email format
    if (name === "email" && !emailPattern.test(value)) {
      error = "Email must be in the format: example@patancollege.edu.np.";
    }

    // Validate password length (minimum 8 characters)
    if (name === "password" && !passwordPattern.test(value)) {
      error = "Password must be at least 8 characters long.";
    }

    // Update state with new values and corresponding errors
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  // Function to toggle the visibility of the password
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Function to handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(values); // Logging the input values
    console.log("Login Submitted");
  };

  return (
    // Centering the login form on the page
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="510px"
    >
      {/* Form container */}
      <Box
        width="30%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        {/* Form title */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Login
        </Typography>
        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} mt={3}>
          {/* Email Field */}
          <TextField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            fullWidth
            error={Boolean(errors.email)} // Display error state if there's an email validation error
            helperText={errors.email} // Error message below the input field
            onChange={handleChange}
            required
            sx={{ mb: 3 }} // Adds margin below the field
          />
          {/* Password Field with Toggle Visibility */}
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"} // Show password as text or hide it
            placeholder="Enter your password"
            fullWidth
            error={Boolean(errors.password)} // Display error state if there's a password validation error
            helperText={errors.password} // Error message below the input field
            onChange={handleChange}
            required
            sx={{ mb: 3 }} // Adds margin below the field
            InputProps={{
              // Password visibility toggle button inside the password field
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
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
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
