import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'Checkout was effortless and delivery tracking updated before my courier app did. Luxurious from start to finish.',
    author: 'Sierra M.',
  },
  {
    quote: 'The catalog reads like an editorial. Specs, care notes, and styling prompts right where I need them.',
    author: 'Imani K.',
  },
  {
    quote: 'Support resolved an exchange in under ten minutes. I now default to Stellar for every gift.',
    author: 'Daniel L.',
  },
];

const Testimonials = () => (
  <section className="testimonials">
    {testimonials.map((item) => (
      <blockquote key={item.author}>
        <div>
          {[...Array(5)].map((_, index) => (
            <Star key={index.toString()} size={16} fill="#facc15" color="#facc15" />
          ))}
        </div>
        <p>&ldquo;{item.quote}&rdquo;</p>
        <span>{item.author}</span>
      </blockquote>
    ))}
  </section>
);

export default Testimonials;
