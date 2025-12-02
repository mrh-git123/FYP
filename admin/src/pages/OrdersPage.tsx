import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import adminApi from '../api/client';
import type { Order } from '../types';
import StatusBadge from '../components/StatusBadge';

const OrdersPage = () => {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data: response } = await adminApi.get<Order[]>('/admin/orders');
      return response;
    },
  });

  const updateOrder = useMutation({
    mutationFn: ({ id, status, paymentStatus }: { id: string; status?: string; paymentStatus?: string }) =>
      adminApi.put(`/orders/${id}/status`, { status, paymentStatus }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] }),
  });

  const filteredOrders = useMemo(() => {
    if (!data) return [];
    if (!search) return data;
    const term = search.toLowerCase();
    return data.filter((order) => {
      const customer = typeof order.user === 'string' ? order.user : `${order.user.name} ${order.user.email}`;
      return (
        order._id.toLowerCase().includes(term) ||
        (order.trackingNumber ?? '').toLowerCase().includes(term) ||
        customer.toLowerCase().includes(term)
      );
    });
  }, [data, search]);

  if (isLoading) {
    return (
      <div className="page-center">
        <div className="spinner" />
        <p>Loading orders…</p>
      </div>
    );
  }

  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Orders</p>
          <h3>End-to-end fulfillment</h3>
        </div>
        <input
          type="search"
          placeholder="Search order, tracking, or customer"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          className="search-input"
        />
      </div>
      <div className="data-table orders-table">
        <div className="table-head">
          <span>Order</span>
          <span>Customer</span>
          <span>Total</span>
          <span>Status</span>
          <span>Payment</span>
          <span>Update</span>
        </div>
        {filteredOrders.map((order) => (
          <div key={order._id} className="table-row">
            <span>#{order._id.slice(-6)}</span>
            <span>{typeof order.user === 'string' ? order.user : order.user.email}</span>
            <span>{formatter.format(order.total)}</span>
            <StatusBadge status={order.status} />
            <StatusBadge status={order.paymentStatus} />
            <div className="order-controls">
              <select
                value={order.status}
                onChange={(event) => updateOrder.mutate({ id: order._id, status: event.currentTarget.value })}
              >
                {['pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <select
                value={order.paymentStatus}
                onChange={(event) => updateOrder.mutate({ id: order._id, paymentStatus: event.currentTarget.value })}
              >
                {['pending', 'paid', 'failed', 'refunded'].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrdersPage;
