import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-main">
        <Link to="/" className="brand" onClick={closeMenu}>Delhivery</Link>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>

          <div
            className={`nav-item has-dropdown ${dropdownOpen ? 'open' : ''}`}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              className="nav-link dropdown-trigger"
              onClick={() => setDropdownOpen((prev) => !prev)}
              onMouseEnter={() => setDropdownOpen(true)}
            >
              Categories
            </button>
            <div className="dropdown-menu">
              <Link to="/" className="dropdown-link" onClick={closeMenu}>Electronics</Link>
              <Link to="/" className="dropdown-link" onClick={closeMenu}>Accessories</Link>
              <Link to="/" className="dropdown-link" onClick={closeMenu}>Lifestyle</Link>
            </div>
          </div>

          <Link to="/" className="nav-link" onClick={closeMenu}>Deals</Link>
          <Link to="/" className="nav-link" onClick={closeMenu}>New Arrivals</Link>
          <Link to="/cart" className="nav-link cart-link" onClick={closeMenu}>Cart ({itemCount})</Link>
        </div>
      </div>

      <div className="navbar-submenu" aria-label="Quick links">
        <Link to="/" className="submenu-link" onClick={closeMenu}>Featured</Link>
        <Link to="/" className="submenu-link" onClick={closeMenu}>Best Sellers</Link>
        <Link to="/" className="submenu-link" onClick={closeMenu}>Support</Link>
      </div>
    </nav>
  );
}

export default Navbar;
