import { useState } from "react";
import { TextField, Button, Box, Typography, MenuItem } from "@mui/material";

const CreateAccount = () => {
  // Initializing state to store user input for account creation
  const [values, setValues] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    dob: "",
    gender: "",
    contact: "",
    address: "",
    email: "",
    password: "",
  });

  // Handler to update the state whenever the input fields are changed
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Handler for form submission that prevents default action and logs the form values
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(values);
    console.log("Account Created");
  };

  return (
    // Wrapping the form in a centered Box with margin from the top
    <Box display="flex" justifyContent="center" mt={5}>
      {/* A container Box to limit the width of the form */}
      <Box width="30%">
        {/* Form element with grid layout and onSubmit event */}
        <Box component="form" onSubmit={handleSubmit} display="grid" gap={2}>
          {/* Form header */}
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Sign Up
          </Typography>

          {/* Layout for the form inputs with a single-column grid */}
          <Box
            display="grid"
            gap={2}
            gridTemplateColumns="1fr"
            justifyContent="center"
          >
            {/* First Name field */}
            <TextField
              label="First Name"
              name="firstname"
              placeholder="Enter your First Name"
              fullWidth
              onChange={handleChange}
              required
            />
            {/* Middle Name field */}
            <TextField
              label="Middle Name"
              name="middlename"
              placeholder="Enter your Middle Name"
              fullWidth
              onChange={handleChange}
            />
            {/* Last Name field */}
            <TextField
              label="Last Name"
              name="lastname"
              placeholder="Enter your Last Name"
              fullWidth
              onChange={handleChange}
              required
            />
            {/* Date of Birth (DOB) field */}
            <TextField
              label="DOB"
              name="dob"
              type="date"
              InputLabelProps={{ shrink: true }} // Ensures the label is positioned correctly for date input
              fullWidth
              onChange={handleChange}
              required
            />
            {/* Gender selection field */}
            <TextField
              label="Gender"
              name="gender"
              select
              fullWidth
              value={values.gender}
              onChange={handleChange}
              required
            >
              <MenuItem value="" disabled>
                Select your Gender
              </MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            {/* Contact Number field */}
            <TextField
              label="Contact Number"
              name="contact"
              placeholder="Enter your Contact No"
              fullWidth
              onChange={handleChange}
              required
            />
            {/* Address field */}
            <TextField
              label="Address"
              name="address"
              placeholder="Enter your Address"
              fullWidth
              onChange={handleChange}
              required
            />
            {/* Email field */}
            <TextField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your Email"
              fullWidth
              onChange={handleChange}
              required
            />
            {/* Password field */}
            <TextField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter Password"
              fullWidth
              onChange={handleChange}
              required
            />
          </Box>

          {/* Submit button */}
          <Box mt={4}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateAccount;
