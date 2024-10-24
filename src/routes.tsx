import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/user/Login";
import CreateAccount from "./components/admin/CreateAccount";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
