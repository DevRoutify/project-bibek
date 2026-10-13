import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, subtotal, itemCount } = useCart();
  const [form, setForm] = useState({ name: '', address: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const shipping = useMemo(() => (subtotal > 0 ? 12.5 : 0), [subtotal]);
  const total = subtotal + shipping;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.address || !form.email) return;
    setSubmitted(true);
    clearCart();
  };

  return (
    <div className="page">
      <Navbar />
      <section className="content cart-layout">
        <div className="cart-items">
          <div className="section-heading">
            <h2>Your cart</h2>
            <span>{itemCount} item(s)</span>
          </div>
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <h3>{submitted ? 'Order placed!' : 'Your cart is empty'}</h3>
              <p>{submitted ? 'Thanks for shopping with Delhivery. We will contact you shortly.' : 'Add a few products to get started.'}</p>
              <Link to="/" className="button primary">{submitted ? 'Shop again' : 'Continue shopping'}</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)} each</p>
                </div>
                <div className="cart-controls">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                <button className="text-button" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))
          )}
        </div>

        <aside className="summary-card">
          <h3>Order summary</h3>
          <div className="summary-row">
            <span>Items</span>
            <span>{itemCount}</span>
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="summary-row strong-row">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <label>
              Full name
              <input name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" required />
            </label>
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
            </label>
            <label>
              Delivery address
              <textarea name="address" value={form.address} onChange={handleChange} placeholder="123 Main Street" required />
            </label>
            <button className="button primary full-width" type="submit">Place order</button>
          </form>
        </aside>
      </section>
    </div>
  );
}

export default CartPage;
