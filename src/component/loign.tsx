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
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    let error = "";

    // Email regex pattern for specific domain
    const emailPattern = /^[^\s@]+/;
    // Password regex pattern (at least 8 characters)
    const passwordPattern = /^.{8,}$/;

    if (name === "email" && !emailPattern.test(value)) {
      error = "Email must be in the format: example@patancollege.edu.np.";
    }

    if (name === "password" && !passwordPattern.test(value)) {
      error = "Password must be at least 8 characters long.";
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev); // Toggle password visibility
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(values);
    console.log("Login Submitted");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="510px"
    >
      <Box
        width="30%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} mt={3}>
          {/* Email Field */}
          <TextField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            fullWidth
            error={Boolean(errors.email)}
            helperText={errors.email}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />
          {/* Password Field with Toggle */}
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            fullWidth
            error={Boolean(errors.password)}
            helperText={errors.password}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            InputProps={{
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
