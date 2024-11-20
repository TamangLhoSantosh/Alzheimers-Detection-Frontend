import useGetUser from "../../hooks/admin/useGetUser";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";

const User = () => {
  const { data: users, isLoading, error } = useGetUser();

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography
        color="error"
        align="center"
        variant="h6"
        style={{ marginTop: "20px" }}
      >
        Failed to fetch users. Please try again later.
      </Typography>
    );
  }

  if (!users || users.length === 0) {
    return (
      <Typography align="center" variant="h6" style={{ marginTop: "20px" }}>
        No users found.
      </Typography>
    );
  }

  return (
    <TableContainer
      component={Paper}
      style={{ margin: "20px", padding: "10px" }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        User List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Verified</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.first_name || "-"}</TableCell>
              <TableCell>{user.last_name || "-"}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.contact}</TableCell>
              <TableCell>{user.is_verified ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default User;
