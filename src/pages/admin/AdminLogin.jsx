import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../api/api";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import "../../styles/admin/admin-login.css";

const AdminLogin = () => {
    const { login, token } = useContext(AdminAuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    // 🚀 Si ya hay token, redirige al dashboard
    useEffect(() => {
        if (token) navigate("/admin/dashboard");
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const data = await apiFetch("/auth/login", "POST", form);
            if (data.user.role !== "admin") {
                return setError("No tienes permisos de administrador.");
            }
            login(data.token);
            navigate("/admin/dashboard");
        } catch {
            setError("Credenciales inválidas o error en el servidor.");
        }
    };

    return (
        <div className="admin-login">
            <h2>Login Administrador</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Correo"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />
                <button type="submit">Ingresar</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default AdminLogin;
