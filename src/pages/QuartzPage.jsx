import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiGrid, FiList, FiArrowRight, FiSearch, FiStar } = FiIcons;

const QuartzPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    brand: 'All',
    color: 'All',
    pattern: 'All',
    finish: 'All'
  });

  const quartzProducts = [
    {
      id: 1,
      name: 'Pure White',
      brand: 'Caesarstone',
      color: 'White',
      pattern: 'Solid',
      finish: 'Polished',
      price: '$65/sq ft',
      thickness: '2cm, 3cm',
      image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Pure white quartz with subtle sparkle, perfect for modern minimalist designs.',
      features: ['Non-porous', 'Stain resistant', 'Easy maintenance'],
      applications: ['Countertops', 'Backsplashes', 'Islands'],
      rating: 4.8,
      popular: true
    },
    {
      id: 2,
      name: 'Midnight Black',
      brand: 'Silestone',
      color: 'Black',
      pattern: 'Solid',
      finish: 'Polished',
      price: '$85/sq ft',
      thickness: '3cm',
      image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Deep black quartz with subtle shimmer for dramatic contemporary spaces.',
      features: ['Uniform color', 'Highly durable', 'Heat resistant'],
      applications: ['Countertops', 'Feature walls', 'Luxury projects'],
      rating: 4.9
    },
    {
      id: 3,
      name: 'Concrete Gray',
      brand: 'HanStone',
      color: 'Gray',
      pattern: 'Solid',
      finish: 'Matte',
      price: '$58/sq ft',
      thickness: '2cm, 3cm',
      image: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Industrial-inspired gray quartz with concrete-like appearance for modern spaces.',
      features: ['Matte finish', 'Fingerprint resistant', 'Contemporary look'],
      applications: ['Countertops', 'Islands', 'Commercial spaces'],
      rating: 4.6
    },
    {
      id: 4,
      name: 'Warm Brown',
      brand: 'Caesarstone',
      color: 'Brown',
      pattern: 'Solid',
      finish: 'Honed',
      price: '$75/sq ft',
      thickness: '3cm',
      image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Rich brown quartz with warm undertones, perfect for cozy traditional spaces.',
      features: ['Warm tones', 'Consistent pattern', 'Sophisticated look'],
      applications: ['Traditional kitchens', 'Warm color schemes', 'Feature elements'],
      rating: 4.7
    }
  ];

  const filterOptions = {
    brand: ['All', 'Caesarstone', 'Silestone', 'HanStone', 'Corian Quartz', 'Cambria'],
    color: ['All', 'White', 'Black', 'Gray', 'Brown'],
    pattern: ['All', 'Solid', 'Veined', 'Speckled'],
    finish: ['All', 'Polished', 'Honed', 'Matte']
  };

  const filteredQuartz = quartzProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = filters.brand === 'All' || product.brand === filters.brand;
    const matchesColor = filters.color === 'All' || product.color === filters.color;
    const matchesPattern = filters.pattern === 'All' || product.pattern === filters.pattern;
    const matchesFinish = filters.finish === 'All' || product.finish === filters.finish;
    return matchesSearch && matchesBrand && matchesColor && matchesPattern && matchesFinish;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  return (
    <div className="min-h-screen bg-surface pt-20">
      {/* Hero */}
      <section className="py-24 px-6 lg:px-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="label-text mb-4">Collection</p>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-accent leading-[0.95] tracking-tight mb-8">
              Engineered<br />
              <span className="italic font-normal text-accent-warm">Quartz</span>
            </h1>
            <p className="font-body text-base text-stone-500 max-w-2xl leading-relaxed">
              Experience the perfect blend of natural beauty and modern engineering.
              Our quartz surfaces offer unmatched durability and consistent beauty.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="max-w-xl mt-12"
          >
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search quartz brands and patterns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-stone-200 bg-white font-body text-sm focus:outline-none focus:border-surface-dark transition-colors duration-200"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 px-6 lg:px-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex flex-wrap gap-3">
              {Object.entries(filterOptions).map(([filterType, options]) => (
                <select
                  key={filterType}
                  value={filters[filterType]}
                  onChange={(e) => handleFilterChange(filterType, e.target.value)}
                  className="px-4 py-2 border border-stone-200 font-body text-xs uppercase tracking-wider focus:outline-none focus:border-surface-dark bg-white cursor-pointer"
                >
                  {options.map(option => (
                    <option key={option} value={option}>
                      {option === 'All' ? `All ${filterType.charAt(0).toUpperCase() + filterType.slice(1)}s` : option}
                    </option>
                  ))}
                </select>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="font-body text-xs text-stone-500">
                {filteredQuartz.length} {filteredQuartz.length === 1 ? 'product' : 'products'}
              </span>
              <div className="flex border border-stone-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-surface-dark text-white' : 'text-stone-400 hover:text-surface-dark'
                  }`}
                >
                  <SafeIcon icon={FiGrid} className="text-sm" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-surface-dark text-white' : 'text-stone-400 hover:text-surface-dark'
                  }`}
                >
                  <SafeIcon icon={FiList} className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'space-y-6'
          }>
            <AnimatePresence>
              {filteredQuartz.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link to={`/quartz/${product.id}`} className="group block">
                    <div className={`bg-white border border-stone-200 hover:border-stone-400 transition-colors duration-200 ${
                      viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                    }`}>
                      {/* Image */}
                      <div className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'md:w-2/5 aspect-[4/3] md:aspect-auto md:min-h-[280px]' : 'aspect-[4/3]'
                      }`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {product.popular && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-accent text-white px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest">
                              Popular
                            </span>
                          </div>
                        )}
                        <div className="absolute bottom-4 right-4">
                          <span className="bg-white/90 text-surface-dark px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-wider">
                            {product.brand}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`p-8 ${viewMode === 'list' ? 'md:w-3/5 flex flex-col justify-between' : ''}`}>
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              {/* Product names stay ink — orange here would compete with the product photography. */}
                              <h3 className="font-display text-2xl font-bold text-surface-dark group-hover:text-accent transition-colors duration-200">
                                {product.name}
                              </h3>
                              <div className="flex items-center gap-3 mt-2">
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <SafeIcon
                                      key={i}
                                      icon={FiStar}
                                      className={`text-xs ${
                                        i < Math.floor(product.rating) ? 'text-accent fill-current' : 'text-stone-300'
                                      }`}
                                    />
                                  ))}
                                  <span className="font-body text-xs text-stone-500 ml-1">{product.rating}</span>
                                </div>
                              </div>
                            </div>
                            <span className="font-display text-2xl font-bold text-accent">
                              {product.price}
                            </span>
                          </div>

                          <p className="font-body text-sm text-stone-500 leading-relaxed mt-4">
                            {product.description}
                          </p>

                          {/* Specs */}
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-5">
                            {[
                              { label: 'Pattern', value: product.pattern },
                              { label: 'Finish', value: product.finish },
                              { label: 'Thickness', value: product.thickness },
                              { label: 'Brand', value: product.brand }
                            ].map((spec) => (
                              <div key={spec.label}>
                                <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-stone-400">
                                  {spec.label}
                                </span>
                                <p className="font-body text-sm text-surface-dark">{spec.value}</p>
                              </div>
                            ))}
                          </div>

                          {/* Features */}
                          <div className="flex flex-wrap gap-2 mt-5">
                            {product.features.map((feature) => (
                              <span
                                key={feature}
                                className="px-3 py-1 border border-stone-200 font-body text-[10px] font-medium uppercase tracking-wider text-stone-600"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-6 font-body text-xs font-semibold uppercase tracking-widest text-surface-dark group-hover:text-accent transition-colors duration-200">
                          View Details
                          <SafeIcon icon={FiArrowRight} className="text-sm transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredQuartz.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <h3 className="font-display text-3xl font-bold text-accent mb-4">No products found</h3>
              <p className="font-body text-sm text-stone-500 mb-8">Try adjusting your filters or search terms</p>
              <button
                onClick={() => {
                  setFilters({ brand: 'All', color: 'All', pattern: 'All', finish: 'All' });
                  setSearchQuery('');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-8 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="label-text mb-4">Why Quartz</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-accent mb-6">
              Why Choose Engineered Quartz?
            </h2>
            <p className="font-body text-base text-stone-500 mb-10 max-w-xl mx-auto leading-relaxed">
              Non-porous, stain-resistant, and available in consistent patterns
              and colors — engineered for modern living.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/appointments">
                <button className="btn-primary">Schedule Consultation</button>
              </Link>
              <Link to="/contact">
                <button className="btn-outline">Contact Us</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default QuartzPage;
