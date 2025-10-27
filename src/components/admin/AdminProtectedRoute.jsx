import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext";

const AdminProtectedRoute = ({ children }) => {
    const { admin, token } = useContext(AdminAuthContext);
    if (!token) return <Navigate to="/admin" />;
    return children;
};

export default AdminProtectedRoute;
