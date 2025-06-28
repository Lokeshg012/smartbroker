import React, { useEffect, useState } from 'react';
import { Star, StarHalf } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Kapoor',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
    message: 'I made ₹60 lakhs in just 3 months using Smart Broker. The platform is magical!',
  },
  {
    name: 'Rohit Mehra',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    rating: 4.5,
    message: 'Finding property became fun instead of painful. Smooth, reliable and surprisingly easy.',
  },
  {
    name: 'Sneha Verma',
    image: 'https://randomuser.me/api/portraits/women/42.jpg',
    rating: 5,
    message: 'The AI broker talks like my bestie. Honestly, don’t feel like using any other app!',
  },
];

const TestimonialCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 2500); // Change every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center mt-2 space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
        {halfStar && <StarHalf className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
      </div>
    );
  };

  return (
    <div className="bg-white py-20 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Testimonials</h2>
        <p className="text-gray-600 text-lg">
          Real people. Real stories. Real success with Smart Broker.
        </p>
      </div>

      {/* Swipe carousel effect */}
      <div className="relative max-w-4xl mx-auto overflow-hidden h-auto">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${index * 100}%)`,
            width: `${testimonials.length * 100}%`,
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-full px-4"
              style={{ width: '100%' }}
            >
              <div className="flex bg-gray-50 rounded-2xl shadow-xl w-full p-6 md:p-10 items-center space-x-6 md:space-x-8">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                />
                <div className="text-left">
                  <p className="text-lg text-gray-800 font-medium leading-relaxed mb-2">"{t.message}"</p>
                  <p className="text-sm text-gray-500 font-semibold">– {t.name}</p>
                  {renderStars(t.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
