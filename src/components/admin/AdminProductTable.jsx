import { apiFetch } from "../../api/api";
import "../../styles/admin/admin-products.css";

const AdminProductTable = ({ products, onRefresh }) => {
    const token = localStorage.getItem("adminToken");

    const handleDelete = async (id) => {
        if (!confirm("¿Seguro que quieres eliminar este producto?")) return;
        await apiFetch(`/products/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        onRefresh();
    };

    return (
        <table className="admin-product-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Disponible</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {products.map((p) => (
                    <tr key={p._id}>
                        <td>{p.name}</td>
                        <td>${p.price}</td>
                        <td>{p.available ? "Sí" : "No"}</td>
                        <td>
                            <button onClick={() => handleDelete(p._id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AdminProductTable;
