import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Animation variants for the title
const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Animation variants for the subtitle
const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: 'easeOut' } },
};

// Animation variants for the CTA button
const ctaVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.4, ease: 'easeOut' } },
  hover: {
    scale: 1.05,
    boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)', // Glow effect using secondary color
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

const Hero = ({ title, subtitle, ctaText, ctaLink }) => {
  return (
    <div className="relative w-full bg-gradient-to-br from-primary via-blue-700 to-gray-900 text-white py-20">
      {/* Background Element: Subtle Geometric Shape */}
      <div className="absolute inset-0 opacity-10 z-1">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L100,0 L100,50 Q50,100 0,50 Z"
            fill="url(#gradient)"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#1E40AF', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center md:text-left md:ml-12">
          {/* Title */}
          <motion.h1
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent leading-tight"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl mt-4 text-gray-200 max-w-2xl"
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            {subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="mt-8"
          >
            <Link
              to={ctaLink}
              className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-secondary to-green-400 text-white font-medium text-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg"
            >
              {ctaText}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;