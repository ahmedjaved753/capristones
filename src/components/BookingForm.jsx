import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCalendar, FiClock, FiUser, FiPhone, FiMail, FiCheck } = FiIcons;

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: ''
  });

  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setFormData({
      ...formData,
      time: time
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    // Handle form submission here
  };

  const isFormValid = formData.name && formData.email && formData.phone && formData.date && formData.time;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Book Your Consultation
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Schedule a free consultation with our design experts to bring your vision to life
          </p>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-3xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <SafeIcon icon={FiUser} className="text-amber-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <SafeIcon icon={FiPhone} className="text-amber-500" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <SafeIcon icon={FiMail} className="text-amber-500" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white"
                placeholder="your.email@example.com"
                required
              />
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <SafeIcon icon={FiCalendar} className="text-amber-500" />
                Select Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white"
                required
              />
            </div>

            {/* Time Selection */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <SafeIcon icon={FiClock} className="text-amber-500" />
                Select Time
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {timeSlots.map((time) => (
                  <motion.button
                    key={time}
                    type="button"
                    onClick={() => handleTimeSelect(time)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${
                      selectedTime === time
                        ? 'bg-amber-500 text-white shadow-lg'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-amber-50'
                    }`}
                  >
                    {time}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={!isFormValid}
              whileHover={isFormValid ? { scale: 1.02 } : {}}
              whileTap={isFormValid ? { scale: 0.98 } : {}}
              className={`w-full py-5 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                isFormValid
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xl hover:shadow-2xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <SafeIcon icon={FiCheck} className="text-xl" />
              Confirm Appointment
            </motion.button>

            <p className="text-center text-sm text-gray-500 mt-4">
              We'll send you a confirmation email within 24 hours
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingForm;