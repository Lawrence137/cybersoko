import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/solid';

const MobileMenu = ({ isOpen, toggleMenu, cartCount, user, logout }) => {
  // Animation variants for the menu container (slide in from right)
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

  // Animation variants for individual links (staggered fade-in with slight scale)
  const linkVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.3, ease: 'easeOut' },
    }),
  };

  // Animation for buttons (staggered fade-in)
  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 + 0.3, duration: 0.3, ease: 'easeOut' },
    }),
  };

  // Define navigation links, conditionally including Cart if user is logged in
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    ...(user // Show Cart link only if user is logged in
      ? [{ to: '/cart', label: 'Cart', icon: ShoppingCartIcon, count: cartCount }]
      : []),
  ];

  // Define auth buttons, showing Log Out if logged in, otherwise Log In and Sign Up
  const authItems = user
    ? [{ to: '#', label: 'Log Out', onClick: logout }] // Use the passed logout (handleLogout)
    : [
        { to: '/login', label: 'Log In' },
        { to: '/signup', label: 'Sign Up' },
      ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Blur Overlay */}
          <motion.div
            className="fixed inset-0 z-80 bg-black/30 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={toggleMenu}
            aria-hidden="true"
          />

          {/* Mobile Menu */}
          <motion.div
            className="fixed top-0 right-0 z-90 w-3/4 h-full bg-primary/95 backdrop-blur-lg md:hidden shadow-2xl"
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

            {/* Navigation Content */}
            <div className="flex flex-col h-full px-6 py-12">
              {/* Menu Header */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold text-white/80">Menu</h2>
              </motion.div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
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
                      className="flex items-center text-xl font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hover:from-accent hover:to-yellow-300 transition-all duration-300"
                    >
                      {item.icon && <item.icon className="w-6 h-6 mr-3 text-white" />}
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

              {/* Divider */}
              <motion.div
                className="my-6 border-t border-white/10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />

              {/* Auth Buttons */}
              <div className="flex flex-col space-y-3">
                {authItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    custom={index}
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      to={item.to}
                      onClick={item.onClick ? () => { item.onClick(); toggleMenu(); } : toggleMenu}
                      className={`block w-full text-center py-2 rounded-lg font-medium text-lg transition-all duration-300 ${
                        item.label === 'Sign Up'
                          ? 'bg-gradient-to-r from-accent to-yellow-400 text-gray-900 hover:from-yellow-400 hover:to-yellow-500'
                          : 'bg-white/10 text-white hover:bg-white/20' // Applies to both Log In and Log Out
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Spacer to push content above the decorative gradient */}
              <div className="flex-grow" />
            </div>

            {/* Decorative Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-700/40 to-transparent" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;