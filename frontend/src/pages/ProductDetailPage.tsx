import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, Heart, Share2, ShoppingCart, Minus, Plus, Truck, Shield, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import api from '../api/client';
import type { Product } from '../types';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data: product } = await api.get<Product>(`/products/${id}`);
      return product;
    },
    enabled: Boolean(id),
  });

  const { data: suggestedProducts } = useQuery({
    queryKey: ['products', 'suggested', data?.category],
    queryFn: async () => {
      const { data: products } = await api.get<Product[]>('/products', {
        params: { category: data?.category, limit: 4 },
      });
      return products.filter((p) => p._id !== id);
    },
    enabled: Boolean(data?.category),
  });

  const { mutateAsync: addToCart, isPending } = useMutation({
    mutationFn: async (qty: number) => {
      if (!id) throw new Error('Missing product id');
      return api.post('/cart', { productId: id, quantity: qty });
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
    await addToCart(quantity);
  };

  const handleQuantityChange = (delta: number) => {
    const newQty = Math.max(1, Math.min(data.stock, quantity + delta));
    setQuantity(newQty);
  };

  const gallery = data.images?.length ? data.images : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'];
  const discount = data.salePrice ? Math.round(((data.price - data.salePrice) / data.price) * 100) : 0;
  const rating = data.rating ?? 4.5;
  const numReviews = data.numReviews ?? 0;

  return (
    <main className="page">
      <div className="product-detail-container">
        {/* Image Gallery */}
        <div className="product-gallery">
          <div className="gallery-main">
            <img src={gallery[selectedImage]} alt={data.name} />
            {discount > 0 && <span className="discount-badge-lg">-{discount}%</span>}
          </div>
          {gallery.length > 1 && (
            <div className="gallery-thumbnails">
              {gallery.map((image, idx) => (
                <button
                  key={image}
                  type="button"
                  className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img src={image} alt={`${data.name} ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="product-breadcrumb">
            {data.category && <span>{data.category}</span>}
          </div>

          <h1 className="product-title">{data.name}</h1>

          <div className="product-rating">
            <div className="stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < Math.floor(rating) ? '#fbbf24' : 'none'}
                  stroke={i < Math.floor(rating) ? '#fbbf24' : '#cbd5e1'}
                />
              ))}
            </div>
            <span className="rating-text">
              {rating.toFixed(1)} ({numReviews} reviews)
            </span>
          </div>

          <div className="product-price-section">
            <div className="price-group">
              <span className="price-current">${data.salePrice ?? data.price}</span>
              {data.salePrice && <span className="price-original">${data.price}</span>}
            </div>
            <div className="stock-info">
              {data.stock > 0 ? (
                <span className="in-stock">✓ In Stock ({data.stock} available)</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>
          </div>

          <p className="product-description">{data.description}</p>

          {/* Quantity & Actions */}
          <div className="product-actions">
            <div className="quantity-selector">
              <button
                type="button"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus size={18} />
              </button>
              <input
                type="number"
                min="1"
                max={data.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(data.stock, parseInt(e.target.value) || 1)))}
              />
              <button
                type="button"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= data.stock}
                aria-label="Increase quantity"
              >
                <Plus size={18} />
              </button>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-add-cart"
              onClick={handleAddToCart}
              disabled={isPending || data.stock === 0}
            >
              <ShoppingCart size={20} />
              {isPending ? 'Adding...' : 'Add to Cart'}
            </button>

            <button type="button" className="btn btn-icon" aria-label="Add to wishlist">
              <Heart size={20} />
            </button>

            <button type="button" className="btn btn-icon" aria-label="Share product">
              <Share2 size={20} />
            </button>
          </div>

          {/* Features */}
          <div className="product-features">
            <div className="feature-item">
              <Truck size={24} />
              <div>
                <strong>Free Shipping</strong>
                <p>On orders over $50</p>
              </div>
            </div>
            <div className="feature-item">
              <Shield size={24} />
              <div>
                <strong>2 Year Warranty</strong>
                <p>Protection included</p>
              </div>
            </div>
            <div className="feature-item">
              <RefreshCw size={24} />
              <div>
                <strong>30-Day Returns</strong>
                <p>Hassle-free returns</p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="product-details-card">
            <h3>Product Details</h3>
            <ul>
              <li><strong>SKU:</strong> {data._id.slice(-8).toUpperCase()}</li>
              <li><strong>Category:</strong> {data.category}</li>
              {data.tags && data.tags.length > 0 && (
                <li>
                  <strong>Tags:</strong> {data.tags.join(', ')}
                </li>
              )}
              <li><strong>Availability:</strong> {data.stock > 0 ? 'In Stock' : 'Out of Stock'}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Suggested Products */}
      {suggestedProducts && suggestedProducts.length > 0 && (
        <section className="suggested-products">
          <h2 className="section-title">You May Also Like</h2>
          <div className="products-grid">
            {suggestedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetailPage;
