import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
        path: "/home",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: "/checkout",
        element: (
            <ProtectedRoute>
                <Checkout />
            </ProtectedRoute>
        ),
    },
    // 👇 ESTA ES LA QUE NECESITAS PARA /admin
    { path: "/admin", element: <AdminLogin /> },
    {
        path: "/admin/dashboard",
        element: (
            <AdminProtectedRoute>
                <AdminDashboard />
            </AdminProtectedRoute>
        ),
    },
    { path: "*", element: <Home /> },
]);

export default router;
