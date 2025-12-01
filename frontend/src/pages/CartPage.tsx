import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import type { CartResponse } from '../types';

const CartPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data: response } = await api.get<CartResponse>('/cart');
      return response;
    },
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['cart'] });

  const updateQty = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      api.put(`/cart/${productId}`, { quantity }),
    onSuccess: invalidate,
  });

  const removeItem = useMutation({
    mutationFn: (productId: string) => api.delete(`/cart/${productId}`),
    onSuccess: invalidate,
  });

  const clearCart = useMutation({
    mutationFn: () => api.delete('/cart'),
    onSuccess: invalidate,
  });

  if (isLoading || !data) {
    return (
      <main className="page-center">
        <div className="spinner" />
      </main>
    );
  }

  return (
    <main className="page cart-page">
      <div className="cart-items">
        <div className="section-heading">
          <div>
            <h1>Your cart</h1>
            <p>Review items before a fast, secure checkout.</p>
          </div>
          {!!data.items.length && (
            <div className="heading-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => clearCart.mutate()}
                disabled={clearCart.isPending}
              >
                Clear cart
              </button>
            </div>
          )}
        </div>
        {data.items.length === 0 && <p>Your cart is empty.</p>}
        {data.items.map((item) => (
          <article key={item.product._id} className="cart-row">
            <img
              src={item.product.images?.[0] ?? 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'}
              alt={item.product.name}
            />
            <div>
              <h3>{item.product.name}</h3>
              <p>${item.product.salePrice ?? item.product.price}</p>
              <div className="cart-row-actions">
                <label>
                  Qty
                  <input
                    type="number"
                    min={1}
                    max={item.product.stock}
                    value={item.quantity}
                    onChange={(event) => {
                      const value = Math.max(1, Number(event.currentTarget.value) || 1);
                      updateQty.mutate({
                        productId: item.product._id,
                        quantity: Math.min(value, item.product.stock ?? value),
                      });
                    }}
                  />
                </label>
                <button type="button" onClick={() => removeItem.mutate(item.product._id)} className="btn btn-ghost">
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <aside className="cart-summary">
        <h2>Summary</h2>
        <dl>
          <div>
            <dt>Subtotal</dt>
            <dd>${data.subtotal.toFixed(2)}</dd>
          </div>
          <div>
            <dt>Shipping</dt>
            <dd>${data.shipping.toFixed(2)}</dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd>${data.total.toFixed(2)}</dd>
          </div>
        </dl>
        <button type="button" className="btn btn-primary" disabled={!data.items.length} onClick={() => navigate('/checkout')}>
          Proceed to checkout
        </button>
      </aside>
    </main>
  );
};

export default CartPage;
