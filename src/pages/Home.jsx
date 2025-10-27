import { useState, useEffect, useContext } from "react";
import { apiFetch } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import NavbarUser from "../components/NavbarUser";
import ProductCard from "../components/ProductCard";
import "../styles/user/home.css";

const Home = () => {
    const { token } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState(
        JSON.parse(localStorage.getItem("selected") || "[]")
    );

    useEffect(() => {
        apiFetch("/products")
            .then(data => {
                setProducts(data.products || []);
            })
            .catch(err => console.error("Error cargando productos:", err));
    }, []);

    const addToSelection = (product) => {
        const exists = selected.find((s) => s._id === product._id);
        if (exists) return;
        const next = [...selected, product];
        setSelected(next);
        localStorage.setItem("selected", JSON.stringify(next));
    };

    const removeFromSelection = (productId) => {
        const next = selected.filter((p) => p._id !== productId);
        setSelected(next);
        localStorage.setItem("selected", JSON.stringify(next));
    };

    const goToCheckout = () => {
        window.location.href = "/checkout";
    };

    return (
        <div className="user-home">
            <NavbarUser />
            <h2 className="user-home__title">Productos disponibles</h2>

            <div className="user-home__products">
                {products.map((p) => {
                    const isSelected = selected.some((s) => s._id === p._id);
                    return (
                        <ProductCard
                            key={p._id}
                            product={p}
                            isSelected={isSelected}
                            onAdd={addToSelection}
                            onRemove={removeFromSelection}
                        />
                    );
                })}
            </div>

            <button
                className="user-home__checkout-btn"
                onClick={goToCheckout}
                disabled={selected.length === 0}
            >
                Ir a pagar {selected.length > 0 && `(${selected.length})`}
            </button>
        </div>
    );
};

export default Home;
