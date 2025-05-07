import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

// Animation variants for the footer
const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Animation variants for social icons
const iconVariants = {
  hover: {
    scale: 1.2,
    color: '#10B981', // Matches secondary color
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

const Footer = () => {
  return (
    <footer className="relative w-full bg-gray-900 text-white py-12">
      {/* Starry Dots Background (Extended into Footer) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 2 === 0 ? 'bg-white' : 'bg-cyan-400'
            } ${i % 3 === 0 ? 'w-2 h-2' : 'w-1 h-1'} opacity-20 twinkle`}
            style={{
              left: `${5 + (i * 73) % 100}%`,
              top: `${5 + (i * 47) % 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.5, 0.2],
              transition: {
                y: { repeat: Infinity, duration: 3 + i * 0.2, ease: 'easeInOut' },
                opacity: { repeat: Infinity, duration: 3 + i * 0.2, ease: 'easeInOut' },
                delay: i * 0.3,
              },
            }}
          />
        ))}
      </div>

      {/* Footer Content */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={footerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-4">
              CyberSoko
            </h3>
            <p className="text-gray-400">
              Your one-stop shop for new and used computers in Kenya.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-secondary transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-secondary transition-colors duration-300"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-secondary transition-colors duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-secondary transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                className="text-gray-400"
              >
                <FaTwitter size={24} />
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                className="text-gray-400"
              >
                <FaFacebook size={24} />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                className="text-gray-400"
              >
                <FaInstagram size={24} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Copyright Notice */}
        <div className="text-center text-gray-400">
          <p>© 2025 CyberSoko. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;