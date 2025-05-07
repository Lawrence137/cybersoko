import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import MobileMenu from './MobileMenu';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Animation for nav links underline effect
  const underlineVariants = {
    hidden: { width: '0%' },
    visible: { width: '100%', transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,255,0.2)]">
        <div className="container mx-auto flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent hover:from-blue-200 hover:to-white transition-all duration-300"
          >
            CyberSoko
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {[
              { to: '/', label: 'Home' },
              { to: '/products', label: 'Products' },
              { to: '/cart', label: 'Cart', icon: ShoppingCartIcon, count: cart.length },
            ].map((item) => (
              <div key={item.label} className="relative">
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
              </div>
            ))}
          </nav>

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

      {/* Mobile Menu (Moved outside <header>) */}
      <MobileMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} cartCount={cart.length} />
    </>
  );
};

export default Header;