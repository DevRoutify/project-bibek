import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { fetchProducts } from '../services/api';
import { products as initialProducts } from '../data/products';

function HomePage() {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true;
    fetchProducts()
      .then((data) => {
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="page">
      <Navbar />
      <section className="hero-section">
        <div className="hero-content">
          <p className="pill">Free shipping • Trending now</p>
          <h1>Shop the best deals in one place.</h1>
          <p className="hero-text">Discover essentials, gadgets, and accessories curated for everyday life.</p>
          <div className="hero-actions">
            <a href="#products" className="button primary">Shop now</a>
            <Link to="/cart" className="button secondary">View cart</Link>
          </div>
        </div>
        <div className="hero-card">
          <p>Today&apos;s spotlight</p>
          <strong>Save up to 30% on premium tech</strong>
        </div>
      </section>

      <section id="products" className="content">
        <div className="section-heading">
          <h2>Featured products</h2>
          <span>{products.length} items</span>
        </div>
        {loading ? <p>Loading products...</p> : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;
