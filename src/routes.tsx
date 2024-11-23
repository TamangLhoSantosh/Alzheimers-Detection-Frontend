import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/user/Login";
import NavbarComponent from "./components/generic/NavbarComponent";
import Hospital from "./components/admin/Hospital";
import User from "./components/admin/User";
import Patient from "./components/user/Patients";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<User />} />
        <Route path="/hospitals" element={<Hospital />} />
        <Route path="/patients" element={<Patient />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
