import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import useCreateTest, { CreateTestData } from "../../hooks/user/useCreateTest";
import { useParams } from "react-router-dom";
import MessageComponent from "../generic/MessageComponent";

// Props Interface
interface CreateTestProps {
  onClose: () => void;
}

const CreateTest = ({ onClose }: CreateTestProps) => {
  const { patientId } = useParams();

  // Local state for form fields and UI behavior
  const [description, setDescription] = useState<string>("");
  const [testData, setTestData] = useState<CreateTestData>({
    description: "",
  });

  // Custom hook for creating a test
  const { createTest } = useCreateTest(patientId);
  const [messageData, setMessageData] = useState<{
    message: string;
    title: string;
    open: boolean;
  }>({
    message: "",
    title: "",
    open: false,
  });

  // Function to close message
  const closeMessage = () => {
    if (messageData.title === "Success") {
      onClose();
    }
    setMessageData({ open: false, title: "", message: "" });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createTest(testData, setMessageData);
  };

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
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={1}
          sx={{ color: "#03B0FD", textAlign: "center" }}
        >
          Create Test
        </Typography>

        {/* Input field for test description */}
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setTestData({ ...testData, description: e.target.value });
          }}
          margin="normal"
          required
        />
        <Box display="flex" gap={2}>
          {/* Submit button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ fontWeight: "bold" }}
          >
            Create Test
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
      {messageData.open && (
        <MessageComponent
          message={messageData.message}
          title={messageData.title}
          onClose={closeMessage}
        />
      )}
    </Box>
  );
};

export default CreateTest;
