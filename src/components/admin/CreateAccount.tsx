import { useState } from "react";
import { TextField, Button, Box, Typography, MenuItem } from "@mui/material";
import apis from "../../config/apis";

const CreateAccount = () => {
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

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await apis.createUserAccount(values);
      console.log(response);
    } catch (e: any) {
      // Handle error
      if (e.response) {
        console.log(e.response);
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Box width="30%">
        <Box component="form" onSubmit={handleSubmit} display="grid" gap={2}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Sign Up
          </Typography>

          {/* All fields will be in one column now */}
          <Box
            display="grid"
            gap={2}
            gridTemplateColumns="1fr"
            justifyContent="center"
          >
            {/* First Name */}
            <TextField
              label="First Name"
              name="firstname"
              placeholder="Enter your First Name"
              fullWidth
              onChange={handleChange}
              required
            />
            {/* Middle Name */}
            <TextField
              label="Middle Name"
              name="middlename"
              placeholder="Enter your Middle Name"
              fullWidth
              onChange={handleChange}
            />
            {/* Last Name */}
            <TextField
              label="Last Name"
              name="lastname"
              placeholder="Enter your Last Name"
              fullWidth
              onChange={handleChange}
              required
            />
            {/* DOB */}
            <TextField
              label="DOB"
              name="dob"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              onChange={handleChange}
              required
            />
            {/* Gender */}
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
            {/* Contact No */}
            <TextField
              label="Contact Number"
              name="contact"
              placeholder="Enter your Contact No"
              fullWidth
              onChange={handleChange}
              required
            />
            {/* Address */}
            <TextField
              label="Address"
              name="address"
              placeholder="Enter your Address"
              fullWidth
              onChange={handleChange}
              required
            />
            {/* Email */}
            <TextField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your Email"
              fullWidth
              onChange={handleChange}
              required
            />
            {/* Password */}
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
