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
import apis from "../../config/apis";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await apis.login({
        username: values.email,
        password: values.password,
      });

      console.log(response);
    } catch (e: any) {
      // Handle error
      if (e.response) {
        console.log(e.response);
      }
    }
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
