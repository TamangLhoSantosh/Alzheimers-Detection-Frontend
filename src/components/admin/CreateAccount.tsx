import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { TextField, Button, Box, Typography, MenuItem } from "@mui/material";
import MessageComponent from "../generic/MessageComponent";
import useCreateUser, {
  CreateUserAccount,
} from "../../hooks/admin/useCreateUser";
import { UserData } from "../../hooks/admin/useGetUser";
import useUpdateUser from "../../hooks/admin/useUpdateUser";
import useGetHospitals from "../../hooks/admin/useGetHospitals";

interface CreateAccountProps {
  closeForm: () => void;
  userData: UserData | null; // null if creating new user
}

// Type guard to check if the object is of type UserData
function isUserData(values: UserData | CreateUserAccount): values is UserData {
  return (values as UserData).id !== undefined;
}

const CreateAccount = ({ closeForm, userData }: CreateAccountProps) => {
  const isAdmin = localStorage.getItem("is_admin");
  const isHospitalAdmin = localStorage.getItem("is_hospital_admin");
  const [values, setValues] = useState<UserData | CreateUserAccount>(
    userData || {
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
      hospital_id: localStorage.getItem("hospital_id") || "",
    }
  );

  const { isLoading, error, createUser } = useCreateUser();
  const { updateUser } = useUpdateUser();

  // Fetch hosptial data
  let hospitals = null;
  const admin = localStorage.getItem("is_admin");

  if (admin === "true") {
    const { data } = useGetHospitals(); // Destructure `data` from the hook
    hospitals = data; // Assign the data to `hospitals`
  }

  // Set form data if userData is provided on component mount
  useEffect(() => {
    if (userData) {
      const formattedDob = userData.dob
        ? typeof userData.dob === "string"
          ? new Date(userData.dob).toISOString().split("T")[0]
          : ""
        : "";
      setValues({
        ...userData,
        dob: formattedDob, // Ensure dob is in the correct format
      });
    }
  }, [userData]);

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
    if (isUserData(values)) updateUser(values);
    else createUser(values);

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
          msOverflowStyle: "none",
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
          {userData ? "Update User" : "Create Account"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} display="grid" gap={3}>
          {/* Form fields with improved spacing */}
          <TextField
            label="First Name"
            name="first_name"
            placeholder="Enter First Name"
            fullWidth
            value={values.first_name}
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
            value={values.middle_name}
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
            value={values.last_name}
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
            value={values.username}
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
            value={values.dob}
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
          {admin === "true" && (
            <TextField
              label="Hospital"
              name="hospital_id"
              select
              fullWidth
              value={values.hospital_id}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{
                backgroundColor: "#f8f8f8",
                borderRadius: "8px",
              }}
            >
              <MenuItem value="" disabled>
                Select Hospital
              </MenuItem>
              {hospitals?.map((hospital) => (
                <MenuItem key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </MenuItem>
              ))}
            </TextField>
          )}
          <TextField
            label="Contact Number"
            name="contact"
            placeholder="Enter Contact No"
            fullWidth
            value={values.contact}
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
            value={values.address}
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
            value={values.email}
            fullWidth
            onChange={handleChange}
            required
            variant="outlined"
            sx={{
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
            }}
          />
          {userData ? null : (
            <TextField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter Password"
              value={values.password}
              fullWidth
              onChange={handleChange}
              required
              variant="outlined"
              sx={{
                backgroundColor: "#f8f8f8",
                borderRadius: "8px",
              }}
            />
          )}
          <Box display="flex" justifyContent="center" gap={8} mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                padding: "12px 20px",
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "8px",
                backgroundColor: "#03B0FD",
                "&:hover": {
                  backgroundColor: "#02FBFF",
                  color: "black",
                },
                transition: "background-color 0.3s ease-in-out",
              }}
            >
              {userData ? "Update User" : "Create Account"}
            </Button>
            <Button
              onClick={closeForm}
              variant="outlined"
              color="primary"
              size="large"
              sx={{
                padding: "12px 20px",
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "8px",
                color: "#7241FF",
                borderColor: "#7241FF",
                "&:hover": {
                  backgroundColor: "#e0e7ff",
                },
                transition: "background-color 0.3s ease-in-out",
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
