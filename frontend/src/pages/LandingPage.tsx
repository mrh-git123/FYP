import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import type { Product } from '../types';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeatureHighlights from '../components/FeatureHighlights';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import CategoryShowcase from '../components/CategoryShowcase';
import CountdownTimer from '../components/CountdownTimer';
import offer from '../assets/offer.png';

const LandingPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const { data: response } = await api.get<{ products: Product[] }>('/products', {
        params: { featured: true, limit: 8 },
      });
      return response.products;
    },
  });

  return (
    <main className="landing">
      <Hero />
      <Categories />
      {/* <BrandMarquee /> */}
      <section className="section surface feature-panel">
        <SectionHeading
          eyebrow="Commerce without compromise"
          title="Systems built for design-forward teams"
          description="Four pillars keep every drop premium: secure checkout, precision fulfillment, concierge humans, and editorial curation."
        />
        <FeatureHighlights />
      </section>

      <section className="section deals-section">
        <div className="deals-banner">
          <img
            src="https://alfatah.pk/cdn/shop/files/605-407_330e5080-5c65-46e5-8a0e-78d7752e1844.jpg?v=1762843154"
            alt="Winter Sale"
            className="deals-banner-img"
          />
        </div>

        <div className="deals-grid-wrapper">
          <div className="showcase-header">
            <h3>WinterFEST Deals</h3>
            <Link to="/shop?featured=true" className="view-all-link">View All &rarr;</Link>
          </div>
          {isLoading && (
            <div className="loading-container">
              <div className="spinner" />
            </div>
          )}
          {!isLoading && !isError && (
            <div className="deals-grid">
              {data?.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  variant="compact"
                  onAddToCart={() => { }} // Placeholder for now
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CategoryShowcase
        category="Electronics"
        title="Latest Electronics"
        bannerImage="https://alfatah.pk/cdn/shop/files/Artboard_1_copy_2_e84eb3af-464c-4b0f-b22a-ab949b9a49da.jpg?v=1751366229"
        link="/shop?category=Electronics"
      // reverse={true}
      />

      <CategoryShowcase
        category="Home"
        title="Home Appliances"
        bannerImage="https://alfatah.pk/cdn/shop/files/file_0_20251104113119.jpg?v=1762255880"
        link="/shop?category=Home"
      />

      <CategoryShowcase
        category="Shoes"
        title="Trending Footwear"
        bannerImage="https://alfatah.pk/cdn/shop/files/Mens_Apparel_web_abnners_4.jpg?v=1741671131"
        link="/shop?category=Shoes"
      // reverse={true}
      />

      <section className="section deal-spotlight">
        <div className="deal-content">
          <h2>Get the deal</h2>
          <p>
            Gadget Gizmo has brought a new dimension to learning - it effortlessly
            unlocks the doors to knowledge.
          </p>
          <CountdownTimer targetDate={new Date(Date.now() + 18 * 60 * 60 * 1000 + 24 * 60 * 1000 + 52 * 1000)} />
          <Link to="/shop" className="btn btn-primary btn-deal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            View Sale Products
          </Link>
        </div>
        <div className="deal-image">
          <img src={offer} alt="Deal Product" />
        </div>
      </section>
      {/* 
      <section className="section surface">
        <SectionHeading
          eyebrow="Testimonials"
          title="Commerce designed for humans"
          description="Buyers rate Stellar 4.9/5 for communications, order accuracy, and delivery transparency."
        />
        <Testimonials />
      </section> */}

      {/* <section className="section cta-card">
        <SectionHeading
          title="Ready to elevate everyday rituals?"
          description="Join Stellar to access curated drops, saved profiles, and tracked deliveries in one place."
          action={
            <div className="hero-cta">
              <Link to="/auth" className="btn btn-primary">
                Create account
              </Link>
              <Link to="/shop" className="btn btn-ghost">
                Browse catalog
              </Link>
            </div>
          }
        />
      </section> */}
    </main>
  );
};

export default LandingPage;
