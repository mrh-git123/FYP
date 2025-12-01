import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'electronics',
    title: 'Electronics',
    subtitle: 'Latest Tech',
    image: 'https://png.pngtree.com/png-vector/20250522/ourmid/pngtree-modern-laptop-computer-with-screen-open-technology-digital-device-png-image_16345445.png',
    color: '#f1f5f9', // Light Slate
    link: '/shop?category=Electronics'
  },
  {
    id: 'home',
    title: 'Home Appliances',
    subtitle: 'Modern Living',
    image: 'https://alfatah.pk/cdn/shop/files/file_0_20230912112019.png?v=1694517621',
    color: '#f3f4f6', // Light Gray
    link: '/shop?category=Home'
  },
  {
    id: 'shoes',
    title: 'Shoes',
    subtitle: 'Step Up',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/046/323/598/small/pair-of-colorful-sports-shoes-for-active-lifestyle-png.png',
    color: '#fff1f2', // Light Rose
    link: '/shop?category=Shoes'
  },
  {
    id: 'bags',
    title: 'Bags',
    subtitle: 'Carry Style',
    image: 'https://pngfile.net/files/preview/960x960/21566927939atj31maxjia7qsjox5tcxge7aae1fitrn38zixunkkp8szp8gdeexgufwzzvef1q5kon2wovte7cgz9plvukpk3lqtockddhgv1j.png',
    color: '#ecfdf5', // Light Emerald
    link: '/shop?category=Bags'
  }
];

const Categories = () => {
  return (
    <section className="categories-section">
      <div className="categories-grid">
        {categories.map((category) => (
          <Link 
            to={category.link} 
            key={category.id} 
            className="category-card"
            style={{ backgroundColor: category.color }}
          >
            <div className="category-image-wrapper">
              <img src={category.image} alt={category.title} loading="lazy" />
            </div>
            <div className="category-content">
              <h3>{category.title}</h3>
              <p>{category.subtitle} <span>😎</span></p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
