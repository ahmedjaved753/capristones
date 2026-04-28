import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowRight } = FiIcons;

/**
 * ComingSoonPage — placeholder shown for collections that aren't ready yet.
 *
 * Currently shadows /cabinets, /cabinets/:id, /shower-panels, /shower-panels/:id
 * (see App.jsx). The original listing/detail components for those routes still
 * live in src/pages/ but are not mounted. To restore a category, swap its route
 * elements in App.jsx back to the original component imports.
 *
 * Visual language matches the rest of the editorial system:
 * - peach-cream wash (`bg-accent-veil`) marks this as a "moment" page
 * - two-word H1 (terracotta + warm-sienna italic) mirrors every category hero
 * - eyebrow names the specific collection so visitors know which they hit
 * - two CTAs route them to available work or to a conversation
 */
const ComingSoonPage = ({ category }) => {
  return (
    <div className="min-h-screen pt-20 bg-accent-veil">
      <section className="min-h-[calc(100vh-5rem)] flex items-center px-6 lg:px-8 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="label-text mb-6">
              Premium Stones · {category}
            </p>

            <h1 className="font-display text-7xl sm:text-8xl lg:text-9xl font-bold text-accent leading-[0.9] tracking-tight mb-10">
              Coming
              <br />
              <span className="italic font-normal text-accent-warm">Soon.</span>
            </h1>

            <div className="max-w-2xl mb-12">
              <p className="font-body text-lg text-stone-700 leading-relaxed mb-4">
                Our {category.toLowerCase()} collection is being curated to the same standard as the rest of the showroom.
              </p>
              <p className="font-body text-base text-stone-500 leading-relaxed">
                In the meantime, explore our available collections or get in touch — we'd love to talk about your project.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/natural-stone" className="btn-primary inline-flex items-center gap-3">
                Browse Collections
                <SafeIcon icon={FiArrowRight} />
              </Link>
              <Link to="/contact" className="btn-outline inline-flex items-center gap-3">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ComingSoonPage;
