import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Animation variants for the card on hover
const cardVariants = {
  hover: {
    y: -10,
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

const ProductCard = ({ product }) => {
  return (
    <motion.div
      className="relative bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-cyan-400/20"
      variants={cardVariants}
      whileHover="hover"
    >
      {/* Product Image */}
      <div className="relative h-48">
        <LazyLoadImage
          src={product.image}
          alt={product.name}
          effect="blur"
          className="w-full h-full object-cover"
          placeholderSrc="/assets/placeholder.jpg" // Add a low-res placeholder image
        />
        {/* Condition Badge */}
        <span
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium text-white ${
            product.condition === 'New'
              ? 'bg-secondary'
              : product.condition === 'Used'
              ? 'bg-yellow-500'
              : 'bg-gray-500'
          }`}
        >
          {product.condition}
        </span>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white truncate">{product.name}</h3>
        <p className="text-gray-300 mt-1">KSh {product.price.toLocaleString()}</p>
        <Link
          to={`/products/${product.id}`}
          className="mt-3 inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;