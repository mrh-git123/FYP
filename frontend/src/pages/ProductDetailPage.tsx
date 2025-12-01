import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/client';
import type { Product } from '../types';
import { useAuth } from '../context/AuthContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data: product } = await api.get<Product>(`/products/${id}`);
      return product;
    },
    enabled: Boolean(id),
  });

  const { mutateAsync: addToCart, isPending } = useMutation({
    mutationFn: async (quantity: number) => {
      if (!id) throw new Error('Missing product id');
      return api.post('/cart', { productId: id, quantity });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  if (isLoading || !data) {
    return (
      <main className="page-center">
        <div className="spinner" />
      </main>
    );
  }

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/auth', { state: { from: `/products/${id}` } });
      return;
    }
    await addToCart(1);
  };

  const gallery = data.images?.length ? data.images : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'];

  return (
    <main className="page product-detail">
      <div className="gallery-stack">
        {gallery.slice(0, 2).map((image) => (
          <img key={image} src={image} alt={data.name} loading="lazy" />
        ))}
      </div>
      <div className="detail-meta">
        <p className="product-category">{data.category}</p>
        <h1>{data.name}</h1>
        <p className="lead">{data.description}</p>
        <div className="product-price">
          ${data.salePrice ?? data.price}
          {data.salePrice && <span className="striked">${data.price}</span>}
        </div>
        <p>In stock: {data.stock}</p>
        <div className="hero-cta">
          <button type="button" className="btn btn-primary" onClick={handleAddToCart} disabled={isPending}>
            {isPending ? 'Adding…' : 'Add to cart'}
          </button>
          <button type="button" className="btn btn-ghost">
            Save for later
          </button>
        </div>
        <div className="detail-card">
          <strong>What to expect</strong>
          <ul>
            <li>48-hour dispatch window &amp; tracked shipping worldwide.</li>
            <li>Complimentary care guide and two-year warranty.</li>
            <li>Dedicated concierge support for fit and styling questions.</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
