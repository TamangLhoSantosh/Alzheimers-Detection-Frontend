import { useState } from "react";
import { TextField, Button, Typography, Box, Container } from "@mui/material";
import apis from "../../services/apis";

const CreateHospital = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await apis.createHospital(formData);
    console.log(response);
  };

  return (
    <Container maxWidth="sm">
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
          bgcolor: "#B0D9FF", // Pastel Blue background
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
            },
            transition: "background-color 0.3s ease-in-out",
          }}
        >
          Create
        </Button>
      </Box>
    </Container>
  );
};

export default CreateHospital;
