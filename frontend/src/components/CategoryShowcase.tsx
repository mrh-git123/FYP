import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import type { Product } from '../types';
import ProductCard from './ProductCard';

interface Props {
  category: string;
  title: string;
  bannerImage: string;
  link: string;
  reverse?: boolean;
}

const CategoryShowcase = ({ category, title, bannerImage, link, reverse = false }: Props) => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', category, 'showcase'],
    queryFn: async () => {
      const { data } = await api.get<{ products: Product[] }>('/products', {
        params: { category, limit: 4 },
      });
      return data.products;
    },
  });

  if (!isLoading && (!products || products.length === 0)) return null;

  return (
    <section className={`section deals-section ${reverse ? 'reverse' : ''}`}>
      <div className="deals-banner">
        <Link to={link}>
          <img 
            src={bannerImage} 
            alt={title} 
            className="deals-banner-img"
            loading="lazy"
          />
        </Link>
      </div>
      
      <div className="deals-grid-wrapper">
        <div className="showcase-header">
          <h3>{title}</h3>
          <Link to={link} className="view-all-link">View All &rarr;</Link>
        </div>
        {isLoading ? (
          <div className="spinner" />
        ) : (
          <div className="deals-grid">
            {products?.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                variant="compact"
                onAddToCart={() => {}} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryShowcase;
