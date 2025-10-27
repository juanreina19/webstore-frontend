import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/user/navbar.css";

const NavbarUser = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="user-navbar">
            <div className="user-navbar__info">
                <span className="user-navbar__name">{user?.user.name}</span>
                <span className="user-navbar__role">{user?.user.role}</span>
            </div>
            <button onClick={logout} className="user-navbar__logout">Cerrar sesión</button>
        </nav>
    );
};

export default NavbarUser;
