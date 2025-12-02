import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { BarChart3, LogOut, Menu, PackageSearch, ShoppingBag, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/dashboard', label: 'Overview', icon: <BarChart3 size={18} /> },
  { to: '/orders', label: 'Orders', icon: <PackageSearch size={18} /> },
  { to: '/products', label: 'Products', icon: <ShoppingBag size={18} /> },
  { to: '/users', label: 'Customers', icon: <Users size={18} /> },
];

const labelMap: Record<string, string> = {
  '/dashboard': 'Overview',
  '/orders': 'Orders',
  '/products': 'Products',
  '/users': 'Customers',
};

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const activeLabel = labelMap[location.pathname] ?? 'Overview';

  return (
    <div className={`admin-shell ${sidebarOpen ? 'open' : ''}`}>
      <aside className="sidebar">
        <div className="brand">Stellar Admin</div>
        <nav>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }: { isActive: boolean }) => (isActive ? 'active' : undefined)}
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="admin-content">
        <header className="top-bar">
          <button type="button" className="btn-icon" onClick={() => setSidebarOpen((prev) => !prev)}>
            <Menu size={18} />
          </button>
          <div>
            <p className="eyebrow">Control center</p>
            <h2>{activeLabel}</h2>
          </div>
          <div className="top-actions">
            {user && (
              <div className="profile-pill">
                <span>{user.name}</span>
                <small>{user.email}</small>
              </div>
            )}
            <button type="button" className="btn btn-ghost" onClick={logout}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
