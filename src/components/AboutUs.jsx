import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMapPin, FiClock, FiPhone, FiMail, FiUsers, FiAward, FiTool } = FiIcons;

const AboutUs = () => {
  const stats = [
    {
      icon: FiUsers,
      number: "500+",
      label: "Happy Customers"
    },
    {
      icon: FiAward,
      number: "15+",
      label: "Years Experience"
    },
    {
      icon: FiTool,
      number: "1000+",
      label: "Projects Completed"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About Our Craftsmanship
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            For over 15 years, we've been transforming homes with premium stone surfaces and custom cabinetry. 
            Our commitment to quality and attention to detail has made us the trusted choice for homeowners 
            who demand excellence.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                Precision Meets Artistry
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Every piece we create is a testament to our dedication to excellence. From the initial design 
                consultation to the final installation, we ensure every detail meets our exacting standards.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our team of skilled craftsmen combines traditional techniques with modern technology to deliver 
                results that exceed expectations. We source only the finest materials and employ time-tested 
                methods to create pieces that will last generations.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-3">
                    <SafeIcon 
                      icon={stat.icon} 
                      className="text-3xl text-amber-500" 
                    />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Our workshop"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-xl font-semibold mb-2">Our Workshop</h4>
                <p className="text-gray-200">Where precision meets passion</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-20"></div>

        {/* Showroom Location */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Visit Our Showroom
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience our materials firsthand and meet with our design experts in our beautiful showroom
          </p>
        </motion.div>

        {/* Location Info & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Location Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Showroom Details</h4>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <SafeIcon icon={FiMapPin} className="text-2xl text-amber-500 mt-1" />
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Address</h5>
                    <p className="text-gray-600">
                      1234 Stone Avenue<br />
                      Premium District, CA 90210
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <SafeIcon icon={FiClock} className="text-2xl text-amber-500 mt-1" />
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Hours</h5>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: By Appointment</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <SafeIcon icon={FiPhone} className="text-2xl text-amber-500 mt-1" />
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Phone</h5>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <SafeIcon icon={FiMail} className="text-2xl text-amber-500 mt-1" />
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Email</h5>
                    <p className="text-gray-600">info@premiumstone.com</p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-8 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Visit Us Today
              </motion.button>
            </div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-96 lg:h-full min-h-[400px]"
          >
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.733219240862!2d-118.40853368478994!3d34.073620780600394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2a4cec2910019%3A0x4ca9fb0e8623d7d7!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1644123456789!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Showroom Location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;