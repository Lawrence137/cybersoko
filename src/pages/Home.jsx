import { motion } from 'framer-motion';
import Hero from '../components/common/Hero';
import ProductCard from '../components/ui/ProductCard';

// Animation variants for section titles
const sectionTitleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Animation variants for the promotional banner
const bannerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.2, ease: 'easeOut' } },
  hover: {
    scale: 1.02,
    boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

const Home = () => {
  const featuredProducts = [
    { id: 1, name: 'Dell XPS 13', price: 120000, image: '/assets/laptop1.jpg', condition: 'New' },
    { id: 2, name: 'HP Desktop', price: 80000, image: '/assets/desktop1.jpg', condition: 'Used' },
    { id: 3, name: 'MacBook Pro', price: 150000, image: '/assets/laptop2.jpg', condition: 'Refurbished' },
    { id: 4, name: 'Gaming PC', price: 200000, image: '/assets/desktop2.jpg', condition: 'New' },
  ];

  return (
    <div className="relative bg-gray-900 text-white">
      {/* Starry Night Background with Animated Dots */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 2 === 0 ? 'bg-white' : 'bg-cyan-400'
            } ${i % 3 === 0 ? 'w-2 h-2' : 'w-1 h-1'} opacity-20 twinkle`}
            style={{
              left: `${5 + (i * 73) % 100}%`, // Spread dots across the viewport
              top: `${5 + (i * 47) % 100}%`, // Random but consistent positioning
              animationDelay: `${i * 0.5}s`, // Stagger the twinkling
            }}
            animate={{
              y: [0, -10, 0], // Subtle vertical movement
              opacity: [0.2, 0.5, 0.2], // Fade in/out with Framer Motion
              transition: {
                y: { repeat: Infinity, duration: 3 + i * 0.2, ease: 'easeInOut' },
                opacity: { repeat: Infinity, duration: 3 + i * 0.2, ease: 'easeInOut' },
                delay: i * 0.3,
              },
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <Hero
        title="Welcome to CyberSoko"
        subtitle="Your one-stop shop for new and used computers in Kenya"
        ctaText="Shop Now"
        ctaLink="/products"
      />

      {/* Featured Products Section */}
      <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-8 text-center"
          variants={sectionTitleVariants}
          initial="hidden"
          animate="visible"
        >
          Featured Products
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Promotional Banner Section */}
      <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="relative bg-gradient-to-r from-primary to-blue-700 rounded-lg p-8 md:p-12 text-center shadow-[0_0_20px_rgba(0,255,255,0.2)] overflow-hidden"
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          {/* Subtle Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 to-transparent opacity-50" />
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Explore Our Accessories Collection
          </h3>
          <p className="text-lg text-gray-200 mb-6 max-w-xl mx-auto">
            Discover the latest in tech accessories—from sleek headphones to smartwatches—at unbeatable prices.
          </p>
          <a
            href="/products?category=accessories"
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-secondary to-green-400 text-white font-medium text-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg"
          >
            Shop Accessories
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;