import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowUpRight } = FiIcons;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Natural Stone', href: '#/natural-stone' },
    { name: 'Quartz', href: '#/quartz' },
    { name: 'Appointments', href: '#/appointments' },
    { name: 'Contact', href: '#/contact' }
  ];

  const services = [
    'Natural Stone Surfaces',
    'Engineered Quartz',
    'Design Consultation',
    'Showroom Visit',
    'Installation'
  ];

  return (
    <footer className="bg-surface-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top divider line */}
        <div className="h-px bg-stone-800" />

        {/* Main footer */}
        <div className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h3 className="font-display text-3xl font-bold mb-6">Premium Stones</h3>
              <p className="font-body text-sm text-stone-400 leading-relaxed max-w-xs">
                Transforming homes with premium natural stone and engineered quartz
                surfaces for over 15 years.
              </p>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-body text-xs font-semibold uppercase tracking-widest-plus text-stone-500 mb-6">
                Navigation
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-stone-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      <SafeIcon
                        icon={FiArrowUpRight}
                        className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-body text-xs font-semibold uppercase tracking-widest-plus text-stone-500 mb-6">
                Services
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <span className="font-body text-sm text-stone-400">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-body text-xs font-semibold uppercase tracking-widest-plus text-stone-500 mb-6">
                Contact
              </h4>
              <div className="space-y-4 font-body text-sm">
                <div className="text-stone-400">
                  <p>1234 Stone Avenue</p>
                  <p>Premium District, CA 90210</p>
                </div>
                <div>
                  <a href="tel:+15551234567" className="text-stone-400 hover:text-white transition-colors duration-200 block">
                    (555) 123-4567
                  </a>
                  <a href="mailto:info@premiumstone.com" className="text-stone-400 hover:text-white transition-colors duration-200 block mt-1">
                    info@premiumstone.com
                  </a>
                </div>
                <div className="text-stone-500 text-xs">
                  <p>Mon — Fri: 9AM — 6PM</p>
                  <p>Sat: 10AM — 4PM</p>
                  <p>Sun: By Appointment</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom */}
        <div className="h-px bg-stone-800" />
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-stone-600">
            &copy; {currentYear} Premium Stones. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="font-body text-xs text-stone-600 hover:text-stone-400 transition-colors duration-200">
              Privacy
            </a>
            <a href="#" className="font-body text-xs text-stone-600 hover:text-stone-400 transition-colors duration-200">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
