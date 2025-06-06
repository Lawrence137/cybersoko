import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

// Animation variants for the form
const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Animation variants for buttons
const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Add state for error messages
  const navigate = useNavigate();
  const { signup } = useAuth(); // Access signup from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      // Sign up with Firebase Authentication (email and password only)
      await signup(email, password);
      // Navigate to products page after successful signup
      navigate('/products');
    } catch (err) {
      // Handle Firebase authentication errors
      setError(err.message || 'Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-gray-900 text-white relative flex items-center justify-center">
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

      {/* Signup Form */}
      <motion.div
        className="relative z-10 w-full max-w-md p-8 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-cyan-400/20"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-6 text-center">
          Create your CyberSoko Account
        </h2>
        {/* Display error message if signup fails */}
        {error && (
          <motion.p
            className="text-red-400 mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Create a password"
            />
          </div>
          <motion.button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-secondary to-green-400 text-white rounded-lg shadow-lg"
            variants={buttonVariants}
            whileHover="hover"
          >
            Sign Up
          </motion.button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-secondary hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;