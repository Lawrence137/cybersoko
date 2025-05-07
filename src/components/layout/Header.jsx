import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import MobileMenu from './MobileMenu';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold tracking-tight hover:text-accent transition-colors duration-200">
          CyberSoko
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-lg font-medium hover:text-accent hover:scale-105 transition-all duration-200"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-lg font-medium hover:text-accent hover:scale-105 transition-all duration-200"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center text-lg font-medium hover:text-accent transition-all duration-200"
          >
            <ShoppingCartIcon className="w-6 h-6 mr-2" />
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} cartCount={cart.length} />
    </header>
  );
};

export default Header;