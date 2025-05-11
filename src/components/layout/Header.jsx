import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate for redirect
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import MobileMenu from './MobileMenu';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const { user, signout } = useAuth(); // Change logout to signout to match AuthContext
  const navigate = useNavigate(); // Add useNavigate for redirect after logout

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Handle logout with error handling
  const handleLogout = async () => {
    try {
      await signout(); // Call Firebase signout
      console.log('User logged out successfully');
      navigate('/'); // Redirect to homepage
    } catch (err) {
      console.error('Logout failed:', err.message || err);
      alert('Failed to log out. Please try again.'); // Optional: Notify user of failure
    }
  };

  // Animation for nav links (glowing underline on hover)
  const underlineVariants = {
    hidden: { width: '0%', boxShadow: 'none' },
    visible: {
      width: '100%',
      boxShadow: '0 0 8px rgba(0, 255, 255, 0.5)',
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  // Animation for buttons (scale and glowing shadow on hover)
  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 0 12px rgba(255, 255, 255, 0.3)',
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  // Animation for nav items on mount (staggered fade-in)
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3, ease: 'easeOut' },
    }),
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,255,0.2)]">
        <div className="container mx-auto flex items-center py-3 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent hover:from-blue-200 hover:to-white transition-all duration-300"
            >
              CyberSoko
            </Link>
          </motion.div>

          {/* Spacer to push nav links slightly off-center */}
          <div className="flex-grow md:flex-grow-[2]" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {/* Standard Nav Links (Slightly off-center to the left) */}
            <nav className="flex items-center space-x-8">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Products' },
                ...(user // Show cart link only if user is logged in
                  ? [{ to: '/cart', label: 'Cart', icon: ShoppingCartIcon, count: cart.length }]
                  : []),
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  custom={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative"
                >
                  <Link
                    to={item.to}
                    className="flex items-center text-lg font-medium text-gray-200 hover:text-cyan-400 transition-colors duration-300"
                  >
                    {item.icon && <item.icon className="w-5 h-5 mr-2 text-gray-200" />}
                    {item.label}
                    {item.count > 0 && (
                      <span className="ml-2 bg-cyan-500 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {item.count}
                      </span>
                    )}
                  </Link>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-cyan-400"
                    initial="hidden"
                    whileHover="visible"
                    variants={underlineVariants}
                  />
                </motion.div>
              ))}
            </nav>

            {/* Auth Buttons (Right-aligned with extra spacing) */}
            <div className="flex items-center gap-4">
              {user ? (
                <motion.div
                  variants={buttonHoverVariants}
                  whileHover="hover"
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  className="variants={navItemVariants}"
                >
                  <button
                    onClick={handleLogout} // Use the new handleLogout function
                    className="px-4 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-300 font-medium shadow-md"
                  >
                    Log Out
                  </button>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    variants={buttonHoverVariants}
                    whileHover="hover"
                    custom={3}
                    initial="hidden"
                    animate="visible"
                    className="variants={navItemVariants}"
                  >
                    <Link
                      to="/login"
                      className="px-4 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-300 font-medium shadow-md"
                    >
                      Log In
                    </Link>
                  </motion.div>
                  <motion.div
                    variants={buttonHoverVariants}
                    whileHover="hover"
                    custom={4}
                    initial="hidden"
                    animate="visible"
                    className="variants={navItemVariants}"
                  >
                    <Link
                      to="/signup"
                      className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-accent to-yellow-400 text-gray-900 hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 font-medium shadow-md"
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} cartCount={cart.length} user={user} logout={handleLogout} /> {/* Update logout to handleLogout */}
    </>
  );
};

export default Header;