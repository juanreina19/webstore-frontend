import { useContext } from "react";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import "../../styles/admin/admin-dashboard.css";

const AdminNavbar = () => {
    const { admin, logout } = useContext(AdminAuthContext);

    return (
        <header className="admin-dashboard__header">
            <h2>Panel de Administración</h2>
            <div>
                <span style={{ marginRight: "1rem" }}>
                    {admin?.user.name} ({admin?.user.role})
                </span>
                <button onClick={logout}>Cerrar sesión</button>
            </div>
        </header>
    );
};

export default AdminNavbar;
