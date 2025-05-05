import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();

  return (
    <header className="bg-primary text-white">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold">
          CyberSoko
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/products" className="hover:underline">
            Products
          </Link>
          <Link to="/cart" className="hover:underline">
            Cart ({cart.length})
          </Link>
        </nav>
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <nav className="md:hidden bg-primary py-4">
          <Link to="/" className="block px-4 py-2 hover:bg-opacity-90">
            Home
          </Link>
          <Link to="/products" className="block px-4 py-2 hover:bg-opacity-90">
            Products
          </Link>
          <Link to="/cart" className="block px-4 py-2 hover:bg-opacity-90">
            Cart ({cart.length})
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;