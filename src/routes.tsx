import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/user/Login";
import NavbarComponent from "./components/generic/NavbarComponent";
import Hospital from "./components/admin/Hospital";
import User from "./components/admin/User";
import Patient from "./components/user/Patients";
import TestList from "./components/user/TestList";
import Test from "./components/user/Test";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./components/generic/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        {/* Public Route */}
        <Route
          path="/login"
          element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/users"
          element={
            <ProtectedRoute requireAuth={true}>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospitals"
          element={
            <ProtectedRoute requireAuth={true}>
              <Hospital />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <ProtectedRoute requireAuth={true}>
              <Patient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/tests/:patientId"
          element={
            <ProtectedRoute requireAuth={true}>
              <TestList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/tests/:patientId/:testId"
          element={
            <ProtectedRoute requireAuth={true}>
              <Test />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
