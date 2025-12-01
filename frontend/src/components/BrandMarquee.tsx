const brands = ['Monocle', 'Velvet Labs', 'Analog Co.', 'Northwind', 'Harbor & Co.', 'Studio Eight'];

const BrandMarquee = () => (
  <div className="brand-marquee" aria-label="Trusted by leading studios">
    {brands.map((brand) => (
      <span key={brand}>{brand}</span>
    ))}
  </div>
);

export default BrandMarquee;
