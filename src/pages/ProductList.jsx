import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ui/ProductCard';
import { FaFilter, FaSearch } from 'react-icons/fa';
import { Slider } from '@mui/material';
import products from '../data/products'; // Import products from products.js

// Animation variants for section titles
const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Animation variants for filters bar
const filterVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Animation variants for product cards
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Animation for no results message
const noResultsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const ProductList = () => {
  const [filters, setFilters] = useState({
    condition: 'all',
    category: 'all',
    search: '',
    priceRange: [0, 200000], // Updated max to match highest price in products.js
    sort: 'default',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false); // For mobile filter toggle

  const filteredProducts = products
    .filter((product) => {
      const matchesCondition = filters.condition === 'all' || product.condition === filters.condition;
      const matchesCategory = filters.category === 'all' || product.category === filters.category;
      const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesPrice =
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      return matchesCondition && matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      if (filters.sort === 'price-low-high') return a.price - b.price;
      if (filters.sort === 'price-high-low') return b.price - a.price;
      return 0; // Default: no sorting
    });

  const toggleFilters = () => setIsFilterOpen(!isFilterOpen);

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
          Shop All Products
        </motion.h1>

        {/* Filter Toggle for Mobile */}
        <div className="md:hidden mb-6">
          <button
            onClick={toggleFilters}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-primary to-blue-700 text-white rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
          >
            <FaFilter className="mr-2" />
            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filters Bar */}
        <AnimatePresence>
          {(isFilterOpen || window.innerWidth >= 768) && (
            <motion.div
              className="w-full bg-gradient-to-r from-primary to-blue-700 backdrop-blur-sm p-6 rounded-lg border border-cyan-400/20 mb-8"
              variants={filterVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-6 md:mb-0 md:hidden">
                Filters
              </h2>
              <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-6 md:space-y-0">
                {/* Search Bar */}
                <div className="flex-1">
                  <label className="block text-gray-300 mb-2 md:hidden">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                      placeholder="Search products..."
                      className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Condition Filter */}
                <div className="flex-1">
                  <label className="block text-gray-300 mb-2 md:hidden">Condition</label>
                  <select
                    value={filters.condition}
                    onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
                    className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="all">All Conditions</option>
                    <option value="New">New</option>
                    <option value="Refurbished">Refurbished</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div className="flex-1">
                  <label className="block text-gray-300 mb-2 md:hidden">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="all">All Categories</option>
                    <option value="Laptop">Laptops</option>
                    <option value="Smartphone">Smartphones</option>
                    <option value="Headphones">Headphones</option>
                    <option value="Tablet">Tablets</option>
                  </select>
                </div>

                {/* Price Range Filter */}
                <div className="flex-1">
                  <label className="block text-gray-300 mb-2 md:hidden">
                    Price Range: KSh {filters.priceRange[0].toLocaleString()} -{' '}
                    KSh {filters.priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={filters.priceRange}
                    onChange={(e, newValue) => setFilters({ ...filters, priceRange: newValue })}
                    valueLabelDisplay="auto"
                    min={0}
                    max={200000} // Updated to match highest price in products.js
                    step={1000}
                    sx={{
                      color: '#10B981', // Matches secondary color
                      '& .MuiSlider-thumb': { backgroundColor: '#fff' },
                      '& .MuiSlider-track': { backgroundColor: '#10B981' },
                      '& .MuiSlider-rail': { backgroundColor: '#4B5563' },
                    }}
                  />
                </div>

                {/* Sort Options */}
                <div className="flex-1">
                  <label className="block text-gray-300 mb-2 md:hidden">Sort By</label>
                  <select
                    value={filters.sort}
                    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                    className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="default">Sort: Default</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="w-full">
          <AnimatePresence>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                className="text-center text-gray-400 py-12"
                variants={noResultsVariants}
                initial="hidden"
                animate="visible"
              >
                <p className="text-xl">No products found matching your filters.</p>
                <p className="mt-2">Try adjusting your search or filter settings.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductList;