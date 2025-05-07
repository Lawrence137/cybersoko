import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/solid';

const MobileMenu = ({ isOpen, toggleMenu, cartCount }) => {
  // Animation variants for the menu container
  const menuVariants = {
    hidden: {
      x: '75%',
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  };

  // Animation variants for individual links
  const linkVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3, ease: 'easeOut' },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Blur Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={toggleMenu}
          />

          {/* Mobile Menu */}
          <motion.div
            className="fixed top-0 right-0 z-50 w-3/4 h-full bg-primary/95 backdrop-blur-lg md:hidden shadow-2xl"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-200"
              onClick={toggleMenu}
              aria-label="Close mobile menu"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Links */}
            <nav className="flex flex-col items-start justify-center h-full px-8 space-y-6">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Products' },
                { to: '/cart', label: 'Cart', icon: ShoppingCartIcon, count: cartCount },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  custom={index}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    to={item.to}
                    onClick={toggleMenu}
                    className="flex items-center text-2xl font-medium text-white hover:text-accent hover:translate-x-2 transition-all duration-200"
                  >
                    {item.icon && <item.icon className="w-7 h-7 mr-3" />}
                    {item.label}
                    {item.count > 0 && (
                      <span className="ml-2 bg-secondary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {item.count}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Decorative Element */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-700/40 to-transparent" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;