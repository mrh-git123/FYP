import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import type { Address, CartResponse, Order } from '../types';
import SectionHeading from '../components/SectionHeading';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm<Address>({
    defaultValues: { country: 'United States' },
  });

  const orderMutation = useMutation({
    mutationFn: (payload: { shippingAddress: Address }) => api.post<Order>('/orders', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      navigate('/orders');
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await orderMutation.mutateAsync({ shippingAddress: values });
  });

  const cartSnapshot = queryClient.getQueryData<CartResponse>(['cart']);

  return (
    <main className="page checkout-page">
      <SectionHeading
        eyebrow="Checkout"
        title="Secure payment & express fulfillment"
        description="Shipping details help us auto-populate labels and surface the best carrier for your destination."
      />
      <div className="checkout-grid">
        <form onSubmit={onSubmit} className="card form-grid">
          {['line1', 'line2', 'city', 'state', 'postalCode', 'country'].map((field) => (
            <label key={field} className={field === 'line2' ? 'full' : ''}>
              <span>{field}</span>
              <input type="text" {...form.register(field as keyof Address)} />
            </label>
          ))}
          <button type="submit" className="btn btn-primary" disabled={orderMutation.isPending}>
            {orderMutation.isPending ? 'Processing…' : 'Place order'}
          </button>
        </form>
        <aside className="checkout-summary">
          <h3>Order review</h3>
          {cartSnapshot ? (
            <dl>
              <div>
                <dt>Items</dt>
                <dd>{cartSnapshot.items.length}</dd>
              </div>
              <div>
                <dt>Subtotal</dt>
                <dd>${cartSnapshot.subtotal.toFixed(2)}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>${cartSnapshot.shipping.toFixed(2)}</dd>
              </div>
              <div>
                <dt>Total</dt>
                <dd>${cartSnapshot.total.toFixed(2)}</dd>
              </div>
            </dl>
          ) : (
            <p className="lead">Your latest cart will appear here once loaded.</p>
          )}
          <p className="lead">We encrypt every payment and update tracking automatically.</p>
        </aside>
      </div>
    </main>
  );
};

export default CheckoutPage;
