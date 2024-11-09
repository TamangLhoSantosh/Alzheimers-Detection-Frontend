import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/user/Login";
import CreateAccount from "./components/admin/CreateAccount";
import NavbarComponent from "./components/generic/NavbarComponent";
import Hospital from "./components/admin/Hospital";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/hospitals" element={<Hospital />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
