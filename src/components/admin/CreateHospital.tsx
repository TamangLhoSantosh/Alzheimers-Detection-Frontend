import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

// Interface for hospital data
interface HospitalData {
  name: string;
  email: string;
  contact: string;
  address: string;
}

// Props interface
interface CreateHospitalProps {
  onAddHospital: (newHospital: HospitalData) => void;
  onClose: () => void;
}

const CreateHospital: React.FC<CreateHospitalProps> = ({
  onAddHospital,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
  });

  // Function to handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddHospital(formData);
  };

  return (
    <Box
      display="flex"
      height="100%"
      width="100%"
      position="fixed"
      top={0}
      left={0}
      justifyContent="center"
      alignItems="center"
      bgcolor="rgba(0, 0, 0, 0.5)"
      zIndex={20}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mt: 6,
          p: 4,
          borderRadius: 3,
          boxShadow: 4,
          bgcolor: "whitesmoke",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          gutterBottom
          sx={{ color: "#7241ff" }}
        >
          Create Hospital
        </Typography>
        <TextField
          label="Hospital Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            "& .MuiInputBase-root": {
              borderRadius: "8px",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#03B0FD",
            },
          }}
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          required
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            "& .MuiInputBase-root": {
              borderRadius: "8px",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#03B0FD",
            },
          }}
        />
        <TextField
          label="Contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          fullWidth
          required
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            "& .MuiInputBase-root": {
              borderRadius: "8px",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#03B0FD",
            },
          }}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            "& .MuiInputBase-root": {
              borderRadius: "8px",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#03B0FD",
            },
          }}
        />
        <Box display="flex" gap={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
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
            Create
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={onClose}
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
  );
};

export default CreateHospital;
