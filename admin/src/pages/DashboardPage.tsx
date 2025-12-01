import { useQuery } from '@tanstack/react-query';
import { BarChart3, PackageCheck, ShoppingCart, Users } from 'lucide-react';
import adminApi from '../api/client';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import type { DashboardOverview, Order } from '../types';

const DashboardPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-overview'],
    queryFn: async () => {
      const { data: response } = await adminApi.get<DashboardOverview>('/admin/overview');
      return response;
    },
  });

  if (isLoading || !data) {
    return (
      <div className="page-center">
        <div className="spinner" />
        <p>Loading insights…</p>
      </div>
    );
  }

  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  return (
    <section className="dashboard">
      <div className="stat-grid">
        <StatCard label="Revenue" value={formatter.format(data.revenue)} delta="+12%" icon={<BarChart3 size={20} />} />
        <StatCard label="Orders" value={`${data.ordersCount}`} delta={`-${data.pendingOrders} pending`} icon={<ShoppingCart size={20} />} />
        <StatCard label="Customers" value={`${data.usersCount}`} icon={<Users size={20} />} />
        <StatCard label="Products" value={`${data.productsCount}`} icon={<PackageCheck size={20} />} />
      </div>
      <div className="card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Operations</p>
            <h3>Recent orders</h3>
          </div>
        </div>
        <div className="data-table">
          <div className="table-head">
            <span>Order</span>
            <span>Customer</span>
            <span>Total</span>
            <span>Status</span>
            <span>Payment</span>
          </div>
          {data.recentOrders.map((order: Order) => (
            <div key={order._id} className="table-row">
              <span>#{order._id.slice(-6)}</span>
              <span>{typeof order.user === 'string' ? order.user : order.user.name}</span>
              <span>{formatter.format(order.total)}</span>
              <StatusBadge status={order.status} />
              <StatusBadge status={order.paymentStatus} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
