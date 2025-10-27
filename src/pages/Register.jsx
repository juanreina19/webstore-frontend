import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import "../styles/user/login.css"; // reutilizamos estilo base

const Register = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (user) navigate("/home");
    }, [user, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await apiFetch("/auth/register", "POST", form);
            setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
            setTimeout(() => navigate("/login"), 2000);
        } catch {
            setError("Error en el registro. Intenta nuevamente.");
        }
    };

    return (
        <div className="user-login">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit} className="user-login__form">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
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
                {success && <p className="user-login__success">{success}</p>}
                <button type="submit">Registrar</button>
            </form>
            <p className="user-login__register">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
        </div>
    );
};

export default Register;
