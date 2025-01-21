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
import NotAuthorized from "./components/generic/NotAuthorized";
import ForgotPasswordRequest from "./components/generic/ForgotPasswordRequest";
import ForgotPasswordConfirm from "./components/generic/ForgotPasswordConfirm";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute requireAuth={false}>
              <ForgotPasswordRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password-reset/confirm/:token"
          element={
            <ProtectedRoute requireAuth={false}>
              <ForgotPasswordConfirm />
            </ProtectedRoute>
          }
        />
        {/* Admin-only Routes */}
        <Route
          path="/hospitals"
          element={
            <ProtectedRoute requireAuth={true} allowAdmin={true}>
              <Hospital />
            </ProtectedRoute>
          }
        />
        {/* Admin and Hospital Admin Routes */}
        <Route
          path="/users"
          element={
            <ProtectedRoute
              requireAuth={true}
              allowAdmin={true}
              allowHospitalAdmin={true}
            >
              <User />
            </ProtectedRoute>
          }
        />
        {/* Authenticated User Routes */}
        <Route
          path="/patients"
          element={
            <ProtectedRoute
              requireAuth={true}
              allowNormalUser={true}
              allowAdmin={true} // Admins can also access this
              allowHospitalAdmin={true} // Hospital Admins can also access this
            >
              <Patient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/tests/:patientId"
          element={
            <ProtectedRoute requireAuth={true} allowNormalUser={true}>
              <TestList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/tests/:patientId/:testId"
          element={
            <ProtectedRoute requireAuth={true} allowNormalUser={true}>
              <Test />
            </ProtectedRoute>
          }
        />

        {/* Not Authorized Route */}
        <Route path="/not-authorized" element={<NotAuthorized />} />

        {/* Catch-all Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
