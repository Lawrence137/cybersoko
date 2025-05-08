import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants for the page title
const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Animation variants for cart items
const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.1 },
  }),
  exit: { opacity: 0, x: 20, transition: { duration: 0.3, ease: 'easeIn' } },
};

// Animation variants for the total section
const totalVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 } },
};

// Animation for buttons (scale and glow on hover)
const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Mock checkout logic
    console.log('Proceeding to checkout with cart:', cart);
    alert('Checkout successful! (Mock)');
    clearCart(); // Clear cart after checkout
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
        <motion.h1
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-8 text-center"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Your Cart
        </motion.h1>

        {cart.length === 0 ? (
          <motion.p
            className="text-center text-gray-400 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Your cart is empty.
          </motion.p>
        ) : (
          <div>
            {/* Cart Items */}
            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex flex-col sm:flex-row justify-between items-center bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-cyan-400/20 mb-4"
                  variants={itemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="flex items-center space-x-4 w-full sm:w-auto">
                    {/* Item Image (Placeholder if no image) */}
                    <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">No Image</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {item.name}
                      </h3>
                      <p className="text-gray-400">KSh {item.price.toLocaleString()}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value >= 1) updateQuantity(item.id, value);
                          }}
                          className="w-16 p-1 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-center"
                          min="1"
                          aria-label={`Quantity of ${item.name}`}
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 bg-gray-700 rounded-lg hover:bg-gray-600"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-4 sm:mt-0 px-4 py-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40 transition-all duration-300"
                    variants={buttonVariants}
                    whileHover="hover"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Total and Actions */}
            <motion.div
              className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-400/20"
              variants={totalVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-4 sm:mb-0">
                Total: KSh {total.toLocaleString()}
              </p>
              <div className="flex space-x-4">
                <motion.button
                  onClick={clearCart}
                  className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
                  variants={buttonVariants}
                  whileHover="hover"
                  aria-label="Clear cart"
                >
                  Clear Cart
                </motion.button>
                <motion.button
                  onClick={handleCheckout}
                  className="px-6 py-2 bg-gradient-to-r from-secondary to-green-400 text-white rounded-lg shadow-lg"
                  variants={buttonVariants}
                  whileHover="hover"
                  aria-label="Proceed to checkout"
                >
                  Checkout
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;