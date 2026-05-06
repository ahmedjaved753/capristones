// Currently SHADOWED: the /shower-panels route in App.jsx renders <ComingSoonPage category="Shower Panels" /> instead of this component.
// This file is intentionally preserved so the listing can be restored by editing App.jsx — no need to rebuild it.
// To restore: in App.jsx, swap the /shower-panels Route element back to <ShowerPanelsPage />.
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiGrid, FiList, FiArrowRight, FiSearch } = FiIcons;

const ShowerPanelsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    material: 'All',
    color: 'All',
    size: 'All',
    finish: 'All'
  });

  const showerPanels = [
    {
      id: 1,
      name: 'Calacatta Marble Panel',
      material: 'Marble',
      color: 'White',
      size: '5x10',
      finish: 'Polished',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Book-matched Calacatta marble in a single seamless panel, transforming the shower into a statement wall.',
      characteristics: ['Book-matched veining', 'Seamless install', 'Grout-free'],
      applications: ['Shower walls', 'Tub surrounds', 'Wet rooms'],
      featured: true
    },
    {
      id: 2,
      name: 'Statuario Porcelain Panel',
      material: 'Porcelain',
      color: 'White',
      size: '5x10',
      finish: 'Matte',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Large-format porcelain with Statuario-inspired veining, offering marble looks at a fraction of the maintenance.',
      characteristics: ['Near-zero absorption', 'Stain resistant', 'Low maintenance'],
      applications: ['Shower walls', 'Feature walls', 'Commercial wet areas']
    },
    {
      id: 3,
      name: 'Walnut Laminate Panel',
      material: 'Laminate',
      color: 'Brown',
      size: '4x8',
      finish: 'Matte',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Warm walnut-grain laminate for a spa-like shower, engineered for daily water exposure.',
      characteristics: ['Waterproof core', 'Warm tones', 'Budget-friendly'],
      applications: ['Shower walls', 'Accent panels', 'Guest baths']
    },
    {
      id: 4,
      name: 'Carrara Quartz Panel',
      material: 'Quartz',
      color: 'White',
      size: 'Custom',
      finish: 'Polished',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Engineered quartz panel fabricated to your exact shower dimensions, with Carrara-style veining throughout.',
      characteristics: ['Custom sizing', 'Non-porous', 'Consistent pattern'],
      applications: ['Shower walls', 'Tub surrounds', 'Luxury master baths']
    }
  ];

  const filterOptions = {
    material: ['All', 'Marble', 'Quartz', 'Porcelain', 'Laminate'],
    color: ['All', 'White', 'Black', 'Gray', 'Beige', 'Brown'],
    size: ['All', '4x8', '5x10', 'Custom'],
    finish: ['All', 'Polished', 'Matte']
  };

  const filteredPanels = showerPanels.filter(panel => {
    const matchesSearch = panel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         panel.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMaterial = filters.material === 'All' || panel.material === filters.material;
    const matchesColor = filters.color === 'All' || panel.color === filters.color;
    const matchesSize = filters.size === 'All' || panel.size === filters.size;
    const matchesFinish = filters.finish === 'All' || panel.finish === filters.finish;
    return matchesSearch && matchesMaterial && matchesColor && matchesSize && matchesFinish;
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
              Shower<br />
              <span className="italic font-normal text-accent-warm">Panels</span>
            </h1>
            <p className="font-body text-base text-stone-500 max-w-2xl leading-relaxed">
              Large-format shower panels in natural stone, engineered quartz, porcelain, and laminate.
              Seamless, waterproof surfaces that transform the shower into a single continuous statement.
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
                placeholder="Search shower panels..."
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
                    <option key={option} value={option}>{filterType === 'material' && option === 'All' ? 'All Materials' : filterType === 'color' && option === 'All' ? 'All Colors' : filterType === 'size' && option === 'All' ? 'All Sizes' : filterType === 'finish' && option === 'All' ? 'All Finishes' : option}</option>
                  ))}
                </select>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="font-body text-xs text-stone-500">
                {filteredPanels.length} {filteredPanels.length === 1 ? 'panel' : 'panels'}
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

      {/* Panels Grid */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'space-y-6'
          }>
            <AnimatePresence>
              {filteredPanels.map((panel, index) => (
                <motion.div
                  key={panel.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link to={`/shower-panels/${panel.id}`} className="group block">
                    <div className={`bg-white border border-stone-200 hover:border-stone-400 transition-colors duration-200 ${
                      viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                    }`}>
                      {/* Image */}
                      <div className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'md:w-2/5 aspect-[4/3] md:aspect-auto md:min-h-[280px]' : 'aspect-[4/3]'
                      }`}>
                        <img
                          src={panel.image}
                          alt={panel.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {panel.featured && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-surface-dark text-white px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest">
                              Featured
                            </span>
                          </div>
                        )}
                        <div className="absolute bottom-4 right-4">
                          <span className="bg-white/90 text-surface-dark px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-wider">
                            {panel.size}
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
                                {panel.name}
                              </h3>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-stone-500">
                                  {panel.material}
                                </span>
                                <span className="w-px h-3 bg-stone-300" />
                                <span className="font-body text-[10px] font-medium uppercase tracking-wider text-stone-400">
                                  {panel.finish}
                                </span>
                              </div>
                            </div>
                            {/* "By Inquiry" replaces the former price — quiet eyebrow keeps the card photography as hero. */}
                            <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-stone-500 mt-2">
                              By Inquiry
                            </span>
                          </div>

                          <p className="font-body text-sm text-stone-500 leading-relaxed mt-4">
                            {panel.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-5">
                            {panel.characteristics.map((char) => (
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

          {filteredPanels.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <h3 className="font-display text-3xl font-bold text-accent mb-4">No panels found</h3>
              <p className="font-body text-sm text-stone-500 mb-8">Try adjusting your filters or search terms</p>
              <button
                onClick={() => {
                  setFilters({ material: 'All', color: 'All', size: 'All', finish: 'All' });
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
              See the Panels in Person
            </h2>
            <p className="font-body text-base text-stone-500 mb-10 max-w-xl mx-auto leading-relaxed">
              Stop by the showroom to see our shower panel displays at full scale and talk install options with our team. Walk-ins welcome.
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

export default ShowerPanelsPage;
