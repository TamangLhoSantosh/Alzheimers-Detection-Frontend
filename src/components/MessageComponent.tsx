import { Box, Button, Typography } from "@mui/material";

interface Props {
  onClose: () => void; // Callback function to close the message component
  message: String; // Message to be displayed in the dialog
  title: String; // Title for the dialog box
}

const MessageComponent = ({ onClose, message, title }: Props) => {
  return (
    // Full-screen overlay box to darken the background and center the message dialog
    <Box
      display={"flex"}
      height={"100%"}
      width={"100%"}
      position={"fixed"}
      top={0}
      left={0}
      justifyContent={"center"}
      alignItems={"center"}
      bgcolor={"rgba(0, 0, 0, 0.5)"} // Semi-transparent dark background to highlight the message box
      zIndex={50} // Ensures the message box appears above other elements
    >
      {/* Message box */}
      <Box
        position={"relative"}
        bgcolor={"white"} // White background for the message dialog
        p={6} // Padding inside the message box
        width={300} // Width of the message box
        borderRadius={10} // Rounded corners for the box
        boxShadow={20} // Adding shadow to give the box depth
      >
        {/* Content inside the message box */}
        <Box textAlign={"center"}>
          {/* Title of the message */}
          <Typography fontWeight="bold" gutterBottom>
            {title}
          </Typography>
          {/* Main message content */}
          <Typography fontWeight="bold" gutterBottom>
            {message}
          </Typography>
          {/* Close button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onClose} // Triggers the onClose function passed via props
          >
            Close
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageComponent;
