import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';

const ProductGallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const products = [
    {
      id: 1,
      name: 'Carrara Marble Countertop',
      category: 'Stone',
      image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      description: 'Elegant white marble with subtle gray veining',
      price: '$89/sq ft'
    },
    {
      id: 2,
      name: 'Modern Kitchen Cabinets',
      category: 'Cabinets',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      description: 'Sleek contemporary design with soft-close hinges',
      price: '$299/linear ft'
    },
    {
      id: 3,
      name: 'Granite Kitchen Island',
      category: 'Stone',
      image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      description: 'Black galaxy granite with gold flecks',
      price: '$125/sq ft'
    },
    {
      id: 4,
      name: 'Shaker Style Vanity',
      category: 'Cabinets',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      description: 'Classic white shaker doors with brass hardware',
      price: '$189/linear ft'
    },
    {
      id: 5,
      name: 'Quartz Waterfall Edge',
      category: 'Stone',
      image: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      description: 'Stunning waterfall edge with book-matched pattern',
      price: '$145/sq ft'
    },
    {
      id: 6,
      name: 'Custom Pantry System',
      category: 'Cabinets',
      image: 'https://images.unsplash.com/photo-1556909114-35a97b6c08b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      description: 'Organized storage with pull-out drawers',
      price: '$349/linear ft'
    }
  ];

  const filters = ['All', 'Stone', 'Cabinets'];

  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Premium Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of premium stone surfaces and custom cabinetry
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-full p-1 shadow-lg">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'bg-amber-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-amber-500'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGallery;