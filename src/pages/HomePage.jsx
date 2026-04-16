import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowRight, FiMapPin, FiPhone, FiMail } = FiIcons;

const HomePage = () => {
  const productCategories = [
    {
      name: 'Natural Stone',
      path: '/natural-stone',
      image: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Authentic natural stone with unique character and timeless beauty',
      label: '01'
    },
    {
      name: 'Quartz',
      path: '/quartz',
      image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Engineered quartz surfaces combining beauty with enduring durability',
      label: '02'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1615971677499-5467cbab01c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-surface-dark/60" />

        <div className="relative z-10 flex items-center h-full min-h-[90vh] px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <p className="label-text text-stone-400 mb-6">
                Premium Natural Stone & Quartz
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight max-w-4xl"
            >
              Surfaces Built{' '}
              <span className="italic font-normal text-accent-light">
                to Last
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-body text-lg text-stone-300 mt-8 max-w-xl leading-relaxed"
            >
              Transform your space with our curated collection of natural stone
              and engineered quartz. Exceptional quality meets timeless design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mt-12"
            >
              <Link to="/appointments">
                <button className="bg-white text-surface-dark px-10 py-4 font-body text-xs font-semibold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer">
                  Book Appointment
                </button>
              </Link>
              <Link to="/natural-stone">
                <button className="border border-white/30 text-white px-10 py-4 font-body text-xs font-semibold uppercase tracking-widest hover:bg-white/10 transition-all duration-300 cursor-pointer">
                  Explore Collections
                </button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-6 lg:left-8 flex items-center gap-4"
        >
          <div className="w-px h-16 bg-white/30" />
          <span className="font-body text-[10px] uppercase tracking-widest text-white/50">
            Scroll
          </span>
        </motion.div>
      </section>

      {/* Product Categories */}
      <section className="py-32 px-6 lg:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-20"
          >
            <div>
              <p className="label-text mb-4">Our Collections</p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-dark leading-[1.05]">
                Explore the<br />Finest Materials
              </h2>
            </div>
            <p className="font-body text-base text-stone-500 max-w-md mt-6 md:mt-0 leading-relaxed">
              Discover the perfect surface for your project — authentic natural
              stone or engineered quartz.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={category.path} className="group block">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-surface-dark/20 group-hover:bg-surface-dark/40 transition-colors duration-300" />
                    <div className="absolute top-6 left-6">
                      <span className="font-body text-xs font-medium text-white/60">
                        {category.label}
                      </span>
                    </div>
                    <div className="absolute bottom-6 right-6">
                      <div className="w-12 h-12 border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                        <SafeIcon
                          icon={FiArrowRight}
                          className="text-white group-hover:text-surface-dark transition-colors duration-300"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 pb-2">
                    <h3 className="font-display text-3xl font-bold text-surface-dark group-hover:text-accent transition-colors duration-200">
                      {category.name}
                    </h3>
                    <p className="font-body text-sm text-stone-500 mt-2 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="section-divider" />
      </div>

      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="label-text mb-4">Book a Consultation</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-surface-dark leading-[1.05] mb-6">
                Ready to Transform{' '}
                <span className="italic font-normal">Your Space?</span>
              </h2>
              <p className="font-body text-base text-stone-500 leading-relaxed mb-10 max-w-lg">
                Schedule a consultation with our design experts and discover how
                premium materials can bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/appointments">
                  <button className="btn-primary">Schedule Consultation</button>
                </Link>
                <Link to="/contact">
                  <button className="btn-outline">Contact Us</button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
              className="border border-stone-200 p-10"
            >
              <h3 className="font-display text-2xl font-bold text-surface-dark mb-8">
                Contact Information
              </h3>
              <div className="space-y-6">
                {[
                  { icon: FiMapPin, label: 'Address', value: '1234 Stone Avenue\nPremium District, CA 90210' },
                  { icon: FiPhone, label: 'Phone', value: '(555) 123-4567' },
                  { icon: FiMail, label: 'Email', value: 'info@premiumstone.com' }
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-stone-200 flex items-center justify-center flex-shrink-0">
                      <SafeIcon icon={item.icon} className="text-accent" />
                    </div>
                    <div>
                      <p className="label-text mb-1">{item.label}</p>
                      <p className="font-body text-sm text-surface-dark whitespace-pre-line">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
