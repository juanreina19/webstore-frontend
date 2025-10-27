import { createContext, useState, useEffect } from "react";
import { apiFetch } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [loading, setLoading] = useState(true); // 👈 nuevo

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const data = await apiFetch("/auth/me", "GET", null, token);
                setUser(data);
            } catch {
                logout();
            } finally {
                setLoading(false); // 👈 importante
            }
        };
        fetchUser();
    }, [token]);

    const login = (token) => {
        localStorage.setItem("token", token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken("");
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
