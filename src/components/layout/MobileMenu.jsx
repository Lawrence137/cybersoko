import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const MobileMenu = ({ isOpen, toggleMenu, cartCount }) => {
  // Animation variants for the menu
  const menuVariants = {
    hidden: {
      x: '100%',
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  // Animation variants for individual links
  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-md md:hidden"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={menuVariants}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Close mobile menu"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col items-center justify-center h-full space-y-8">
            <motion.div variants={linkVariants} initial="hidden" animate="visible">
              <Link
                to="/"
                onClick={toggleMenu}
                className="text-3xl font-semibold text-white hover:text-accent transition-colors duration-200"
              >
                Home
              </Link>
            </motion.div>
            <motion.div variants={linkVariants} initial="hidden" animate="visible">
              <Link
                to="/products"
                onClick={toggleMenu}
                className="text-3xl font-semibold text-white hover:text-accent transition-colors duration-200"
              >
                Products
              </Link>
            </motion.div>
            <motion.div variants={linkVariants} initial="hidden" animate="visible">
              <Link
                to="/cart"
                onClick={toggleMenu}
                className="relative flex items-center text-3xl font-semibold text-white hover:text-accent transition-colors duration-200"
              >
                <ShoppingCartIcon className="w-8 h-8 mr-2" />
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </motion.div>
          </nav>

          {/* Decorative Element */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-blue-700/50 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;