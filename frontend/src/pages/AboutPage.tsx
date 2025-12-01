import SectionHeading from '../components/SectionHeading';

const AboutPage = () => (
  <main className="page">
    <SectionHeading
      eyebrow="About"
      title="Built for thoughtful commerce"
      description="Stellar pairs a React + Express + MongoDB stack with editorial storytelling to deliver premium shopping journeys."
    />
    <div className="card">
      <p>
        Customers enjoy curated collections, saved profiles, carts that sync across devices, and real-time order tracking. Admins
        orchestrate inventory, pricing, and fulfillment from a dedicated dashboard that surfaces actionable metrics.
      </p>
      <p>
        The system leverages Vite-powered React apps, JWT-secured Express APIs, MongoDB for persistence, and React Query for
        near-instant UI updates. Every touchpoint leans on consistent components, polished typography, and subtle micro-interactions
        to feel premium and personal.
      </p>
    </div>
  </main>
);

export default AboutPage;
