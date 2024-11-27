import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
  Snackbar,
} from "@mui/material";
import useGetTest from "../../hooks/user/useGetTest";

const Test = () => {
  const { data: tests, isLoading: loading, error } = useGetTest();

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Snackbar open={!!error} message={error} autoHideDuration={3000} />
      ) : (
        <>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Tests for Patient
          </Typography>
          <List>
            {tests?.map((test, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Description: ${test.description}`}
                  secondary={`Result: ${test.result || "Pending"}`}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};

export default Test;
