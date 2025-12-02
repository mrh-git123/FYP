import { ShoppingBag, Users, Shield, TrendingUp, Sparkles, Package, Zap, Heart } from 'lucide-react';

const AboutPage = () => (
  <main className="page about-page-modern">
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-badge">
          <Sparkles size={20} />
          <span>About Us</span>
        </div>
        <h1>Built for Thoughtful Commerce</h1>
        <p className="hero-description">
          Stellar pairs a React + Express + MongoDB stack with editorial storytelling to deliver premium shopping journeys
          that delight customers and empower businesses.
        </p>
      </div>

      {/* Stats Section */}
      <div className="about-stats">
        <div className="stat-card">
          <ShoppingBag size={32} />
          <div className="stat-content">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Products Listed</span>
          </div>
        </div>
        <div className="stat-card">
          <Users size={32} />
          <div className="stat-content">
            <span className="stat-number">5K+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
        </div>
        <div className="stat-card">
          <Package size={32} />
          <div className="stat-content">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Orders Delivered</span>
          </div>
        </div>
        <div className="stat-card">
          <TrendingUp size={32} />
          <div className="stat-content">
            <span className="stat-number">98%</span>
            <span className="stat-label">Satisfaction Rate</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="about-content">
        {/* Mission Section */}
        <section className="about-section">
          <div className="section-icon">
            <Heart size={40} />
          </div>
          <div className="section-text">
            <h2>Our Mission</h2>
            <p>
              We believe shopping should be more than a transaction—it should be an experience. Stellar combines cutting-edge
              technology with thoughtful design to create shopping journeys that feel premium, personal, and delightful at every
              touchpoint.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <ShoppingBag size={28} />
            </div>
            <h3>Curated Collections</h3>
            <p>
              Discover carefully selected products organized into themed collections. Every item is chosen with care to ensure
              quality and style that matches your expectations.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Zap size={28} />
            </div>
            <h3>Lightning Fast</h3>
            <p>
              Built with Vite-powered React and optimized APIs, our platform delivers near-instant updates and seamless
              interactions. No more waiting—shop at the speed of thought.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Shield size={28} />
            </div>
            <h3>Secure & Reliable</h3>
            <p>
              Your data is protected with JWT authentication, encrypted transactions, and secure cloud infrastructure. Shop with
              confidence knowing your information is safe.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Package size={28} />
            </div>
            <h3>Real-Time Tracking</h3>
            <p>
              Stay informed every step of the way with real-time order tracking. From confirmation to delivery, you'll always
              know exactly where your package is.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Users size={28} />
            </div>
            <h3>Personalized Experience</h3>
            <p>
              Create your profile, save favorites, and enjoy a shopping experience tailored to you. Your cart syncs across all
              devices for seamless shopping anywhere.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <TrendingUp size={28} />
            </div>
            <h3>Admin Dashboard</h3>
            <p>
              Business owners get powerful tools to manage inventory, track analytics, and optimize their store. Make data-driven
              decisions with actionable insights.
            </p>
          </div>
        </div>

        {/* Technology Stack */}
        <section className="about-section tech-section">
          <div className="section-icon">
            <Zap size={40} />
          </div>
          <div className="section-text">
            <h2>Built With Modern Technology</h2>
            <p>
              Stellar leverages the best technologies to deliver a premium experience. Our stack includes Vite-powered React apps
              for blazing-fast frontends, JWT-secured Express APIs for robust backend services, MongoDB for flexible data
              persistence, and React Query for optimistic UI updates that feel instant.
            </p>
            <div className="tech-stack">
              <span className="tech-badge">React</span>
              <span className="tech-badge">TypeScript</span>
              <span className="tech-badge">Express</span>
              <span className="tech-badge">MongoDB</span>
              <span className="tech-badge">React Query</span>
              <span className="tech-badge">Vite</span>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="about-cta">
          <Sparkles size={48} />
          <h2>Ready to Experience the Difference?</h2>
          <p>Join thousands of satisfied customers who trust Stellar for their shopping needs.</p>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => window.location.href = '/catalog'}
          >
            Start Shopping Now
          </button>
        </section>
      </div>
    </div>
  </main>
);

export default AboutPage;
