import { useQuery } from '@tanstack/react-query';
import { Package, Clock, CheckCircle, XCircle, Truck, Calendar, DollarSign, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import api from '../api/client';
import type { Order } from '../types';

const OrdersPage = () => {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

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

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle size={20} />;
      case 'pending':
        return <Clock size={20} />;
      case 'cancelled':
        return <XCircle size={20} />;
      case 'shipped':
        return <Truck size={20} />;
      default:
        return <Package size={20} />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'status-delivered';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      case 'shipped':
        return 'status-shipped';
      default:
        return 'status-processing';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <main className="page orders-page-modern">
      <div className="orders-container">
        <div className="orders-header">
          <div>
            <h1>
              <ShoppingBag size={32} />
              My Orders
            </h1>
            <p>Track your orders and view their delivery status</p>
          </div>
          <div className="orders-stats">
            <div className="stat-item">
              <span className="stat-value">{data?.length || 0}</span>
              <span className="stat-label">Total Orders</span>
            </div>
          </div>
        </div>

        {data && data.length > 0 ? (
          <div className="orders-list">
            {data.map((order) => {
              const trackingLabel = order.trackingNumber ?? `TRK-${order._id.slice(-12).toUpperCase()}`;
              const statusClass = getStatusClass(order.status);
              const orderDate = formatDate(order.createdAt);
              const isExpanded = expandedOrders.has(order._id);

              return (
                <article key={order._id} className={`order-card-modern ${isExpanded ? 'expanded' : ''}`}>
                  <div className="order-header">
                    <div className="order-info">
                      <div className="order-number">
                        <Package size={18} />
                        <span>#{trackingLabel}</span>
                      </div>
                      <div className="order-date">
                        <Calendar size={16} />
                        <span>{orderDate}</span>
                      </div>
                    </div>
                    <div className={`order-status ${statusClass}`}>
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </div>
                  </div>

                  {/* Minimal Summary */}
                  <div className="order-summary-minimal">
                    <div className="summary-info">
                      <span className="items-count">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                      <span className="total-price">
                        <DollarSign size={16} />
                        {order.total.toFixed(2)}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm btn-track"
                      onClick={() => toggleOrderExpansion(order._id)}
                    >
                      {isExpanded ? (
                        <>
                          Hide Details
                          <ChevronUp size={16} />
                        </>
                      ) : (
                        <>
                          Track Order
                          <ChevronDown size={16} />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <>
                      <div className="order-body">
                        <div className="order-items">
                          <h4>Items ({order.items.length})</h4>
                          <ul>
                            {order.items.map((item, idx) => (
                              <li key={`${order._id}-${idx}`}>
                                <div className="item-image">
                                  {item.image ? (
                                    <img src={item.image} alt={item.name} />
                                  ) : (
                                    <div className="item-placeholder">
                                      <Package size={20} />
                                    </div>
                                  )}
                                </div>
                                <div className="item-details">
                                  <span className="item-name">{item.name}</span>
                                  <span className="item-quantity">Qty: {item.quantity}</span>
                                </div>
                                <div className="item-price">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="order-summary">
                          <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${order.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="summary-row">
                            <span>Shipping</span>
                            <span>${order.shippingFee.toFixed(2)}</span>
                          </div>
                          <div className="summary-row summary-total">
                            <span>Total</span>
                            <span className="total-amount">
                              <DollarSign size={18} />
                              {order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {order.statusTimeline && order.statusTimeline.length > 0 && (
                        <div className="order-timeline">
                          <h4>Order Timeline</h4>
                          <div className="timeline-steps">
                            {order.statusTimeline.map((entry, idx) => (
                              <div key={`${entry.status}-${idx}`} className="timeline-step">
                                <div className="timeline-icon">
                                  {getStatusIcon(entry.status)}
                                </div>
                                <div className="timeline-content">
                                  <span className="timeline-status">{entry.status}</span>
                                  {entry.note && <span className="timeline-note">{entry.note}</span>}
                                  <span className="timeline-date">
                                    {formatDate(entry.changedAt)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="orders-empty">
            <Package size={64} />
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders yet. Start shopping to see your orders here.</p>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => window.location.href = '/catalog'}
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default OrdersPage;
