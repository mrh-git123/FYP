import { HeartHandshake, ShieldCheck, Sparkles, Truck } from 'lucide-react';

const data = [
  {
    icon: <ShieldCheck size={28} />,
    title: 'Bank-grade checkout',
    text: '3DS, Apple Pay, and instant confirmation across every device.',
    bg: '#eff6ff', // blue-50
    color: '#2563eb' // blue-600
  },
  {
    icon: <Truck size={28} />,
    title: 'Precision fulfillment',
    text: 'Live carrier sync and proactive SMS/email tracking for every parcel.',
    bg: '#ecfdf5', // emerald-50
    color: '#059669' // emerald-600
  },
  {
    icon: <HeartHandshake size={28} />,
    title: 'Concierge support',
    text: 'Humans on standby 24/7 for styling, returns, and rapid resolutions.',
    bg: '#fff1f2', // rose-50
    color: '#e11d48' // rose-600
  },
  {
    icon: <Sparkles size={28} />,
    title: 'Editorial curation',
    text: 'Drops hand-picked by stylists so every product feels intentional.',
    bg: '#f5f3ff', // violet-50
    color: '#7c3aed' // violet-600
  },
];

const FeatureHighlights = () => (
  <section className="feature-grid">
    {data.map((card) => (
      <article key={card.title} className="feature-card">
        <div 
          className="feature-icon-wrapper"
          style={{ backgroundColor: card.bg, color: card.color }}
        >
          {card.icon}
        </div>
        <h3>{card.title}</h3>
        <p>{card.text}</p>
      </article>
    ))}
  </section>
);

export default FeatureHighlights;
