import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { useAppDispatch } from "./app/hooks";
import PublicRoute from "./routes/PublicRoute";
import { useEffect } from "react";
import { checkAuth } from "./features/auth/authSlice";
import AdminOnly from "./routes/AdminOnly";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/user/Dashboard";
import Technologies from "./pages/user/Technologies";
import Projects from "./pages/user/Projects";
import Certificates from "./pages/user/Certificates";

export default function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const check = async () => {
      try {
        await dispatch(checkAuth()).unwrap()
      } catch (error) {
        console.log("Auth check failed:")
      }
    }

    check()
  }, [dispatch])

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        <Route path="/signup" element={
          <AdminOnly>
            <Signup />
          </AdminOnly>
        } />

        {/* Dashboard pages */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route path="technologies" element={<Technologies />} />
          <Route path="projects" element={<Projects />} />
          <Route path="certificates" element={<Certificates />} />
        </Route>


        {/* Fallback routes forward */}
        <Route path="*" element={<Navigate to={'/dashboard'} replace />} />

      </Routes>

    </BrowserRouter>
  )
}