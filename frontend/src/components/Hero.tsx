import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Flame, Truck, ShieldCheck, Clock } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?auto=format&fit=crop&w=2070&q=80',
    title: 'ELECTRONICS',
    subtitle: 'NEXT GEN TECH',
    cta: 'Shop Electronics',
    link: '/shop?category=Electronics',
    align: 'left',
    color: '#ffffff'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=2070&q=80',
    title: 'HOME APPLIANCES',
    subtitle: 'MODERN LIVING',
    cta: 'Upgrade Your Home',
    link: '/shop?category=Home',
    align: 'right',
    color: '#ffffff'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=2070&q=80',
    title: 'SHOES',
    subtitle: 'STEP IN STYLE',
    cta: 'Browse Footwear',
    link: '/shop?category=Shoes',
    align: 'center',
    color: '#ffffff'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=2070&q=80',
    title: 'BAGS',
    subtitle: 'CARRY IT ALL',
    cta: 'Shop Bags',
    link: '/shop?category=Bags',
    align: 'left',
    color: '#ffffff'
  }
];

const features = [
  { icon: <Flame size={16} />, text: '100k products at one click' },
  { icon: <Truck size={16} />, text: 'Flat 199 delivery charges' },
  { icon: <ShieldCheck size={16} />, text: 'Secure Payment' },
  { icon: <Clock size={16} />, text: 'Same day delivery' },
  { icon: <Flame size={16} />, text: 'Monthly Deals & Discounts' },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="hero-carousel-wrapper">
      {/* Top Marquee */}
      <div className="hero-marquee-top">
        <div className="marquee-content">
          {[...features, ...features, ...features].map((feature, i) => (
            <span key={i} className="marquee-item">
              {feature.icon} {feature.text}
            </span>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div className="hero-carousel">
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="carousel-overlay" />
            <div className={`carousel-content align-${slide.align}`}>
              <h2 style={{ color: slide.color }}>{slide.title}</h2>
              <h1 style={{ color: slide.color }}>{slide.subtitle}</h1>
              <Link to={slide.link} className="btn btn-primary btn-lg">
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}

        <button className="carousel-control prev" onClick={prevSlide}>
          <ChevronLeft size={32} />
        </button>
        <button className="carousel-control next" onClick={nextSlide}>
          <ChevronRight size={32} />
        </button>

        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Marquee (Teal/Green style from image) */}
      <div className="hero-marquee-bottom">
        <div className="marquee-content">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="marquee-item">
              <Flame size={16} /> Welcome! To Steller Store
              <span className="separator">|</span>
              Style and Freshness, All in One Place.
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
