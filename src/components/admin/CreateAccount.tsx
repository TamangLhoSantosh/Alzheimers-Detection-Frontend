import { ChangeEvent, FormEvent, useState } from "react";
import { TextField, Button, Box, Typography, MenuItem } from "@mui/material";
import apis from "../../services/apis";
import MessageComponent from "../generic/MessageComponent";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
      const response = await apis.createUserAccount({
        username: values.email,
        first_name: values.firstname,
        middle_name: values.middlename,
        last_name: values.lastname,
        dob: values.dob,
        gender: values.gender,
        contact: values.contact,
        address: values.address,
        email: values.email,
        is_admin: false,
        is_hospital_admin: false,
        password: values.password,
      });
      if (response.status === 200) {
        setShowMessage(true);
        setTitle("Success");
        setMessage(response.data.message);
      }
    } catch (e: any) {
      // Handle error
      if (e.response) {
        setShowMessage(true);
        setTitle("Error");
        setMessage(e.response.data.detail);
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
      {showMessage && (
        <MessageComponent message={message} title={title} onClose={onclose} />
      )}
    </Box>
  );
};

export default CreateAccount;
