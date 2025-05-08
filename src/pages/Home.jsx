import { motion } from 'framer-motion';
import Hero from '../components/common/Hero';
import FeaturedProducts from '../components/common/FeaturedProducts'; // Import the new component
import products from '../data/products'; // Import products from products.js

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
  // Select the first 3 products as featured
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-[100dvh] w-full bg-gray-900 text-white">
      {/* Subtle Background Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2],
              transition: {
                y: { repeat: Infinity, duration: 4 + i * 0.3, ease: 'easeInOut' },
                opacity: { repeat: Infinity, duration: 4 + i * 0.3, ease: 'easeInOut' },
                delay: i * 0.2,
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
      <FeaturedProducts products={featuredProducts} />

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