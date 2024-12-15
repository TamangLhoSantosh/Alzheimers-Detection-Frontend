import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import useCreatePatient, {
  CreatePatientData,
} from "../../hooks/user/useCreatePatient";
import { PatientData } from "../../hooks/user/useGetPatients";
import useUpdatePatient from "../../hooks/user/useUpdatePatient";
import { useAuth } from "../generic/authContext";
import MessageComponent from "../generic/MessageComponent";

// Props Interface
interface CreatePatientProps {
  onClose: () => void;
  patientData: PatientData | null; // Data passed for editing, null for new patients
}

const CreatePatient = ({ onClose, patientData }: CreatePatientProps) => {
  const { user } = useAuth();
  const hospitalId = user?.hospital_id || "";

  // State for form data
  const [formData, setFormData] = useState<CreatePatientData>({
    first_name: "",
    middle_name: "",
    last_name: "",
    dob: "",
    gender: "",
    contact: "",
    address: "",
    hospital_id: hospitalId,
  });

  // Extract functions and state from useCreatePatient hook
  const { createPatient, error, isLoading } = useCreatePatient();

  // Extract functionsand state from useUpdatePatient hook
  const { updatePatient } = useUpdatePatient();

  // Handle input changes in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (patientData) updatePatient({ ...patientData, ...formData });
      else createPatient(formData);
      if (error) {
        setShowMessage(true);
        setMessage(error || "An error occurred");
        setTitle("Error");
      } else {
        setShowMessage(true);
        setMessage("Patient creation successful.");
        setTitle("Success");

        // Close form after success
        onClose();
      }
    } catch (err) {
      console.error("Error creating/updating patient:", err);
    }
  };

  // Populate form data if editing an existing patient
  useEffect(() => {
    if (patientData) {
      const formattedDob = patientData.dob
        ? typeof patientData.dob === "string"
          ? new Date(patientData.dob).toISOString().split("T")[0]
          : ""
        : "";
      setFormData({
        ...patientData,
        dob: formattedDob, // Ensure dob is formatted correctly
      });
    }
  }, [patientData]); // Dependency ensures this runs when patientData changes

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
      overflow="auto"
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
        {/* Title */}
        <Typography
          variant="h5"
          fontWeight="bold"
          align="center"
          sx={{ color: "primary.main", mb: 2 }}
        >
          {patientData ? "Update Patient" : "Add Patient"}
        </Typography>

        {/* Form Fields */}
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

        {/* Buttons */}
        <Box display="flex" gap={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ fontWeight: "bold" }}
            disabled={isLoading} // Disable button while loading
          >
            {patientData ? "Update" : "Add"}
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

        {/* Display error if any */}
        {error && (
          <Typography color="error" variant="body2" textAlign="center">
            {error || "An error occurred."}
          </Typography>
        )}
      </Box>
      {showMessage && (
        <MessageComponent message={message} title={title} onClose={onclose} />
      )}
    </Box>
  );
};

export default CreatePatient;
