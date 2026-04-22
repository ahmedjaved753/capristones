import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowLeft, FiDownload, FiHeart, FiShare2, FiCheck } = FiIcons;

const ShowerPanelDetailPage = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const panel = {
    id: parseInt(id),
    name: 'Calacatta Marble Panel',
    material: 'Marble',
    color: 'White',
    finish: 'Polished',
    size: '60" × 120"',
    price: '$120/sq ft',
    priceRange: '$110-135',
    description: 'Book-matched Calacatta marble in a single seamless panel, engineered for shower walls and wet rooms. Eliminates grout lines and creates a continuous veining pattern across the entire installation.',
    longDescription: 'Cut from the finest Carrara quarries, our Calacatta shower panels arrive as matched pairs that can be installed side-by-side for a mirrored, book-matched effect. Large-format sizing (up to 60" × 120") means a typical shower needs just 3 panels for complete coverage — dramatically reducing grout joints and install time compared to traditional tile.',
    applications: ['Shower walls', 'Tub surrounds', 'Wet rooms', 'Feature walls', 'Bath niches'],
    specifications: {
      thickness: '6mm / 10mm',
      substrate: 'Porcelain-backed marble',
      waterAbsorption: '< 0.5%',
      edgeTreatment: 'Mitered',
      installSystem: 'Adhesive + trim',
      fireRating: 'Class A'
    },
    care: [
      'Seal perimeter silicone annually',
      'Clean with pH-neutral stone cleaner',
      'Wipe water spots after each use to preserve shine',
      'Avoid acidic cleaners and abrasive pads',
      'Check seam integrity during annual maintenance'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    inStock: true
  };

  return (
    <div className="min-h-screen bg-surface pt-20">
      {/* Breadcrumb */}
      <section className="py-6 px-6 lg:px-8 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <Link to="/shower-panels">
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-widest text-stone-500 hover:text-surface-dark transition-colors duration-200 cursor-pointer">
              <SafeIcon icon={FiArrowLeft} className="text-sm" />
              Back to Shower Panels
            </span>
          </Link>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-[4/3] overflow-hidden border border-stone-200">
                <img
                  src={panel.gallery[activeImage]}
                  alt={panel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3 mt-3">
                {panel.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square overflow-hidden border cursor-pointer transition-colors duration-200 ${
                      activeImage === index ? 'border-surface-dark' : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${panel.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-8"
            >
              {/* Badges */}
              <div className="flex items-center gap-3">
                {panel.featured && (
                  <span className="bg-surface-dark text-white px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest">
                    Featured
                  </span>
                )}
                <span className="border border-stone-300 text-stone-700 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest">
                  {panel.material}
                </span>
                {panel.inStock && (
                  <span className="border border-green-300 text-green-700 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest flex items-center gap-1">
                    <SafeIcon icon={FiCheck} className="text-xs" />
                    In Stock
                  </span>
                )}
              </div>

              {/* Title & Price */}
              <div>
                {/* Product name stays ink — price below is the orange moment; making both terracotta flattens hierarchy. */}
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-surface-dark leading-tight">
                  {panel.name}
                </h1>
                <div className="flex items-baseline gap-4 mt-4">
                  <span className="font-display text-4xl font-bold text-accent">
                    {panel.price}
                  </span>
                  <span className="font-body text-sm text-stone-400">
                    Range: {panel.priceRange}
                  </span>
                </div>
              </div>

              <div className="h-px bg-stone-200" />

              {/* Description */}
              <div>
                <p className="font-body text-base text-stone-600 leading-relaxed mb-4">
                  {panel.description}
                </p>
                <p className="font-body text-sm text-stone-500 leading-relaxed">
                  {panel.longDescription}
                </p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-6 border border-stone-200 p-6">
                {[
                  { label: 'Panel Size', value: panel.size },
                  { label: 'Finish', value: panel.finish },
                  { label: 'Color', value: panel.color },
                  { label: 'Material', value: panel.material }
                ].map((spec) => (
                  <div key={spec.label}>
                    <span className="label-text">{spec.label}</span>
                    <p className="font-body text-sm font-medium text-surface-dark mt-1">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 btn-primary flex items-center justify-center gap-3">
                  <SafeIcon icon={FiDownload} />
                  Download Product Sheet
                </button>
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`w-12 h-12 border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    isSaved ? 'bg-red-50 border-red-200 text-red-500' : 'border-stone-200 text-stone-400 hover:border-stone-400'
                  }`}
                >
                  <SafeIcon icon={FiHeart} className={isSaved ? 'fill-current' : ''} />
                </button>
                <button className="w-12 h-12 border border-stone-200 text-stone-400 hover:border-stone-400 flex items-center justify-center transition-colors duration-200 cursor-pointer">
                  <SafeIcon icon={FiShare2} />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Detailed Info */}
          <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-display text-2xl font-bold text-accent mb-6">Applications</h3>
              <div className="space-y-2">
                {panel.applications.map((application) => (
                  <div key={application} className="flex items-center gap-3 py-3 border-b border-stone-100">
                    <span className="w-1.5 h-1.5 bg-accent flex-shrink-0" />
                    <span className="font-body text-sm text-stone-700">{application}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="font-display text-2xl font-bold text-accent mb-6">Technical Specifications</h3>
              <div className="space-y-0">
                {Object.entries(panel.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-stone-100">
                    <span className="font-body text-sm text-stone-500 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-body text-sm font-medium text-surface-dark">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Care */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="font-display text-2xl font-bold text-accent mb-6">Care & Maintenance</h3>
              <div className="space-y-3">
                {panel.care.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <SafeIcon icon={FiCheck} className="text-accent mt-0.5 flex-shrink-0 text-sm" />
                    <span className="font-body text-sm text-stone-600 leading-relaxed">{instruction}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-8 bg-surface border-t border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="label-text mb-4">Next Steps</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-accent mb-6">
              Ready to Specify This Panel?
            </h2>
            <p className="font-body text-base text-stone-500 mb-10 max-w-xl mx-auto leading-relaxed">
              Our team can help you measure, template, and plan installation for a seamless result.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/appointments">
                <button className="btn-primary">Schedule Consultation</button>
              </Link>
              <Link to="/shower-panels">
                <button className="btn-outline">Browse More Panels</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ShowerPanelDetailPage;
