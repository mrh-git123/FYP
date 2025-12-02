import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Lock, Truck, CreditCard, MapPin, Package } from 'lucide-react';
import api from '../api/client';
import type { Address, CartResponse, Order } from '../types';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm<Address>({
    defaultValues: { country: 'United States' },
  });

  const { data: cartData } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data } = await api.get<CartResponse>('/cart');
      return data;
    },
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

  const { errors } = form.formState;

  return (
    <main className="page checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>
            <Lock size={32} />
            Secure Checkout
          </h1>
          <p>Complete your order with confidence. All transactions are encrypted and secure.</p>
        </div>

        <div className="checkout-layout">
          {/* Left Column - Forms */}
          <div className="checkout-main">
            {/* Shipping Address */}
            <section className="checkout-section">
              <div className="section-header">
                <MapPin size={24} />
                <div>
                  <h2>Shipping Address</h2>
                  <p>Where should we deliver your order?</p>
                </div>
              </div>

              <form onSubmit={onSubmit} className="checkout-form">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="line1">
                      Address Line 1 <span className="required">*</span>
                    </label>
                    <input
                      id="line1"
                      type="text"
                      placeholder="Street address, P.O. box"
                      {...form.register('line1', { required: 'Address is required' })}
                      className={errors.line1 ? 'error' : ''}
                    />
                    {errors.line1 && <span className="error-message">{errors.line1.message}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="line2">Address Line 2</label>
                    <input
                      id="line2"
                      type="text"
                      placeholder="Apartment, suite, unit, building, floor, etc."
                      {...form.register('line2')}
                    />
                  </div>
                </div>

                <div className="form-row form-row-2">
                  <div className="form-field">
                    <label htmlFor="city">
                      City <span className="required">*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      placeholder="City"
                      {...form.register('city', { required: 'City is required' })}
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-message">{errors.city.message}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="state">
                      State <span className="required">*</span>
                    </label>
                    <input
                      id="state"
                      type="text"
                      placeholder="State / Province"
                      {...form.register('state', { required: 'State is required' })}
                      className={errors.state ? 'error' : ''}
                    />
                    {errors.state && <span className="error-message">{errors.state.message}</span>}
                  </div>
                </div>

                <div className="form-row form-row-2">
                  <div className="form-field">
                    <label htmlFor="postalCode">
                      Postal Code <span className="required">*</span>
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      placeholder="ZIP / Postal code"
                      {...form.register('postalCode', { required: 'Postal code is required' })}
                      className={errors.postalCode ? 'error' : ''}
                    />
                    {errors.postalCode && <span className="error-message">{errors.postalCode.message}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="country">
                      Country <span className="required">*</span>
                    </label>
                    <input
                      id="country"
                      type="text"
                      placeholder="Country"
                      {...form.register('country', { required: 'Country is required' })}
                      className={errors.country ? 'error' : ''}
                    />
                    {errors.country && <span className="error-message">{errors.country.message}</span>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-submit"
                  disabled={orderMutation.isPending}
                >
                  <CreditCard size={20} />
                  {orderMutation.isPending ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </section>

            {/* Delivery Info */}
            <section className="checkout-info-cards">
              <div className="info-card">
                <Truck size={24} />
                <div>
                  <strong>Fast Delivery</strong>
                  <p>2-5 business days shipping</p>
                </div>
              </div>
              <div className="info-card">
                <Lock size={24} />
                <div>
                  <strong>Secure Payment</strong>
                  <p>256-bit SSL encryption</p>
                </div>
              </div>
              <div className="info-card">
                <Package size={24} />
                <div>
                  <strong>Free Returns</strong>
                  <p>30-day return policy</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Order Summary */}
          <aside className="checkout-sidebar">
            <div className="order-summary-card">
              <h2>Order Summary</h2>

              {cartData && cartData.items.length > 0 ? (
                <>
                  <div className="order-items">
                    {cartData.items.map((item) => (
                      <div key={item.product._id} className="order-item">
                        <img
                          src={item.product.images?.[0] || 'https://via.placeholder.com/80'}
                          alt={item.product.name}
                        />
                        <div className="order-item-details">
                          <h4>{item.product.name}</h4>
                          <p>Qty: {item.quantity}</p>
                        </div>
                        <div className="order-item-price">
                          ${((item.product.salePrice ?? item.product.price) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-totals">
                    <div className="total-row">
                      <span>Subtotal ({cartData.items.length} items)</span>
                      <span>${cartData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="total-row">
                      <span>Shipping</span>
                      <span>${cartData.shipping.toFixed(2)}</span>
                    </div>
                    <div className="total-row total-final">
                      <span>Total</span>
                      <span>${cartData.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="checkout-security">
                    <Lock size={16} />
                    <p>All payments are encrypted and processed securely. Your information is protected.</p>
                  </div>
                </>
              ) : (
                <div className="empty-cart">
                  <Package size={48} />
                  <p>Your cart is empty</p>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => navigate('/catalog')}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
