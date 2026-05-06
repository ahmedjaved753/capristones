import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';
import SafeIcon from '../common/SafeIcon';

const { FiArrowUpRight, FiInstagram, FiFacebook } = FiIcons;

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/capri_stone_bayarea/',
    icon: FiInstagram,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/capristonebay/',
    icon: FiFacebook,
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@capri_stone',
    icon: SiTiktok,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Natural Stone', href: '#/natural-stone' },
    { name: 'Quartz', href: '#/quartz' },
    { name: 'Contact', href: '#/contact' }
  ];

  return (
    <footer className="bg-surface-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top divider line */}
        <div className="h-px bg-stone-800" />

        {/* Main footer */}
        <div className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              {/* Decorative — heading below already announces the brand to screen readers. */}
              <img src="/logo.png" alt="" aria-hidden="true" className="h-16 w-auto mb-4" />
              <h3 className="font-display text-3xl font-bold text-accent-warm mb-6">Premium Stones</h3>
              <p className="font-body text-sm text-stone-400 leading-relaxed max-w-xs mb-4">
                At Capri Stone, innovation, creativity, and sustainability guide
                everything we do — delivering excellence from the quarry to your home.
              </p>
              <p className="font-body text-sm text-stone-400 leading-relaxed max-w-xs mb-6">
                We import premium natural stone, quartz, and kitchen cabinetry,
                offering carefully curated materials to elevate both residential and
                commercial spaces with timeless beauty and quality.
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="text-stone-400 hover:text-accent-warm transition-colors duration-200"
                  >
                    <SafeIcon icon={social.icon} className="w-5 h-5" />
                  </a>
                ))}
              </div>
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

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-body text-xs font-semibold uppercase tracking-widest-plus text-stone-500 mb-6">
                Visit Us
              </h4>
              <div className="space-y-5 font-body text-sm">
                {/* San Rafael showroom */}
                <div>
                  <p className="font-body text-[10px] font-semibold uppercase tracking-widest-plus text-accent-warm mb-1">
                    San Rafael
                  </p>
                  <p className="text-stone-400">1925 Francisco Blvd E #15</p>
                  <p className="text-stone-400">San Rafael, CA 94901</p>
                  <a href="tel:+14156865392" className="text-stone-400 hover:text-white transition-colors duration-200 block mt-1">
                    (415) 686-5392
                  </a>
                </div>

                {/* Concord showroom */}
                <div>
                  <p className="font-body text-[10px] font-semibold uppercase tracking-widest-plus text-accent-warm mb-1">
                    Concord
                  </p>
                  <p className="text-stone-400">1379 Franquette Ave</p>
                  <p className="text-stone-400">Concord, CA 94520</p>
                  <a href="tel:+19257864919" className="text-stone-400 hover:text-white transition-colors duration-200 block mt-1">
                    (925) 786-4919
                  </a>
                </div>

                {/* Hours apply to both showrooms. Email field deliberately omitted — client will supply it. */}
                <div className="text-stone-500 text-xs pt-2 border-t border-stone-800">
                  <p>Mon — Sat: 9AM — 5PM</p>
                  <p>Sun: 10AM — 4PM</p>
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
