import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMenu, FiX, FiChevronDown } = FiIcons;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(null);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    {
      name: 'Collections',
      dropdown: [
        { name: 'Natural Stone', path: '/natural-stone' },
        { name: 'Quartz', path: '/quartz' },
        { name: 'Shower Panels', path: '/shower-panels' },
        { name: 'Cabinets', path: '/cabinets' }
      ]
    },
    { name: 'Appointments', path: '/appointments' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isDropdownActive = (dropdown) => {
    return dropdown.some(item => location.pathname.startsWith(item.path));
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white border-b border-stone-200'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/">
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl font-bold tracking-tight text-surface-dark">
                PREMIUM
              </span>
              <span className="w-px h-6 bg-stone-300" />
              <span className="font-body text-[10px] font-semibold uppercase tracking-widest-plus text-stone-500">
                Stones
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.dropdown ? (
                  <div
                    onMouseEnter={() => setDropdownOpen(link.name)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    <button
                      className={`px-5 py-2 font-body text-xs font-semibold uppercase tracking-widest transition-colors duration-200 flex items-center gap-1 cursor-pointer ${
                        isDropdownActive(link.dropdown)
                          ? 'text-accent'
                          : 'text-stone-700 hover:text-surface-dark'
                      }`}
                    >
                      {link.name}
                      <SafeIcon icon={FiChevronDown} className="text-[10px]" />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-0 bg-white border border-stone-200 min-w-48"
                        >
                          {link.dropdown.map((item) => (
                            <Link key={item.name} to={item.path}>
                              <div
                                className={`px-6 py-3 font-body text-xs font-medium uppercase tracking-widest transition-colors duration-150 ${
                                  isActive(item.path)
                                    ? 'text-accent bg-stone-50'
                                    : 'text-stone-700 hover:text-surface-dark hover:bg-stone-50'
                                }`}
                              >
                                {item.name}
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <div
                      className={`px-5 py-2 font-body text-xs font-semibold uppercase tracking-widest transition-colors duration-200 relative ${
                        isActive(link.path)
                          ? 'text-accent'
                          : 'text-stone-700 hover:text-surface-dark'
                      }`}
                    >
                      {link.name}
                      {isActive(link.path) && (
                        <span className="absolute bottom-0 left-5 right-5 h-px bg-accent" />
                      )}
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 cursor-pointer"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <SafeIcon icon={isOpen ? FiX : FiMenu} className="text-xl text-surface-dark" />
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-stone-200"
            >
              <div className="py-6 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.dropdown ? (
                      <div>
                        <div className="px-2 py-3 font-body text-xs font-semibold uppercase tracking-widest text-stone-400">
                          {link.name}
                        </div>
                        {link.dropdown.map((item) => (
                          <Link key={item.name} to={item.path}>
                            <div
                              className={`block px-6 py-3 font-body text-sm font-medium transition-colors duration-150 ${
                                isActive(item.path)
                                  ? 'text-accent'
                                  : 'text-stone-700 hover:text-surface-dark'
                              }`}
                            >
                              {item.name}
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link to={link.path}>
                        <div
                          className={`block px-2 py-3 font-body text-xs font-semibold uppercase tracking-widest transition-colors duration-150 ${
                            isActive(link.path)
                              ? 'text-accent'
                              : 'text-stone-700 hover:text-surface-dark'
                          }`}
                        >
                          {link.name}
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
