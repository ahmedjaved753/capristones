import React, { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowLeft, FiDownload, FiHeart, FiShare2, FiCheck } = FiIcons;

const ProductDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [activeImage, setActiveImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const categoryPath = location.pathname.startsWith('/quartz') ? '/quartz' : '/natural-stone';
  const categoryLabel = categoryPath === '/quartz' ? 'Quartz' : 'Natural Stone';

  const product = {
    id: parseInt(id),
    name: 'Carrara Marble Classic',
    material: 'Marble',
    color: 'White',
    finish: 'Polished',
    price: '$89/sq ft',
    priceRange: '$80-100',
    origin: 'Italy',
    description: 'Elegant white marble with subtle gray veining, perfect for luxury countertops and backsplashes. This timeless natural stone has been prized for centuries for its beauty and durability.',
    longDescription: 'Carrara Marble Classic represents the pinnacle of natural stone elegance. Quarried from the famous Carrara region in Italy, this marble has been the choice of sculptors and architects for over 2,000 years. Its distinctive white background with subtle gray veining creates a sophisticated and timeless aesthetic that complements both traditional and contemporary designs.',
    applications: ['Countertops', 'Backsplashes', 'Flooring', 'Wall Cladding', 'Bathroom Vanities'],
    specifications: {
      thickness: '2cm, 3cm',
      density: '2.7 g/cm\u00B3',
      absorption: '0.1-0.4%',
      compressiveStrength: '131 MPa',
      flexuralStrength: '15.3 MPa',
      abrasionResistance: 'Excellent',
      frostResistance: 'Good'
    },
    care: [
      'Seal regularly with marble sealer',
      'Clean with pH-neutral stone cleaner',
      'Wipe spills immediately to prevent staining',
      'Avoid acidic cleaners and substances',
      'Use cutting boards and trivets'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556909114-4f2a4b97bc7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    inStock: true
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
                {product.inStock && (
                  <span className="border border-green-300 text-green-700 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest flex items-center gap-1">
                    <SafeIcon icon={FiCheck} className="text-xs" />
                    In Stock
                  </span>
                )}
              </div>

              {/* Title & Price */}
              <div>
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-surface-dark leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-4 mt-4">
                  <span className="font-display text-4xl font-bold text-accent">
                    {product.price}
                  </span>
                  <span className="font-body text-sm text-stone-400">
                    Range: {product.priceRange}
                  </span>
                </div>
              </div>

              <div className="h-px bg-stone-200" />

              {/* Description */}
              <div>
                <p className="font-body text-base text-stone-600 leading-relaxed mb-4">
                  {product.description}
                </p>
                <p className="font-body text-sm text-stone-500 leading-relaxed">
                  {product.longDescription}
                </p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-6 border border-stone-200 p-6">
                {[
                  { label: 'Origin', value: product.origin },
                  { label: 'Finish', value: product.finish },
                  { label: 'Color', value: product.color },
                  { label: 'Material', value: product.material }
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
                {product.applications.map((application) => (
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
                {Object.entries(product.specifications).map(([key, value]) => (
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
                {product.care.map((instruction, index) => (
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
