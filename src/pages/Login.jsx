import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import "../styles/user/login.css";

const Login = () => {
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) navigate("/home"); // si ya está logueado, redirigir
    }, [user, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const data = await apiFetch("/auth/login", "POST", form);
            login(data.token);
            navigate("/home");
        } catch (err) {
            setError("Credenciales inválidas o error en el servidor.");
        }
    };

    return (
        <div className="user-login">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="user-login__form">
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                {error && <p className="user-login__error">{error}</p>}
                <button type="submit">Ingresar</button>
            </form>
            <p className="user-login__register">
                ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
            </p>
        </div>
    );
};

export default Login;
