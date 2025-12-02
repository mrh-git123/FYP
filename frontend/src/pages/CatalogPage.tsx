import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/client';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import SectionHeading from '../components/SectionHeading';

const useFilters = () => {
  const [params, setParams] = useSearchParams();
  const filters = useMemo(
    () => ({
      page: Number(params.get('page') ?? '1'),
      search: params.get('search') ?? '',
      category: params.get('category') ?? '',
    }),
    [params]
  );
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    next.set('page', '1');
    setParams(next);
  };

  return { filters, update } as const;
};

const categories = ['Bags', 'Electronics', 'Home', 'Shoes'];

const CatalogPage = () => {
  const { filters, update } = useFilters();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const { data: response } = await api.get<{
        products: Product[];
        page: number;
        totalPages: number;
        total: number;
      }>('/products', {
        params: { page: filters.page, search: filters.search, category: filters.category },
      });
      return response;
    },
  });

  const { mutateAsync: addToCart, isPending: addingToCart } = useMutation({
    mutationFn: (productId: string) => api.post('/cart', { productId, quantity: 1 }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const handleAddToCart = async (productId: string) => {
    if (!user) {
      navigate('/auth', { state: { from: '/cart' } });
      return;
    }
    await addToCart(productId);
  };

  const activeResults = data?.products.length ?? 0;
  const resetFilters = () => {
    update('search', '');
    update('category', '');
  };

  return (
    <main className="page">
      <SectionHeading
        eyebrow="Catalog"
        title="Shop limited drops and modern essentials"
        description={`A curated list of goods ready to ship. ${data?.total ? `${data.total} products in rotation.` : ''}`}
        action={
          (filters.search || filters.category) && (
            <button type="button" className="btn btn-ghost" onClick={resetFilters}>
              Reset filters
            </button>
          )
        }
      />
      <div className="filters">
        <input
          type="search"
          placeholder="Search products"
          value={filters.search}
          onChange={(event) => update('search', event.currentTarget.value)}
        />
        <select value={filters.category} onChange={(event) => update('category', event.currentTarget.value)}>
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="chip-set" aria-label="quick categories">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`chip ${filters.category === category ? 'active' : ''}`}
            onClick={() => update('category', filters.category === category ? '' : category)}
          >
            {category}
          </button>
        ))}
      </div>
      <p className="lead" style={{ marginTop: '1rem' }}>
        {isLoading ? 'Loading catalog…' : `${activeResults} result${activeResults === 1 ? '' : 's'} on this page`}
      </p>
      {isError && <p className="empty-state">Something went wrong while loading the catalog.</p>}
      {!isLoading && !isError && activeResults === 0 && <p className="empty-state">No products match your filters (yet).</p>}
      <div className="product-grid">
        {data?.products.map((product) => (
          <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
      {addingToCart && <p className="lead">Adding to cart…</p>}
    </main>
  );
};

export default CatalogPage;
