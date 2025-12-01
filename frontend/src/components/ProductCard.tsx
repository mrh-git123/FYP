import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Plus } from 'lucide-react';
import type { Product } from '../types';

interface Props {
  product: Product;
  onAddToCart?: (productId: string) => void;
  variant?: 'default' | 'compact';
}

const fallbackImage = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80';

const ProductCard = ({ product, onAddToCart, variant = 'default' }: Props) => {
  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <article className={`product-card group ${variant}`}>
      <div className="product-image-container">
        <img
          src={product.images?.[0] ?? fallbackImage}
          alt={product.name}
          loading="lazy"
        />
        {discount > 0 && (
          <span className="discount-badge">
            {discount}% OFF
          </span>
        )}

        {variant === 'compact' && onAddToCart && (
          <button
            type="button"
            onClick={() => onAddToCart(product._id)}
            className="btn-quick-add"
            aria-label="Add to cart"
          >
            <Plus size={20} />
          </button>
        )}
      </div>

      <div className="product-content">
        {variant === 'default' && (
          <div className="product-header">
            <Link to={`/products/${product._id}`} className="product-title-link">
              <h3>{product.name}</h3>
            </Link>

            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.round(product.rating || 0) ? "star-filled" : "star-empty"}
                    fill={i < Math.round(product.rating || 0) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="rating-value">{product.rating?.toFixed(1) || '0.0'}</span>
            </div>
          </div>
        )}

        {variant === 'compact' && (
          <div className="product-price-wrapper compact">
            <span className="current-price">
              Rs.{(product.salePrice ?? product.price).toLocaleString()}
            </span>
            {product.salePrice && (
              <span className="original-price">Rs.{product.price.toLocaleString()}</span>
            )}
          </div>
        )}

        {variant === 'compact' && (
          <Link to={`/products/${product._id}`} className="product-title-link compact">
            <h3>{product.name}</h3>
          </Link>
        )}

        {variant === 'default' && (
          <div className="product-footer">
            <div className="product-price-wrapper">
              <span className="current-price">
                ${(product.salePrice ?? product.price).toFixed(2)}
              </span>
              {product.salePrice && (
                <span className="original-price">${product.price.toFixed(2)}</span>
              )}
            </div>

            {onAddToCart && (
              <button
                type="button"
                onClick={() => onAddToCart(product._id)}
                className="btn-add-to-cart"
              >
                <ShoppingCart size={18} />
                Add to cart
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
