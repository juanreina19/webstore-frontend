import "../styles/user/home.css";

const ProductCard = ({ product, isSelected, onAdd, onRemove }) => {
    return (
        <div className={`user-home__card ${isSelected ? "selected" : ""}`}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            {isSelected ? (
                <button
                    className="user-home__btn remove"
                    onClick={() => onRemove(product._id)}
                >
                    Quitar
                </button>
            ) : (
                <button
                    className="user-home__btn add"
                    onClick={() => onAdd(product)}
                >
                    Agregar
                </button>
            )}
        </div>
    );
};

export default ProductCard;
