import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import HeroCarousel from '../components/HeroCarousel';

const { FiArrowRight, FiMapPin, FiPhone } = FiIcons;

const HomePage = () => {
  // Lifestyle imagery for the collection cards (added 2026-05-06): each card shows
  // the material installed in a finished space rather than a raw slab close-up.
  // Files are bundled locally in /public/collections/. To swap, see HOW-TO-REVISE
  // Recipe 21.
  const productCategories = [
    {
      name: 'Natural Stone',
      path: '/natural-stone',
      image: '/collections/Collection-natural-stone-bathroom.jpg',
      description: 'Authentic natural stone with unique character and timeless beauty',
      label: '01'
    },
    {
      name: 'Quartz',
      path: '/quartz',
      image: '/collections/Collection-quartz-kitchen-island.jpg',
      description: 'Engineered quartz surfaces combining beauty with enduring durability',
      label: '02'
    }
  ];

  return (
    <div>
      {/* Hero Section — HeroCarousel renders a 2-image auto-sliding background.
          The editorial frame below (eyebrow / H1 / sub / CTAs) is passed in as
          children and stays static while the lifestyle visuals change
          underneath. The old scroll-cue chrome was retired here because the
          index strip at the bottom of the carousel is a richer scroll
          affordance. */}
      <HeroCarousel>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="label-text text-stone-300 mb-6">
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
          <span className="italic font-normal text-accent-warm">
            to Last
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="font-body text-lg text-stone-200 mt-8 max-w-xl leading-relaxed"
        >
          Transform your space with our curated collection of natural stone
          and engineered quartz. Exceptional quality meets timeless design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-12 mb-40 md:mb-32"
        >
          <Link to="/contact">
            <button className="bg-white text-surface-dark px-10 py-4 font-body text-xs font-semibold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer">
              Visit Our Showroom
            </button>
          </Link>
          <Link to="/natural-stone">
            <button className="border border-white/40 text-white px-10 py-4 font-body text-xs font-semibold uppercase tracking-widest hover:bg-white/10 transition-all duration-300 cursor-pointer">
              Explore Collections
            </button>
          </Link>
        </motion.div>
      </HeroCarousel>

      {/* Brand Story — client-supplied copy (2026-05-06). Sits between hero and collections
          so visitors see who Capri Stone is before browsing. To edit / remove,
          see HOW-TO-REVISE Recipe 19. */}
      <section className="py-32 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <p className="label-text mb-4">Who We Are</p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-accent leading-[1.05]">
                From Quarry{' '}
                <span className="italic font-normal text-accent-warm">
                  to Home
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-6"
            >
              <p className="font-body text-base text-stone-500 leading-relaxed">
                At Capri Stone, innovation, creativity, and sustainability guide
                everything we do — delivering excellence from the quarry to your
                home.
              </p>
              <p className="font-body text-base text-stone-500 leading-relaxed">
                We import premium natural stone, quartz, and kitchen cabinetry,
                offering carefully curated materials to elevate both residential
                and commercial spaces with timeless beauty and quality.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="section-divider" />
      </div>

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
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-accent leading-[1.05]">
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
                    {/* Product names stay ink — orange here would compete with the product photography. */}
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
      <section className="py-32 px-6 lg:px-8 bg-accent-veil">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="label-text mb-4">Walk-Ins Welcome</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-accent leading-[1.05] mb-6">
                Ready to Transform{' '}
                <span className="italic font-normal text-accent-warm">Your Space?</span>
              </h2>
              <p className="font-body text-base text-stone-500 leading-relaxed mb-10 max-w-lg">
                Stop by the showroom any time during business hours — see the
                stones in person, talk through your project, and walk out with a
                plan. No appointment needed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <button className="btn-primary">Visit Our Showroom</button>
                </Link>
                <a href="tel:+14156865392">
                  <button className="btn-outline">Call (415) 686-5392</button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
              className="border border-stone-200 p-10"
            >
              <h3 className="font-display text-2xl font-bold text-accent mb-8">
                Two Showrooms
              </h3>
              {/* Both showrooms walk-in friendly — no appointment needed. Email is
                  intentionally omitted until the client supplies it. */}
              <div className="space-y-6">
                {[
                  {
                    name: 'San Rafael',
                    address: '1925 Francisco Blvd E #15\nSan Rafael, CA 94901',
                    phone: '(415) 686-5392',
                    tel: '+14156865392'
                  },
                  {
                    name: 'Concord',
                    address: '1379 Franquette Ave\nConcord, CA 94520',
                    phone: '(925) 786-4919',
                    tel: '+19257864919'
                  }
                ].map((showroom) => (
                  <div key={showroom.name} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-stone-200 flex items-center justify-center flex-shrink-0">
                      <SafeIcon icon={FiMapPin} className="text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="label-text mb-1">Capri Stone — {showroom.name}</p>
                      <p className="font-body text-sm text-surface-dark whitespace-pre-line">
                        {showroom.address}
                      </p>
                      <a
                        href={`tel:${showroom.tel}`}
                        className="font-body text-sm text-accent hover:text-surface-dark transition-colors duration-200 inline-flex items-center gap-2 mt-2"
                      >
                        <SafeIcon icon={FiPhone} className="text-xs" />
                        {showroom.phone}
                      </a>
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
