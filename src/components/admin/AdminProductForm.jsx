import { useState } from "react";
import { apiFetch } from "../../api/api";
import "../../styles/admin/admin-products.css";

const AdminProductForm = ({ onRefresh }) => {
    const [form, setForm] = useState({ name: "", price: "", available: true });
    const token = localStorage.getItem("adminToken");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await apiFetch("/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
        });
        setForm({ name: "", price: "", available: true });
        onRefresh();
    };

    return (
        <form className="admin-product-form" onSubmit={handleSubmit}>
            <input
                name="name"
                placeholder="Nombre del producto"
                value={form.name}
                onChange={handleChange}
                required
            />
            <input
                name="price"
                type="number"
                placeholder="Precio"
                value={form.price}
                onChange={handleChange}
                required
            />
            <button type="submit">Crear</button>
        </form>
    );
};

export default AdminProductForm;
