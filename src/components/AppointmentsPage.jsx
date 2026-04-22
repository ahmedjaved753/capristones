import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCalendar, FiClock, FiUser, FiPhone, FiMail, FiCheck, FiMapPin, FiArrowRight } = FiIcons;

const AppointmentsPage = () => {
  const [formData, setFormData] = useState({
    serviceType: '',
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const serviceTypes = [
    'Stone Consultation',
    'Shower Panel Consultation',
    'Cabinet Design',
    'General Visit',
    'Installation Planning',
    'Maintenance Consultation'
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment booked:', formData);
    setShowConfirmation(true);

    setTimeout(() => {
      setShowConfirmation(false);
      setFormData({
        serviceType: '', name: '', email: '', phone: '',
        date: '', time: '', message: ''
      });
    }, 3000);
  };

  const isFormValid = formData.serviceType && formData.name && formData.email &&
                     formData.phone && formData.date && formData.time;

  if (showConfirmation) {
    return (
      <section className="py-32 px-6 lg:px-8 bg-surface min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="border border-stone-200 bg-white p-12">
            <div className="w-16 h-16 border-2 border-accent flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiCheck} className="text-2xl text-accent" />
            </div>
            <h2 className="font-display text-3xl font-bold text-accent mb-4">
              Appointment Confirmed
            </h2>
            <p className="font-body text-sm text-stone-500 mb-8">
              We'll send you a confirmation email shortly with all the details.
            </p>
            <div className="border border-stone-200 p-6 text-left">
              <p className="label-text mb-4">Appointment Details</p>
              <div className="space-y-3 font-body text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Service</span>
                  <span className="text-surface-dark font-medium">{formData.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Date</span>
                  <span className="text-surface-dark font-medium">{new Date(formData.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Time</span>
                  <span className="text-surface-dark font-medium">{formData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Name</span>
                  <span className="text-surface-dark font-medium">{formData.name}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 lg:px-8 bg-surface min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="label-text mb-4">Appointments</p>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-accent leading-[1.05] mb-6">
            Book Your{' '}
            <span className="italic font-normal text-accent-warm">Appointment</span>
          </h1>
          <p className="font-body text-base text-stone-500 max-w-2xl leading-relaxed">
            Schedule a consultation with our design experts to discuss your project
            and explore our premium materials.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="border border-stone-200 bg-white p-8 lg:p-12">
              <h2 className="font-display text-2xl font-bold text-accent mb-8">
                Schedule Your Visit
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Service Type */}
                <div>
                  <label className="label-text block mb-2">Service Type *</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-stone-200 font-body text-sm focus:outline-none focus:border-surface-dark bg-white cursor-pointer"
                    required
                  >
                    <option value="">Select a service</option>
                    {serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label-text block mb-2">
                      <SafeIcon icon={FiUser} className="inline text-accent mr-1 text-xs" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-stone-200 font-body text-sm focus:outline-none focus:border-surface-dark"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="label-text block mb-2">
                      <SafeIcon icon={FiPhone} className="inline text-accent mr-1 text-xs" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-stone-200 font-body text-sm focus:outline-none focus:border-surface-dark"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="label-text block mb-2">
                    <SafeIcon icon={FiMail} className="inline text-accent mr-1 text-xs" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-stone-200 font-body text-sm focus:outline-none focus:border-surface-dark"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label-text block mb-2">
                      <SafeIcon icon={FiCalendar} className="inline text-accent mr-1 text-xs" />
                      Select Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-4 border border-stone-200 font-body text-sm focus:outline-none focus:border-surface-dark"
                      required
                    />
                  </div>
                  <div>
                    <label className="label-text block mb-2">
                      <SafeIcon icon={FiClock} className="inline text-accent mr-1 text-xs" />
                      Select Time *
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-stone-200 font-body text-sm focus:outline-none focus:border-surface-dark bg-white cursor-pointer"
                      required
                    >
                      <option value="">Choose time</option>
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="label-text block mb-2">Additional Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-4 border border-stone-200 font-body text-sm focus:outline-none focus:border-surface-dark resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full py-4 font-body text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer ${
                    isFormValid
                      ? 'bg-surface-dark text-white hover:bg-accent'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <SafeIcon icon={FiCalendar} />
                  Book Appointment
                </button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Showroom Info */}
            <div className="border border-stone-200 bg-white p-8">
              <h3 className="font-display text-xl font-bold text-accent mb-6">
                Visit Our Showroom
              </h3>
              <div className="space-y-5">
                {[
                  { icon: FiMapPin, label: 'Address', lines: ['1234 Stone Avenue', 'Premium District, CA 90210'] },
                  { icon: FiClock, label: 'Hours', lines: ['Mon-Fri: 9AM-6PM', 'Sat: 10AM-4PM', 'Sun: By Appointment'] },
                  { icon: FiPhone, label: 'Contact', lines: ['(555) 123-4567'] }
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <SafeIcon icon={item.icon} className="text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="label-text mb-1">{item.label}</p>
                      {item.lines.map((line) => (
                        <p key={line} className="font-body text-sm text-stone-600">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What to Expect */}
            <div className="border border-stone-200 p-8">
              <h3 className="font-display text-xl font-bold text-accent mb-6">
                What to Expect
              </h3>
              <div className="space-y-4">
                {[
                  'Personal consultation with design experts',
                  'Hands-on material selection',
                  'Custom design recommendations',
                  'Detailed project timeline and pricing'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-accent flex-shrink-0 mt-1.5" />
                    <p className="font-body text-sm text-stone-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentsPage;
