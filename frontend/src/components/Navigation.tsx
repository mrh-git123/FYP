import { Link, NavLink } from 'react-router-dom';
import { Bell, ShoppingBag, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import type { CartResponse } from '../types';

const Navigation = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data } = await api.get<CartResponse>('/cart');
      return data;
    },
    enabled: !!user,
    retry: false,
  });

  const cartItemCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/shop', label: 'Shop' },
    { to: '/orders', label: 'Orders' },
    { to: '/about', label: 'About' },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="nav-wrapper">
      <div className="announcement-bar">
        <Bell size={16} /> 
        <span>Free climate-neutral shipping on orders over $250 this week only</span>
      </div>
      <div className="nav-inner">
        <Link to="/" className="brand">
          <ShoppingBag size={26} />
          <span>Stellar Shop</span>
        </Link>

        <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {links.map((link) => (
            <NavLink 
              key={link.to} 
              to={link.to} 
              end={link.end} 
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeMobileMenu}
            >
              {link.label}
            </NavLink>
          ))}
          
          {/* Mobile only - user menu items */}
          <div className="mobile-user-section">
            {user ? (
              <>
                <NavLink to="/profile" onClick={closeMobileMenu}>
                  <User size={18} />
                  Profile
                </NavLink>
                <button type="button" onClick={() => { logout(); closeMobileMenu(); }} className="nav-logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="btn btn-primary" onClick={closeMobileMenu}>
                Sign in
              </Link>
            )}
          </div>
        </nav>

        <div className="nav-actions">
          <Link to="/cart" className="btn-icon" title="Cart">
            <ShoppingCart size={20} />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
          
          {/* Desktop only user menu */}
          <div className="desktop-user-menu">
            {user ? (
              <div className="user-menu">
                <Link to="/profile" className="btn-icon" title="Profile">
                  <User size={20} />
                </Link>
                <button type="button" onClick={logout} className="btn btn-ghost">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/auth" className="btn btn-primary">
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button 
            type="button" 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu} />
      )}
    </header>
  );
};

export default Navigation;
