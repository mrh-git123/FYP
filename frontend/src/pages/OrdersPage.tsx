import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import type { Order } from '../types';
import SectionHeading from '../components/SectionHeading';

const OrdersPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data: response } = await api.get<Order[]>('/orders');
      return response;
    },
  });

  if (isLoading) {
    return (
      <main className="page-center">
        <div className="spinner" />
      </main>
    );
  }

  return (
    <main className="page orders-page">
      <SectionHeading
        eyebrow="Orders"
        title="Every delivery, transparently tracked"
        description="Monitor fulfillment, download invoices, and peek at the journey of every package."
      />
      {data?.length ? (
        <div className="orders-grid">
          {data.map((order) => {
            const trackingLabel = order.trackingNumber ?? order._id.slice(-6).toUpperCase();
            const statusClass =
              order.status === 'delivered' ? 'success' : order.status === 'pending' ? 'pending' : order.status === 'cancelled' ? 'danger' : '';
            return (
              <article key={order._id} className="order-card">
                <header>
                  <h3>#{trackingLabel}</h3>
                  <span className={`badge ${statusClass}`}>{order.status}</span>
                </header>
                <p className="order-total">${order.total.toFixed(2)}</p>
                <ul>
                  {order.items.map((item) => (
                    <li key={`${order._id}-${item.name}`}>
                      {item.quantity}× {item.name}
                    </li>
                  ))}
                </ul>
                <div className="timeline">
                  {order.statusTimeline?.map((entry) => (
                    <span key={`${entry.status}-${entry.changedAt}`}>{entry.status}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="empty-state">You do not have any orders yet.</p>
      )}
    </main>
  );
};

export default OrdersPage;
