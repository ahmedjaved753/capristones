import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiGrid, FiList, FiArrowRight, FiSearch } = FiIcons;

const NaturalStonePage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'All',
    color: 'All',
    finish: 'All'
  });

  const naturalStones = [
    {
      id: 1,
      name: 'Carrara Marble',
      type: 'Marble',
      color: 'White',
      finish: 'Polished',
      origin: 'Brazil',
      image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'The epitome of luxury, prized for centuries for its pure white background and subtle gray veining.',
      characteristics: ['Elegant veining', 'Timeless appeal', 'Versatile applications'],
      applications: ['Countertops', 'Backsplashes', 'Flooring', 'Sculptures'],
      featured: true
    },
    {
      id: 2,
      name: 'Absolute Black Granite',
      type: 'Granite',
      color: 'Black',
      finish: 'Polished',
      origin: 'Brazil',
      image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Pure black granite with no patterns, offering a sleek modern aesthetic for contemporary designs.',
      characteristics: ['Uniform color', 'High durability', 'Heat resistant'],
      applications: ['Countertops', 'Islands', 'Exterior cladding']
    },
    {
      id: 3,
      name: 'Travertine Romano',
      type: 'Travertine',
      color: 'Beige',
      finish: 'Tumbled',
      origin: 'Brazil',
      image: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Classic Roman travertine with warm beige tones and natural pitting that creates authentic Old World charm.',
      characteristics: ['Natural texture', 'Warm tones', 'Historical significance'],
      applications: ['Flooring', 'Wall cladding', 'Pool decking']
    },
    {
      id: 4,
      name: 'Emperador Dark',
      type: 'Marble',
      color: 'Brown',
      finish: 'Honed',
      origin: 'Brazil',
      image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Rich chocolate brown marble with dramatic white and gold veining for warm, luxurious spaces.',
      characteristics: ['Rich brown color', 'Dramatic veining', 'Warm undertones'],
      applications: ['Feature walls', 'Countertops', 'Fireplace surrounds']
    }
  ];

  const filterOptions = {
    type: ['All', 'Marble', 'Granite', 'Travertine', 'Limestone', 'Slate'],
    color: ['All', 'White', 'Black', 'Brown', 'Beige', 'Cream', 'Gray'],
    finish: ['All', 'Polished', 'Honed', 'Tumbled', 'Natural']
  };

  const filteredStones = naturalStones.filter(stone => {
    const matchesSearch = stone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stone.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filters.type === 'All' || stone.type === filters.type;
    const matchesColor = filters.color === 'All' || stone.color === filters.color;
    const matchesFinish = filters.finish === 'All' || stone.finish === filters.finish;
    return matchesSearch && matchesType && matchesColor && matchesFinish;
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
              Natural<br />
              <span className="italic font-normal text-accent-warm">Stone</span>
            </h1>
            <p className="font-body text-base text-stone-500 max-w-2xl leading-relaxed">
              Discover the timeless beauty of natural stone. Each piece tells a story
              millions of years in the making, bringing unique character to your space.
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
                placeholder="Search natural stone types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-stone-200 bg-white font-body text-sm focus:outline-none focus:border-surface-dark transition-colors duration-200"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Controls */}
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
                    <option key={option} value={option}>{filterType === 'type' && option === 'All' ? 'All Types' : filterType === 'color' && option === 'All' ? 'All Colors' : filterType === 'finish' && option === 'All' ? 'All Finishes' : option}</option>
                  ))}
                </select>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="font-body text-xs text-stone-500">
                {filteredStones.length} {filteredStones.length === 1 ? 'stone' : 'stones'}
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

      {/* Stones Grid */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'space-y-6'
          }>
            <AnimatePresence>
              {filteredStones.map((stone, index) => (
                <motion.div
                  key={stone.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link to={`/natural-stone/${stone.id}`} className="group block">
                    <div className={`bg-white border border-stone-200 hover:border-stone-400 transition-colors duration-200 ${
                      viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                    }`}>
                      {/* Image */}
                      <div className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'md:w-2/5 aspect-[4/3] md:aspect-auto md:min-h-[280px]' : 'aspect-[4/3]'
                      }`}>
                        <img
                          src={stone.image}
                          alt={stone.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {stone.featured && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-surface-dark text-white px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest">
                              Featured
                            </span>
                          </div>
                        )}
                        <div className="absolute bottom-4 right-4">
                          <span className="bg-white/90 text-surface-dark px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-wider">
                            {stone.origin}
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
                                {stone.name}
                              </h3>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-stone-500">
                                  {stone.type}
                                </span>
                                <span className="w-px h-3 bg-stone-300" />
                                <span className="font-body text-[10px] font-medium uppercase tracking-wider text-stone-400">
                                  {stone.finish}
                                </span>
                              </div>
                            </div>
                            {/* "By Inquiry" replaces the former price — quiet eyebrow keeps the card photography as hero. */}
                            <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-stone-500 mt-2">
                              By Inquiry
                            </span>
                          </div>

                          <p className="font-body text-sm text-stone-500 leading-relaxed mt-4">
                            {stone.description}
                          </p>

                          {/* Characteristics */}
                          <div className="flex flex-wrap gap-2 mt-5">
                            {stone.characteristics.map((char) => (
                              <span
                                key={char}
                                className="px-3 py-1 border border-stone-200 font-body text-[10px] font-medium uppercase tracking-wider text-stone-600"
                              >
                                {char}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* View Details */}
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

          {filteredStones.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <h3 className="font-display text-3xl font-bold text-accent mb-4">No stones found</h3>
              <p className="font-body text-sm text-stone-500 mb-8">Try adjusting your filters or search terms</p>
              <button
                onClick={() => {
                  setFilters({ type: 'All', color: 'All', finish: 'All' });
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
            <p className="label-text mb-4">Visit Us</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-accent mb-6">
              Experience Natural Beauty
            </h2>
            <p className="font-body text-base text-stone-500 mb-10 max-w-xl mx-auto leading-relaxed">
              Visit our showroom to see and feel these magnificent natural stones.
              Each piece has its own unique character.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/appointments">
                <button className="btn-primary">Visit Our Showroom</button>
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

export default NaturalStonePage;
