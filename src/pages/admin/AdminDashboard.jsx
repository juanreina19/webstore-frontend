import { useState, useEffect, useContext } from "react";
import { apiFetch } from "../../api/api";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import AdminNavbar from "../../components/admin/AdminNavbar";
import "../../styles/admin/admin-dashboard.css";
import "../../styles/admin/admin-products.css";
import "../../styles/admin/admin-sales.css";

const AdminDashboard = () => {
    const { token } = useContext(AdminAuthContext);
    const [products, setProducts] = useState([]);
    const [stats, setStats] = useState([]);
    const [form, setForm] = useState({ name: "", price: "", available: true });
    const [editId, setEditId] = useState(null); // ID del producto en edición
    const [editForm, setEditForm] = useState({ name: "", price: "", available: true });

    const fetchProducts = async () => {
        const data = await apiFetch("/products/admin/all", "GET", null, token);
        setProducts(data.products || []);
    };

    const fetchStats = async () => {
        const data = await apiFetch("/orders/stats", "GET", null, token);
        setStats(data.stats || []);
    };

    useEffect(() => {
        fetchProducts();
        fetchStats();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        await apiFetch("/products", "POST", form, token);
        setForm({ name: "", price: "", available: true });
        fetchProducts();
    };

    const handleDelete = async (id) => {
        await apiFetch(`/products/${id}`, "DELETE", null, token);
        fetchProducts();
    };

    const handleEditClick = (product) => {
        setEditId(product._id);
        setEditForm({
            name: product.name,
            price: product.price,
            available: product.available,
        });
    };

    const handleCancelEdit = () => {
        setEditId(null);
        setEditForm({ name: "", price: "", available: true });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await apiFetch(`/products/${editId}`, "PUT", editForm, token);
        setEditId(null);
        fetchProducts();
    };

    return (
        <div className="admin-dashboard">
            <AdminNavbar />

            {/* SECCIÓN PRODUCTOS */}
            <section className="admin-section">
                <h3>Gestión de Productos</h3>
                <form onSubmit={handleAdd} className="admin-product-form">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Precio"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        required
                    />
                    <label>
                        Disponible:
                        <input
                            type="checkbox"
                            checked={form.available}
                            onChange={(e) => setForm({ ...form, available: e.target.checked })}
                        />
                    </label>
                    <button type="submit">Agregar</button>
                </form>

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
                            <tr key={p._id} className={editId === p._id ? "editing" : ""}>
                                <td>
                                    {editId === p._id ? (
                                        <input
                                            type="text"
                                            value={editForm.name}
                                            onChange={(e) =>
                                                setEditForm({ ...editForm, name: e.target.value })
                                            }
                                        />
                                    ) : (
                                        p.name
                                    )}
                                </td>
                                <td>
                                    {editId === p._id ? (
                                        <input
                                            type="number"
                                            value={editForm.price}
                                            onChange={(e) =>
                                                setEditForm({ ...editForm, price: e.target.value })
                                            }
                                        />
                                    ) : (
                                        `$${p.price}`
                                    )}
                                </td>
                                <td>
                                    {editId === p._id ? (
                                        <input
                                            type="checkbox"
                                            checked={editForm.available}
                                            onChange={(e) =>
                                                setEditForm({
                                                    ...editForm,
                                                    available: e.target.checked,
                                                })
                                            }
                                        />
                                    ) : p.available ? (
                                        "Sí"
                                    ) : (
                                        "No"
                                    )}
                                </td>
                                <td>
                                    {editId === p._id ? (
                                        <>
                                            <button onClick={handleUpdate}>Guardar</button>
                                            <button onClick={handleCancelEdit}>Cancelar</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditClick(p)}>Editar</button>
                                            <button onClick={() => handleDelete(p._id)}>Eliminar</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* SECCIÓN ESTADÍSTICAS */}
            <section className="admin-section">
                <h3>Ventas por usuario</h3>
                <div className="admin-sales">
                    {stats.map((s) => (
                        <div key={s.userId} className="admin-sales__card">
                            <h4>{s.userName}</h4>
                            <ul>
                                {s.sales.map((sale) => (
                                    <li key={sale.productId}>
                                        {sale.productName}: {sale.totalQuantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;
