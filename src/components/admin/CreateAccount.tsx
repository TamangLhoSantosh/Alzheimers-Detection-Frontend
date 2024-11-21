import { ChangeEvent, FormEvent, useState } from "react";
import { TextField, Button, Box, Typography, MenuItem } from "@mui/material";
import MessageComponent from "../generic/MessageComponent";
import useCreateUser, {
  CreateUserAccount,
} from "../../hooks/admin/useCreateUser";

interface CreateAccountProps {
  closeForm: () => void;
}

const CreateAccount = ({ closeForm }: CreateAccountProps) => {
  const isAdmin = localStorage.getItem("is_admin");
  const isHospitalAdmin = localStorage.getItem("is_hospital_admin");
  const [values, setValues] = useState<CreateUserAccount>({
    username: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    dob: "",
    gender: "",
    contact: "",
    address: "",
    email: "",
    password: "",
    is_admin: false,
    is_hospital_admin: isAdmin ? true : isHospitalAdmin ? true : false,
  });

  const { isLoading, error, createUser } = useCreateUser();

  // Function to handle form input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  // Function to close message
  const onclose = () => {
    setMessage("");
    setTitle("");
    setShowMessage(false);
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(values);

    if (error) {
      setShowMessage(true);
      setMessage(error || "An error occurred");
      setTitle("Error");
    } else {
      setShowMessage(true);
      setMessage("Account creation successful. Email is sent to the mail.");
      setTitle("Success");

      // Close form after success
      closeForm();
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
      overflow="hidden"
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
      <Box
        width="100%"
        maxWidth="450px"
        bgcolor="white"
        p={4}
        borderRadius="16px"
        boxShadow={6}
        sx={{
          maxHeight: "80vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#7241ff"
          textAlign="center"
          gutterBottom
        >
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} display="grid" gap={3}>
          {/* Form fields with improved spacing */}
          <TextField
            label="First Name"
            name="first_name"
            placeholder="Enter First Name"
            fullWidth
            onChange={handleChange}
            required
            variant="outlined"
            sx={{
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
            }}
          />
          <TextField
            label="Middle Name"
            name="middle_name"
            placeholder="Enter Middle Name"
            fullWidth
            onChange={handleChange}
            variant="outlined"
            sx={{
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
            }}
          />
          <TextField
            label="Last Name"
            name="last_name"
            placeholder="Enter Last Name"
            fullWidth
            onChange={handleChange}
            required
            variant="outlined"
            sx={{
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
            }}
          />
          <TextField
            label="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={handleChange}
            required
            variant="outlined"
            sx={{
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
            }}
          />
          <TextField
            label="DOB"
            name="dob"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            onChange={handleChange}
            required
            variant="outlined"
            sx={{
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
            }}
          />
          <TextField
            label="Gender"
            name="gender"
            select
            fullWidth
            value={values.gender}
            onChange={handleChange}
            required
            variant="outlined"
            sx={{
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
            }}
          >
            <MenuItem value="" disabled>
              Select Gender
            </MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
          <TextField
            label="Contact Number"
            name="contact"
            placeholder="Enter Contact No"
            fullWidth
            onChange={handleChange}
            required
            variant="outlined"
            sx={{
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
            }}
          />
          <TextField
            label="Address"
            name="address"
            placeholder="Enter Address"
            fullWidth
            onChange={handleChange}
            required
            variant="outlined"
            sx={{
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
            }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter Email"
            fullWidth
            onChange={handleChange}
            required
            variant="outlined"
            sx={{
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
            }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter Password"
            fullWidth
            onChange={handleChange}
            required
            variant="outlined"
            sx={{
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
            }}
          />
          <Box display="flex" justifyContent="center" gap={8} mt={3}>
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
                borderRadius: "8px",
                padding: "12px 25px",
                fontWeight: "bold",
                transition: "all 0.3s ease-in-out",
              }}
            >
              Create Account
            </Button>
            <Button
              onClick={closeForm}
              variant="contained"
              color="primary"
              size="large"
              sx={{
                bgcolor: "#7241ff",
                "&:hover": {
                  bgcolor: "#03B0FD",
                },
                borderRadius: "8px",
                padding: "12px 25px",
                fontWeight: "bold",
                transition: "all 0.3s ease-in-out",
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>

      {showMessage && (
        <MessageComponent message={message} title={title} onClose={onclose} />
      )}
    </Box>
  );
};

export default CreateAccount;
