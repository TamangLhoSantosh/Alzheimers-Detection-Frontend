import { Box, Button, Typography } from "@mui/material";

interface Props {
  onClose: () => void;
  message: String;
  title: String;
}

const MessageComponent = ({ onClose, message, title }: Props) => {
  return (
    <Box
      display={"flex"}
      height={"100%"}
      width={"100%"}
      position={"fixed"}
      top={0}
      justifyContent={"center"}
      alignItems={"center"}
      bgcolor={"black"}
      zIndex={"50"}
    >
      <Box
        position={"relative"}
        bgcolor={"white"}
        p={6}
        width={300}
        borderRadius={10}
        boxShadow={20}
      >
        <Box textAlign={"center"}>
          <Typography fontWeight="bold" gutterBottom>
            {title}
          </Typography>
          <Typography fontWeight="bold" gutterBottom>
            {message}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Box>
    // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    //   <div className="relative bg-white rounded-lg shadow-lg p-6 w-96">
    //     <div className="text-center">
    //       <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    //       <p className="text-gray-700 mb-4">{message}</p>
    //       <button
    //         className="bg-black text-white px-4 py-2 rounded shadow"
    //         onClick={onClose}
    //       >
    //         Close
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default MessageComponent;
