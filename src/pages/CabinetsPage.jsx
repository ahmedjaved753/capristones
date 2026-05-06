// Currently SHADOWED: the /cabinets route in App.jsx renders <ComingSoonPage category="Cabinets" /> instead of this component.
// This file is intentionally preserved so the listing can be restored by editing App.jsx — no need to rebuild it.
// To restore: in App.jsx, swap the /cabinets Route element back to <CabinetsPage />.
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiGrid, FiList, FiArrowRight, FiSearch } = FiIcons;

const CabinetsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    style: 'All',
    wood: 'All',
    color: 'All',
    doorType: 'All'
  });

  const cabinets = [
    {
      id: 1,
      name: 'Shaker White Oak',
      style: 'Shaker',
      wood: 'White Oak',
      color: 'Natural',
      doorType: 'Full Overlay',
      image: 'https://images.unsplash.com/photo-1667841712928-6372a8bb1f3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Classic 5-piece Shaker doors in quarter-sawn white oak, finished with a clear conversion varnish that highlights the grain.',
      characteristics: ['Quarter-sawn grain', 'Soft-close hinges', 'Dovetail drawers'],
      applications: ['Kitchens', 'Vanities', 'Mudrooms'],
      featured: true
    },
    {
      id: 2,
      name: 'Frameless Walnut Flat-Panel',
      style: 'Flat Panel',
      wood: 'Walnut',
      color: 'Natural',
      doorType: 'Full Overlay',
      image: 'https://images.unsplash.com/photo-1745985966566-06866a284a4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'European-style frameless construction in rift-cut walnut, optimized for maximum interior storage and a seamless modern face.',
      characteristics: ['Frameless build', 'Rift-cut grain', 'Full-access interior'],
      applications: ['Modern kitchens', 'Home offices', 'Entertainment built-ins']
    },
    {
      id: 3,
      name: 'Inset Cherry Raised-Panel',
      style: 'Raised Panel',
      wood: 'Cherry',
      color: 'Natural',
      doorType: 'Inset',
      image: 'https://images.unsplash.com/photo-1667841678290-6d13122e0fea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Traditional inset cabinetry in solid cherry with raised-panel doors, matched and beaded for heirloom-quality results.',
      characteristics: ['Solid cherry doors', 'Beaded face frame', 'Heirloom joinery'],
      applications: ['Traditional kitchens', 'Libraries', 'Bath vanities']
    },
    {
      id: 4,
      name: 'Modern Slab Espresso',
      style: 'Slab',
      wood: 'Painted MDF',
      color: 'Espresso',
      doorType: 'Full Overlay',
      image: 'https://images.unsplash.com/photo-1574179545952-beea045f0b12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Clean, flush slab doors finished in deep espresso lacquer — a contemporary look with no visible hardware when paired with push-open.',
      characteristics: ['Flush slab face', 'Hand-sprayed lacquer', 'Push-open ready'],
      applications: ['Contemporary kitchens', 'Condo vanities', 'Minimalist built-ins']
    }
  ];

  const filterOptions = {
    style: ['All', 'Shaker', 'Flat Panel', 'Raised Panel', 'Slab'],
    wood: ['All', 'White Oak', 'Maple', 'Walnut', 'Cherry', 'Painted MDF'],
    color: ['All', 'White', 'Natural', 'Espresso', 'Gray', 'Custom'],
    doorType: ['All', 'Full Overlay', 'Inset', 'Partial']
  };

  const filteredCabinets = cabinets.filter(cabinet => {
    const matchesSearch = cabinet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cabinet.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStyle = filters.style === 'All' || cabinet.style === filters.style;
    const matchesWood = filters.wood === 'All' || cabinet.wood === filters.wood;
    const matchesColor = filters.color === 'All' || cabinet.color === filters.color;
    const matchesDoorType = filters.doorType === 'All' || cabinet.doorType === filters.doorType;
    return matchesSearch && matchesStyle && matchesWood && matchesColor && matchesDoorType;
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
              Custom<br />
              <span className="italic font-normal text-accent-warm">Cabinets</span>
            </h1>
            <p className="font-body text-base text-stone-500 max-w-2xl leading-relaxed">
              Custom-built kitchen, vanity, and built-in cabinetry, designed to complement our stone and surface work.
              Traditional joinery, modern hardware, finishes matched to your space.
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
                placeholder="Search cabinet styles..."
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
                    <option key={option} value={option}>{filterType === 'style' && option === 'All' ? 'All Styles' : filterType === 'wood' && option === 'All' ? 'All Woods' : filterType === 'color' && option === 'All' ? 'All Colors' : filterType === 'doorType' && option === 'All' ? 'All Door Types' : option}</option>
                  ))}
                </select>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="font-body text-xs text-stone-500">
                {filteredCabinets.length} {filteredCabinets.length === 1 ? 'cabinet' : 'cabinets'}
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

      {/* Cabinets Grid */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'space-y-6'
          }>
            <AnimatePresence>
              {filteredCabinets.map((cabinet, index) => (
                <motion.div
                  key={cabinet.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link to={`/cabinets/${cabinet.id}`} className="group block">
                    <div className={`bg-white border border-stone-200 hover:border-stone-400 transition-colors duration-200 ${
                      viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                    }`}>
                      {/* Image */}
                      <div className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'md:w-2/5 aspect-[4/3] md:aspect-auto md:min-h-[280px]' : 'aspect-[4/3]'
                      }`}>
                        <img
                          src={cabinet.image}
                          alt={cabinet.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {cabinet.featured && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-surface-dark text-white px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest">
                              Featured
                            </span>
                          </div>
                        )}
                        <div className="absolute bottom-4 right-4">
                          <span className="bg-white/90 text-surface-dark px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-wider">
                            {cabinet.doorType}
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
                                {cabinet.name}
                              </h3>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-stone-500">
                                  {cabinet.style}
                                </span>
                                <span className="w-px h-3 bg-stone-300" />
                                <span className="font-body text-[10px] font-medium uppercase tracking-wider text-stone-400">
                                  {cabinet.wood}
                                </span>
                              </div>
                            </div>
                            {/* "By Inquiry" replaces the former price — quiet eyebrow keeps the card photography as hero. */}
                            <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-stone-500 mt-2">
                              By Inquiry
                            </span>
                          </div>

                          <p className="font-body text-sm text-stone-500 leading-relaxed mt-4">
                            {cabinet.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-5">
                            {cabinet.characteristics.map((char) => (
                              <span
                                key={char}
                                className="px-3 py-1 border border-stone-200 font-body text-[10px] font-medium uppercase tracking-wider text-stone-600"
                              >
                                {char}
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

          {filteredCabinets.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <h3 className="font-display text-3xl font-bold text-accent mb-4">No cabinets found</h3>
              <p className="font-body text-sm text-stone-500 mb-8">Try adjusting your filters or search terms</p>
              <button
                onClick={() => {
                  setFilters({ style: 'All', wood: 'All', color: 'All', doorType: 'All' });
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
              Design Your Cabinets With Us
            </h2>
            <p className="font-body text-base text-stone-500 mb-10 max-w-xl mx-auto leading-relaxed">
              Stop by the showroom and we'll walk you through samples, hardware, and layout options in person. Walk-ins welcome.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
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

export default CabinetsPage;
