import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

import useCreatePatient, {
  CreatePatientData,
} from "../../hooks/user/useCreatePatient";

// Props Interface
interface CreatePatientProps {
  onClose: () => void;
}

const CreatePatient: React.FC<CreatePatientProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<CreatePatientData>({
    first_name: "",
    middle_name: "",
    last_name: "",
    dob: "",
    gender: "",
    contact: "",
    address: "",
    hospital_id: localStorage.getItem("hospital_id") || "",
  });

  const { createPatient, error, isLoading } = useCreatePatient();
  console.log(error);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createPatient(formData as CreatePatientData);
      onClose();
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
      overflow={"auto"}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
          width: "400px",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          align="center"
          sx={{ color: "primary.main", mb: 2 }}
        >
          Add Patient
        </Typography>

        <TextField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Middle Name"
          name="middle_name"
          value={formData.middle_name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Date of Birth"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          required
        />

        <Box display="flex" gap={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ fontWeight: "bold" }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Add"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={onClose}
            sx={{ fontWeight: "bold" }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePatient;
