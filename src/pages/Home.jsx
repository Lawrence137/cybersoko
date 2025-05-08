import { motion } from 'framer-motion';
import Hero from '../components/common/Hero';
import FeaturedProducts from '../components/common/FeaturedProducts';
import products from '../data/products';
import { Link } from 'react-router-dom';
import { FaLaptop, FaMobileAlt, FaHeadphones, FaStar, FaShieldAlt, FaTruck, FaDollarSign } from 'react-icons/fa';

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

// Animation variants for section titles
const sectionTitleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Animation for cards (categories, testimonials, why choose us)
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
  hover: {
    scale: 1.05,
    boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

// Animation for CTA button
const ctaButtonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

const Home = () => {
  // Select the first 3 products as featured
  const featuredProducts = products.slice(0, 3);

  // Mock categories data
  const categories = [
    { name: 'Laptops', icon: FaLaptop, link: '/products?category=Laptop' },
    { name: 'Smartphones', icon: FaMobileAlt, link: '/products?category=Smartphone' },
    { name: 'Headphones', icon: FaHeadphones, link: '/products?category=Headphones' },
  ];

  // Mock testimonials data
  const testimonials = [
    {
      name: 'Kimani J.',
      text: 'I found a great deal on a MacBook Pro! The process was seamless, and delivery was fast.',
      rating: 5,
    },
    {
      name: 'Otieno A.',
      text: 'Amazing selection of smartphones. My iPhone 14 Pro arrived in perfect condition.',
      rating: 4,
    },
    {
      name: 'Cherop M.',
      text: 'The headphones I bought are fantastic. Great quality and excellent customer service!',
      rating: 5,
    },
  ];

  // Why Choose Us data
  const whyChooseUs = [
    { icon: FaDollarSign, title: 'Competitive Prices', description: 'Get the best deals on new and refurbished tech.' },
    { icon: FaShieldAlt, title: 'Quality Assurance', description: 'All products are thoroughly tested for performance.' },
    { icon: FaTruck, title: 'Fast Delivery', description: 'Swift and reliable delivery across Kenya.' },
  ];

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

      {/* Top Categories Section */}
      <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-8 text-center"
          variants={sectionTitleVariants}
          initial="hidden"
          animate="visible"
        >
          Top Categories
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-400/20 text-center"
              variants={cardVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <category.icon className="w-12 h-12 mx-auto text-secondary mb-4" />
              <h3 className="text-xl font-semibold text-white">{category.name}</h3>
              <Link
                to={category.link}
                className="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-secondary to-green-400 text-white rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-300"
              >
                Explore
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-gray-900 to-gray-800">
        <motion.h2
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-8 text-center"
          variants={sectionTitleVariants}
          initial="hidden"
          animate="visible"
        >
          What Our Customers Say
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-400/20"
              variants={cardVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 italic">"{testimonial.text}"</p>
              <p className="mt-4 text-white font-semibold">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-8 text-center"
          variants={sectionTitleVariants}
          initial="hidden"
          animate="visible"
        >
          Why Choose CyberSoko?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((reason, index) => (
            <motion.div
              key={reason.title}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-400/20 text-center"
              variants={cardVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <reason.icon className="w-12 h-12 mx-auto text-secondary mb-4" />
              <h3 className="text-xl font-semibold text-white">{reason.title}</h3>
              <p className="mt-2 text-gray-400">{reason.description}</p>
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

      {/* Call-to-Action Section */}
      <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-gray-800 to-gray-900">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-4">
            Join CyberSoko Today
          </h2>
          <p className="text-lg text-gray-300 mb-6 max-w-xl mx-auto">
            Sign up to get exclusive deals, early access to new products, and updates on the latest tech trends.
          </p>
          <motion.div variants={ctaButtonVariants} whileHover="hover">
            <Link
              to="/signup"
              className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-secondary to-green-400 text-white font-medium text-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg"
            >
              Sign Up Now
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;