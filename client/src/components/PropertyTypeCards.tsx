import React from 'react';
import { motion } from 'framer-motion';

const propertyTypes = [
  {
    title: "Scenic View",
    image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Skyscrapers",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "High-Rises",
    image: "https://images.pexels.com/photos/136419/pexels-photo-136419.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Villas",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
    
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut'
    }
  }),
};

const PropertyTypeCards = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-xl text-teal-600 font-semibold uppercase mb-2 tracking-wider">Property Match</h3>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          We care for what you care.
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Tell us what your dream property looks like — and let us handle the rest.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {propertyTypes.map((property, index) => (
            <motion.div
              key={index}
              className="rounded-xl overflow-hidden shadow-lg group cursor-pointer transform hover:scale-105 transition-transform duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              variants={fadeInUp}
            >
              <div className="relative h-64">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">{property.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypeCards;
