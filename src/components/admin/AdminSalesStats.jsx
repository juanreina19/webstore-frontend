import "../../styles/admin/admin-sales.css";

const AdminSalesStats = ({ stats }) => {
    if (!stats.length) return <p>No hay ventas registradas.</p>;

    return (
        <div className="admin-sales">
            {stats.map((s, i) => (
                <div key={i} className="admin-sales__card">
                    <h4>{s.user}</h4>
                    <ul>
                        {s.products.map((p) => (
                            <li key={p.productName}>
                                {p.productName}: {p.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default AdminSalesStats;
