// Currently SHADOWED: the /shower-panels/:id route in App.jsx renders <ComingSoonPage category="Shower Panels" /> instead of this component.
// This file is intentionally preserved so the detail page can be restored by editing App.jsx — no need to rebuild it.
// To restore: in App.jsx, swap the /shower-panels/:id Route element back to <ShowerPanelDetailPage />.
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowLeft } = FiIcons;

const ShowerPanelDetailPage = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);

  const panel = {
    id: parseInt(id),
    name: 'Calacatta Marble Panel',
    material: 'Marble',
    finish: 'Polished',
    size: '60" × 120"',
    applications: ['Shower walls', 'Tub surrounds', 'Wet rooms', 'Feature walls', 'Bath niches'],
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
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
              </div>

              {/* Title */}
              <div>
                {/* Product name stays ink — orange would compete with the product photography. */}
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-surface-dark leading-tight">
                  {panel.name}
                </h1>
                {/* "Pricing on request" replaces the former price block — single quiet terracotta line keeps the H1 supported without competing with photography. */}
                <p className="mt-4 font-body text-xs font-semibold uppercase tracking-widest text-accent">
                  Pricing on Request
                </p>
                <p className="mt-2 font-body text-sm text-stone-500">
                  Contact us for a personalized quote.
                </p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-3 gap-6 border border-stone-200 p-6">
                {[
                  { label: 'Panel Size', value: panel.size },
                  { label: 'Finish', value: panel.finish },
                  { label: 'Material', value: panel.material }
                ].map((spec) => (
                  <div key={spec.label}>
                    <span className="label-text">{spec.label}</span>
                    <p className="font-body text-sm font-medium text-surface-dark mt-1">{spec.value}</p>
                  </div>
                ))}
              </div>

            </motion.div>
          </div>

          {/* Applications — single centered block now that Tech Specs / Care were removed. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-24 max-w-2xl mx-auto"
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
              <Link to="/contact">
                <button className="btn-primary">Visit Our Showroom</button>
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
