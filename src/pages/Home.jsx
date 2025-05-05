import ProductCard from '../components/ui/ProductCard';
import Hero from '../components/common/Hero';

const Home = () => {
  const featuredProducts = [
    { id: 1, name: 'Dell XPS 13', price: 120000, image: '/assets/laptop1.jpg', condition: 'New' },
    { id: 2, name: 'HP Desktop', price: 80000, image: '/assets/desktop1.jpg', condition: 'Used' },
  ];

  return (
    <div>
      <Hero
        title="Welcome to CyberSoko"
        subtitle="Your one-stop shop for new and used computers in Kenya"
        ctaText="Shop Now"
        ctaLink="/products"
      />
      <section className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;