import { motion } from 'framer-motion';
import ProductCard from '../ui/ProductCard';
import { Link } from 'react-router-dom';

// Animation variants for section titles
const sectionTitleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const FeaturedProducts = ({ products }) => {
  return (
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
        {products.map((product, index) => (
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
      {/* View All Products Link */}
      <div className="mt-8 text-center">
        <Link
          to="/products"
          className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-secondary to-green-400 text-white font-medium text-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;