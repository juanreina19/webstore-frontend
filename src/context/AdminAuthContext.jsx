import { createContext, useState, useEffect } from "react";
import { apiFetch } from "../api/api";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdmin = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const data = await apiFetch("/auth/me", "GET", null, token);

                if (data.role === "admin" || data.user?.role === "admin") {
                    setAdmin(data);
                } else {
                    logout();
                }
            } catch (err) {
                console.error("❌ Error verificando admin:", err);
                logout();
            } finally {
                setLoading(false);
            }
        };
        fetchAdmin();
    }, [token]);

    const login = (token) => {
        localStorage.setItem("adminToken", token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("adminToken");
        setAdmin(null);
        setToken("");
    };

    return (
        <AdminAuthContext.Provider value={{ admin, token, login, logout, loading }}>
            {children}
        </AdminAuthContext.Provider>
    );
};
