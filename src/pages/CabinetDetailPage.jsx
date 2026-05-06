// Currently SHADOWED: the /cabinets/:id route in App.jsx renders <ComingSoonPage category="Cabinets" /> instead of this component.
// This file is intentionally preserved so the detail page can be restored by editing App.jsx — no need to rebuild it.
// To restore: in App.jsx, swap the /cabinets/:id Route element back to <CabinetDetailPage />.
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowLeft } = FiIcons;

const CabinetDetailPage = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);

  const cabinet = {
    id: parseInt(id),
    name: 'Shaker White Oak',
    style: 'Shaker',
    wood: 'White Oak',
    finish: 'Clear Conversion Varnish',
    construction: 'Face-frame',
    applications: ['Kitchens', 'Bath vanities', 'Mudrooms', 'Laundry rooms', 'Built-in storage'],
    gallery: [
      'https://images.unsplash.com/photo-1667841712928-6372a8bb1f3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1745985966566-06866a284a4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1667841678290-6d13122e0fea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1574179545952-beea045f0b12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  };

  return (
    <div className="min-h-screen bg-surface pt-20">
      {/* Breadcrumb */}
      <section className="py-6 px-6 lg:px-8 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <Link to="/cabinets">
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-widest text-stone-500 hover:text-surface-dark transition-colors duration-200 cursor-pointer">
              <SafeIcon icon={FiArrowLeft} className="text-sm" />
              Back to Cabinets
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
                  src={cabinet.gallery[activeImage]}
                  alt={cabinet.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3 mt-3">
                {cabinet.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square overflow-hidden border cursor-pointer transition-colors duration-200 ${
                      activeImage === index ? 'border-surface-dark' : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${cabinet.name} ${index + 1}`}
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
                {cabinet.featured && (
                  <span className="bg-surface-dark text-white px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest">
                    Featured
                  </span>
                )}
                <span className="border border-stone-300 text-stone-700 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest">
                  {cabinet.style}
                </span>
              </div>

              {/* Title */}
              <div>
                {/* Product name stays ink — orange would compete with the product photography. */}
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-surface-dark leading-tight">
                  {cabinet.name}
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
                  { label: 'Construction', value: cabinet.construction },
                  { label: 'Finish', value: cabinet.finish },
                  { label: 'Wood Species', value: cabinet.wood }
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
              {cabinet.applications.map((application) => (
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
              Design This Cabinetry
            </h2>
            <p className="font-body text-base text-stone-500 mb-10 max-w-xl mx-auto leading-relaxed">
              Stop by the showroom and we'll size the boxes, match the finish, and quote the job. Walk-ins welcome.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <button className="btn-primary">Visit Our Showroom</button>
              </Link>
              <Link to="/cabinets">
                <button className="btn-outline">Browse More Cabinets</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CabinetDetailPage;
