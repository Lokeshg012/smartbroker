import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  matchScore?: number;
  matchInsight?: string;
  isVerified?: boolean;
}

interface PropertyCarouselProps {
  properties: Property[];
  title: string;
}

const PropertyCarousel: React.FC<PropertyCarouselProps> = ({ properties, title }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const CARD_WIDTH = 340; // Approximate width including spacing

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * CARD_WIDTH,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  };

  const scrollLeft = () => {
    if (activeIndex > 0) scrollToIndex(activeIndex - 1);
  };

  const scrollRight = () => {
    if (activeIndex < properties.length - 1) {
      scrollToIndex(activeIndex + 1);
    } else {
      scrollToIndex(0); // loop back to start
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [properties]);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      scrollRight();
    }, 2500); // Change every 2.5 seconds
    return () => clearInterval(autoScroll);
  }, [activeIndex, properties]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>

      <div className="relative group">
        {/* Left Arrow */}
        <Button
          variant="outline"
          size="icon"
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border-gray-300 transition-opacity ${
            canScrollLeft ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
          } hover:bg-gray-50`}
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Right Arrow */}
        <Button
          variant="outline"
          size="icon"
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border-gray-300 transition-opacity ${
            canScrollRight ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
          } hover:bg-gray-50`}
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={checkScrollButtons}
        >
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyCarousel;
