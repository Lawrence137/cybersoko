import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { motion } from 'framer-motion';
import products from '../data/products';

// Animation variants for the product container
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Animation variants for the image
const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Animation variants for the details
const detailsVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 } },
};

// Animation for buttons (scale and glow on hover)
const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth(); // Get user from AuthContext
  const navigate = useNavigate();
  const location = useLocation(); // Get current location for redirect
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  // Find the product by ID
  const product = products.find((p) => p.id === id);

  // Handle case where product is not found
  if (!product) {
    return (
      <div className="min-h-[100dvh] w-full bg-gray-900 text-white flex items-center justify-center">
        <p className="text-xl text-gray-400">Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      // Redirect to login if user is not authenticated
      navigate('/login', { state: { from: location } });
    } else {
      // Add to cart if user is authenticated
      addToCart(product);
      setShowAddedMessage(true);
      setTimeout(() => {
        setShowAddedMessage(false);
      }, 2000); // Hide message after 2 seconds
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-gray-900 text-white relative">
      {/* Background with Radial Gradient and Geometric Shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] to-[#164E63] pointer-events-none z-0">
        <svg className="w-full h-full opacity-10" preserveAspectRatio="none">
          <defs>
            <linearGradient id="shapeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#1E40AF', stopOpacity: 0.5 }} />
              <stop offset="100%" style={{ stopColor: '#10B981', stopOpacity: 0.3 }} />
            </linearGradient>
          </defs>
          <path
            d="M0,0 L100,100 L0,200 Z"
            fill="url(#shapeGradient)"
            transform="scale(2) translate(100, 50)"
          />
          <path
            d="M0,300 L400,0 M200,400 L600,100"
            stroke="url(#shapeGradient)"
            strokeWidth="1"
            transform="scale(1.5) translate(-50, 0)"
          />
          <circle
            cx="80%"
            cy="70%"
            r="150"
            fill="none"
            stroke="url(#shapeGradient)"
            strokeWidth="1"
            transform="scale(1.2)"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row gap-8 bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-400/20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Product Image */}
          <motion.div
            className="w-full md:w-1/2 h-96 bg-gray-700 rounded-lg flex items-center justify-center"
            variants={imageVariants}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-400 text-sm">No Image Available</span>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div className="w-full md:w-1/2" variants={detailsVariants}>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
              {product.name}
            </h1>
            <p className="text-2xl text-secondary mt-2">KSh {product.price.toLocaleString()}</p>
            <p className="text-gray-400 mt-2">Condition: {product.condition}</p>
            <p className="text-gray-400 mt-2">Category: {product.category}</p>
            <p className="text-gray-300 mt-4">{product.description}</p>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              className="mt-6 px-6 py-2 bg-gradient-to-r from-secondary to-green-400 text-white rounded-lg shadow-lg"
              variants={buttonVariants}
              whileHover="hover"
              aria-label={`Add ${product.name} to cart`}
            >
              Add to Cart
            </motion.button>

            {/* Added to Cart Confirmation Message */}
            {showAddedMessage && (
              <motion.div
                className="mt-4 p-3 bg-green-500/20 text-green-400 rounded-lg text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                Added to cart!
              </motion.div>
            )}

            {/* Back to Products Button */}
            <motion.button
              onClick={() => navigate('/products')}
              className="mt-4 px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
              variants={buttonVariants}
              whileHover="hover"
              aria-label="Back to products"
            >
              Back to Products
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;