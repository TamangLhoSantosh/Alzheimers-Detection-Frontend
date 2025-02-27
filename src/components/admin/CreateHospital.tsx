import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import { HospitalData } from "../../hooks/admin/useGetHospitals";
import usePostHospital, {
  CreateHospitalData,
} from "../../hooks/admin/useCreateHospital";
import useUpdateHospital from "../../hooks/admin/useUpdateHospital";

import MessageComponent from "../generic/MessageComponent";

// Props Interface
interface CreateHospitalProps {
  onClose: () => void;
  hospitalData: HospitalData | null; // null if creating new hospital
}

const CreateHospital: React.FC<CreateHospitalProps> = ({
  onClose,
  hospitalData,
}) => {
  const [formData, setFormData] = useState<CreateHospitalData | HospitalData>(
    hospitalData || ({} as HospitalData | CreateHospitalData)
  );

  const { createHospital, isLoading: creating } = usePostHospital();
  const { updateHospital, isLoading: updating } = useUpdateHospital();

  const [messageData, setMessageData] = useState<{
    message: string;
    title: string;
    open: boolean;
  }>({
    message: "",
    title: "",
    open: false,
  });

  // Set form data if hospitalData is provided on component mount
  useEffect(() => {
    if (hospitalData) {
      setFormData(hospitalData);
    }
  }, [hospitalData]);

  // Function to handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hospitalData) {
      // Update hospital
      updateHospital({ ...hospitalData, ...formData }, setMessageData);
    } else {
      // Create hospital
      createHospital(formData as CreateHospitalData, setMessageData);
    }
  };

  const closeMessage = () => {
    if (messageData.title === "Success") {
      onClose();
    }
    setMessageData({ open: false, title: "", message: "" });
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
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          gutterBottom
          sx={{ color: "#7241ff" }}
        >
          {hospitalData ? "Edit Hospital" : "Add Hospital"}
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
            disabled={creating || updating}
          >
            {creating || updating
              ? "Saving..."
              : hospitalData
              ? "Update"
              : "Add"}
          </Button>
          <Button
            variant="outlined"
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
      {messageData.open && (
        <MessageComponent
          title={messageData.title}
          message={messageData.message}
          onClose={closeMessage}
        />
      )}
    </Box>
  );
};

export default CreateHospital;
