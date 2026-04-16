import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPhone, FiMail, FiMapPin, FiArrowRight, FiClock } = FiIcons;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const isFormValid = formData.name && formData.email && formData.message;

  const contactInfo = [
    { icon: FiPhone, title: 'Phone', content: '(555) 123-4567', subtitle: 'Mon-Fri 9AM-6PM' },
    { icon: FiMail, title: 'Email', content: 'info@premiumstone.com', subtitle: 'We respond within 24 hours' },
    { icon: FiMapPin, title: 'Address', content: '1234 Stone Avenue', subtitle: 'Premium District, CA 90210' }
  ];

  return (
    <section className="py-24 px-6 lg:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="label-text mb-4">Get in Touch</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-dark leading-[1.05]">
              Let's Start{' '}
              <span className="italic font-normal">Your Project</span>
            </h2>
            <p className="font-body text-base text-stone-500 max-w-md mt-4 lg:mt-0 leading-relaxed">
              Ready to transform your space? Get in touch with our team for a
              consultation and quote.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="font-body text-base text-stone-500 leading-relaxed">
              Whether you're planning a complete renovation or looking for a single
              countertop, our team is here to bring your vision to life.
            </p>

            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div key={info.title} className="border border-stone-200 p-6 flex items-start gap-4">
                  <div className="w-10 h-10 border border-stone-200 flex items-center justify-center flex-shrink-0">
                    <SafeIcon icon={info.icon} className="text-accent" />
                  </div>
                  <div>
                    <p className="label-text mb-1">{info.title}</p>
                    <p className="font-body text-sm font-medium text-surface-dark">{info.content}</p>
                    <p className="font-body text-xs text-stone-400 mt-0.5">{info.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="border border-stone-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border border-stone-200 flex items-center justify-center">
                  <SafeIcon icon={FiClock} className="text-accent" />
                </div>
                <p className="label-text">Business Hours</p>
              </div>
              <div className="space-y-2 ml-[52px]">
                {[
                  ['Monday — Friday', '9:00 AM — 6:00 PM'],
                  ['Saturday', '10:00 AM — 4:00 PM'],
                  ['Sunday', 'By Appointment']
                ].map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="font-body text-sm text-stone-500">{day}</span>
                    <span className="font-body text-sm font-medium text-surface-dark">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="border border-stone-200 p-8 lg:p-10 bg-white"
          >
            <h3 className="font-display text-2xl font-bold text-surface-dark mb-8">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="label-text block mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-stone-200 font-body text-sm focus:outline-none focus:border-surface-dark transition-colors duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="label-text block mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-stone-200 font-body text-sm focus:outline-none focus:border-surface-dark transition-colors duration-200"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="label-text block mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-4 py-4 border border-stone-200 font-body text-sm focus:outline-none focus:border-surface-dark transition-colors duration-200 resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-4 font-body text-sm font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer ${
                  isFormValid
                    ? 'bg-surface-dark text-white hover:bg-accent'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                Send Message
                <SafeIcon icon={FiArrowRight} />
              </button>
            </form>

            <p className="text-center font-body text-xs text-stone-400 mt-4">
              We'll get back to you within 24 hours
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
