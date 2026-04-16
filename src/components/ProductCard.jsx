import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          
          {/* Overlay on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end"
          >
            <div className="p-6 text-white">
              <p className="text-sm mb-2">{product.description}</p>
              <div className="text-2xl font-bold text-amber-400">{product.price}</div>
            </div>
          </motion.div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              product.category === 'Stone' 
                ? 'bg-blue-500 text-white' 
                : 'bg-green-500 text-white'
            }`}>
              {product.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;