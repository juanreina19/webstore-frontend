import { useContext, useState } from "react";
import { apiFetch } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import "../styles/user/checkout.css";

const Checkout = () => {
    const { token } = useContext(AuthContext);
    const [items, setItems] = useState(JSON.parse(localStorage.getItem("selected")) || []);

    const handlePay = async () => {
        const body = {
            products: items.map(i => ({ product: i._id, quantity: 1 }))
        };
        try {
            await apiFetch("/orders", "POST", body, token);
            alert("Pago realizado con éxito");
            localStorage.removeItem("selected");
            window.location.href = "/home";
        } catch (err) {
            alert("Error en el pago");
        }
    };

    return (
        <div className="user-checkout">
            <h2>Resumen de compra</h2>
            <ul>
                {items.map((i) => (
                    <li key={i._id}>{i.name} - ${i.price}</li>
                ))}
            </ul>
            <div className="user-checkout__actions">
                <button onClick={handlePay}>Pagar</button>
                <button onClick={() => window.location.href = "/home"}>Cancelar</button>
            </div>
        </div>
    );
};

export default Checkout;
