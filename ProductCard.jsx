function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="card-footer">
          <span>${product.price.toFixed(2)}</span>
          <button onClick={() => onAddToCart(product)}>Add to cart</button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
