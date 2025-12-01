import { Link, NavLink } from 'react-router-dom';
import { Bell, ShoppingBag, ShoppingCart, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import type { CartResponse } from '../types';

const Navigation = () => {
  const { user, logout } = useAuth();

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

  return (
    <header className="nav-wrapper">
      <div className="announcement-bar">
        <Bell size={16} /> Free climate-neutral shipping on orders over $250 this week only
      </div>
      <div className="nav-inner">
        <Link to="/" className="brand">
          <ShoppingBag size={26} />
          <span>Stellar Shop</span>
        </Link>

        <nav>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <Link to="/cart" className="btn-icon" title="Cart">
            <ShoppingCart size={20} />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
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
      </div>
    </header>
  );
};

export default Navigation;
