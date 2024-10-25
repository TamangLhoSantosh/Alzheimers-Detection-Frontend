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
import apis from "../../services/apis";
import MessageComponent from "../generic/MessageComponent";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const onclose = () => {
    setMessage("");
    setTitle("");
    setShowMessage(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await apis.login({
        username: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("refresh", response.data.refresh_token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setShowMessage(true);
        setTitle("Success");
        setMessage(response.data.message);
      }
    } catch (e: any) {
      // Handle error
      if (e.response) {
        setShowMessage(true);
        setTitle("Error");
        setMessage(e.response.data.message);
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
      {showMessage && (
        <MessageComponent message={message} title={title} onClose={onclose} />
      )}
    </Box>
  );
};

export default Login;
