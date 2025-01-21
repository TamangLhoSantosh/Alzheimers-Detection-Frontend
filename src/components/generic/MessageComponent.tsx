import { Box, Button, Typography } from "@mui/material";

// Props interface
interface Props {
  onClose: () => void;
  message: string;
  title: string;
}

const MessageComponent = ({ onClose, message, title }: Props) => {
  return (
    <Box
      display="flex"
      height="100%"
      width="100%"
      position="fixed"
      top={0}
      justifyContent="center"
      alignItems="center"
      bgcolor="rgba(0, 0, 0, 0.5)"
      zIndex="50"
    >
      <Box
        position="relative"
        bgcolor="#FFFFFF"
        p={6}
        width={300}
        borderRadius={10}
        boxShadow={20}
      >
        <Box textAlign="center">
          <Typography
            fontWeight="bold"
            fontSize="30px"
            gutterBottom
            color="#7241ff"
          >
            {title}
          </Typography>
          <Typography
            fontWeight="bold"
            fontSize="20px"
            marginBottom="20px"
            gutterBottom
          >
            {message}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onClose}
            sx={{
              bgcolor: "#7241ff",
              "&:hover": {
                bgcolor: "#03B0FD",
              },
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageComponent;
