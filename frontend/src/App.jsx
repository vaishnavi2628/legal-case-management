import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import AddCase from "./pages/AddCase";
import UploadDocument from "./pages/UploadDocument";
import ClientDashboard from "./pages/ClientDashboard";
import EditCase from "./pages/EditCase";
import CaseDetails from "./pages/CaseDetails";
import Issues from "./pages/Issues";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />

      <Route
  path="/dashboard"
  element={
    <ProtectedRoute allowedRoles={["Admin", "Lawyer"]}>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route path="/signup" element={<Signup />} />
<Route
  path="/cases"
  element={
    <ProtectedRoute allowedRoles={["Admin", "Lawyer"]}>
      <Cases />
    </ProtectedRoute>
  }
/>

<Route
  path="/add-case"
  element={
    <ProtectedRoute allowedRoles={["Admin", "Lawyer"]}>
      <AddCase />
    </ProtectedRoute>
  }
/>

<Route
  path="/edit-case/:id"
  element={
    <ProtectedRoute allowedRoles={["Admin", "Lawyer"]}>
      <EditCase />
    </ProtectedRoute>
  }
/>

<Route
  path="/upload"
  element={
    <ProtectedRoute allowedRoles={["Admin", "Lawyer"]}>
      <UploadDocument />
    </ProtectedRoute>
  }
/>
<Route
  path="/client-dashboard"
  element={
    <ProtectedRoute allowedRoles={["Client"]}>
      <ClientDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/case/:id"
  element={
    <ProtectedRoute allowedRoles={["Client"]}>
      <CaseDetails />
    </ProtectedRoute>
  }
/>
<Route
  path="/issues"
  element={
    <ProtectedRoute allowedRoles={["Admin", "Lawyer"]}>
      <Issues />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;