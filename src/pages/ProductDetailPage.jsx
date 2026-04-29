import React, { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowLeft } = FiIcons;

const ProductDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [activeImage, setActiveImage] = useState(0);

  const categoryPath = location.pathname.startsWith('/quartz') ? '/quartz' : '/natural-stone';
  const categoryLabel = categoryPath === '/quartz' ? 'Quartz' : 'Natural Stone';

  const product = {
    id: parseInt(id),
    name: 'Carrara Marble Classic',
    material: 'Marble',
    finish: 'Polished',
    origin: 'Brazil',
    applications: ['Countertops', 'Backsplashes', 'Flooring', 'Wall Cladding', 'Bathroom Vanities'],
    gallery: [
      'https://images.unsplash.com/photo-1623197532650-bacb8a68914e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540177656454-3f6c4547bed1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1640280882429-204f63d777e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1745985966566-06866a284a4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  };

  return (
    <div className="min-h-screen bg-surface pt-20">
      {/* Breadcrumb */}
      <section className="py-6 px-6 lg:px-8 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <Link to={categoryPath}>
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-widest text-stone-500 hover:text-surface-dark transition-colors duration-200 cursor-pointer">
              <SafeIcon icon={FiArrowLeft} className="text-sm" />
              Back to {categoryLabel}
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
                  src={product.gallery[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3 mt-3">
                {product.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square overflow-hidden border cursor-pointer transition-colors duration-200 ${
                      activeImage === index ? 'border-surface-dark' : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
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
                {product.featured && (
                  <span className="bg-surface-dark text-white px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest">
                    Featured
                  </span>
                )}
                <span className="border border-stone-300 text-stone-700 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest">
                  {product.material}
                </span>
              </div>

              {/* Title */}
              <div>
                {/* Product name stays ink — orange would compete with the product photography. */}
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-surface-dark leading-tight">
                  {product.name}
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
                  { label: 'Origin', value: product.origin },
                  { label: 'Finish', value: product.finish },
                  { label: 'Material', value: product.material }
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
              {product.applications.map((application) => (
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
              Ready to Use This Material?
            </h2>
            <p className="font-body text-base text-stone-500 mb-10 max-w-xl mx-auto leading-relaxed">
              Our experts can help you calculate quantities, plan installation,
              and ensure the perfect result for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/appointments">
                <button className="btn-primary">Schedule Consultation</button>
              </Link>
              <Link to={categoryPath}>
                <button className="btn-outline">Browse More {categoryLabel}</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
