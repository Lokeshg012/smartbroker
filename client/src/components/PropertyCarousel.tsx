import React, { useRef, useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Info, 
  X, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  Mail, 
  Star 
} from 'lucide-react';

// Property interfaces
interface PropertyDetails {
  description: string;
  features: string[];
  images: string[];
  yearBuilt: number;
  propertyType: string;
  contactAgent: {
    name: string;
    phone: string;
    email: string;
  };
  rating: number;
  reviews: number;
}

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
  details?: PropertyDetails;
}

interface PropertyCardProps extends Property {
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onMoreInfo?: (id: string) => void;
  onRemove?: (id: string) => void;
}

// PropertyCard Component
const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  price,
  location,
  beds,
  baths,
  sqft,
  image,
  matchScore,
  matchInsight,
  isVerified = false,
  details,
  onAccept,
  onReject,
  onMoreInfo,
  onRemove
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleHeartClick = () => {
    setIsLiked(!isLiked);
  };

  const handleAccept = () => {
    setIsAccepted(true);
    setIsRejected(false);
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
    onAccept?.(id);
  };

  const handleReject = () => {
    setIsRejected(true);
    setIsAccepted(false);
    onReject?.(id);
    // Remove card from carousel after animation
    setTimeout(() => {
      onRemove?.(id);
    }, 300);
  };

  const handleMoreInfo = () => {
    setIsExpanded(!isExpanded);
    onMoreInfo?.(id);
  };

  const nextImage = () => {
    if (propertyDetails?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % propertyDetails.images.length);
    }
  };

  const prevImage = () => {
    if (propertyDetails?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + propertyDetails.images.length) % propertyDetails.images.length);
    }
  };

  // Sample data for demonstration
  const sampleDetails: PropertyDetails = {
    description: "Beautiful modern home with stunning architecture and premium finishes throughout. This property features an open-concept design perfect for entertaining, with high-end appliances and fixtures. Located in a desirable neighborhood with excellent schools and convenient access to shopping and dining.",
    features: ["Hardwood Floors", "Granite Countertops", "Stainless Steel Appliances", "Walk-in Closets", "Private Patio", "Garage Parking", "Central Air", "Fireplace"],
    images: [
      image,
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&auto=format&fit=crop"
    ],
    yearBuilt: 2018,
    propertyType: "Single Family Home",
    contactAgent: {
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      email: "sarah.johnson@realestate.com"
    },
    rating: 4.8,
    reviews: 24
  };

  const propertyDetails = details || sampleDetails;

  if (isRejected) {
    return null; // Component will be removed from DOM
  }

  return (
    <>
      {/* Thank You Popup */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm mx-4">
            <div className="text-green-500 text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">धन्यवाद!</h3>
            <p className="text-gray-600 mb-2">आपकी रुचि के लिए धन्यवाद। हम जल्द ही आपसे संपर्क करेंगे।</p>
            <p className="text-sm text-gray-500">Thank you for your interest. We'll contact you soon!</p>
          </div>
        </div>
      )}

      {/* Expanded Details Modal */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Property Details</h2>
              <button
                onClick={handleMoreInfo}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Image Gallery */}
              <div className="relative h-64 bg-gray-200 rounded-lg mb-6">
                <img
                  src={propertyDetails.images[currentImageIndex]}
                  alt={title}
                  className="w-full h-full object-cover rounded-lg"
                />
                
                {propertyDetails.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                      {propertyDetails.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Basic Info */}
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">{price}</h3>
                  {isVerified && (
                    <Badge className="bg-teal-500 text-white">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{title}</p>
                <div className="flex items-center text-gray-500 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{location}</span>
                </div>
                
                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{beds} Beds</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{baths} Baths</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span>{sqft}</span>
                  </div>
                </div>
              </div>

              {/* Property Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Property Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Type:</span>
                      <span className="font-medium">{propertyDetails.propertyType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Year Built:</span>
                      <span className="font-medium">{propertyDetails.yearBuilt}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="font-medium">{propertyDetails.rating}</span>
                        <span className="text-gray-500 ml-1">({propertyDetails.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Contact Agent</h4>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">{propertyDetails.contactAgent.name}</p>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-3 w-3 mr-2" />
                      <span>{propertyDetails.contactAgent.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-3 w-3 mr-2" />
                      <span>{propertyDetails.contactAgent.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{propertyDetails.description}</p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Features & Amenities</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {propertyDetails.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="flex-1 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                  onClick={handleReject}
                  disabled={isAccepted}
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject Property
                </Button>
                
                <Button 
                  className={`flex-1 ${
                    isAccepted 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-teal-500 hover:bg-teal-600'
                  } text-white`}
                  onClick={handleAccept}
                >
                  <Check className="h-4 w-4 mr-2" />
                  {isAccepted ? 'Accepted' : 'Accept Property'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Card - Fixed Width */}
      <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 snap-start flex-shrink-0 w-80 ${
        isAccepted ? 'ring-2 ring-green-400 bg-green-50' : ''
      } ${isRejected ? 'opacity-50 scale-95' : ''}`}>
        {/* Image container */}
        <div className="relative h-48 bg-gray-200">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center" style={{ display: 'none' }}>
            <div className="text-gray-500 text-6xl opacity-30">🏠</div>
          </div>
          
          {/* Status Overlay */}
          {isAccepted && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="px-4 py-2 rounded-full text-white font-semibold flex items-center space-x-2 bg-green-500">
                <Check className="h-5 w-5" />
                <span>Accepted</span>
              </div>
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 space-y-2">
            {isVerified && (
              <Badge className="bg-teal-500 text-white shadow-sm">
                ✓ Verified Listing
              </Badge>
            )}
            {matchScore && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 shadow-sm">
                {matchScore}% Match
              </Badge>
            )}
          </div>
          
          {/* Heart icon */}
          <button 
            onClick={handleHeartClick}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-all duration-200 hover:scale-110"
          >
            <Heart 
              className={`h-4 w-4 transition-colors ${
                isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'
              }`} 
            />
          </button>
        </div>

        {/* Content */}
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg text-gray-900">{price}</h3>
            {matchScore && (
              <div className="text-xs text-green-600 font-medium">
                AI Match: {matchScore}%
              </div>
            )}
          </div>
          
          <p className="text-gray-600 text-sm mb-2 line-clamp-2 leading-relaxed">{title}</p>
          
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          <div className="flex items-center justify-between text-gray-600 text-sm mb-4">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{beds}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{baths}</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span>{sqft}</span>
            </div>
          </div>

          {matchInsight && (
            <div className="mb-4 p-3 bg-teal-50 rounded-lg border-l-4 border-teal-400">
              <p className="text-sm text-teal-800 font-medium flex items-center">
                <Info className="h-3 w-3 mr-1" />
                AI Insight:
              </p>
              <p className="text-sm text-teal-700 mt-1">{matchInsight}</p>
            </div>
          )}
        </CardContent>

        {/* Footer with Action Buttons */}
        <CardFooter className="p-4 pt-0">
          <div className="flex space-x-2 w-full">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200"
              onClick={handleReject}
              disabled={isAccepted}
            >
              <X className="h-3 w-3 mr-1" />
              Reject
            </Button>
            
            <Button 
              className={`flex-1 transition-all duration-200 ${
                isAccepted 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-teal-500 hover:bg-teal-600'
              } text-white`}
              size="sm"
              onClick={handleAccept}
            >
              <Check className="h-3 w-3 mr-1" />
              {isAccepted ? 'Accepted' : 'Accept'}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
              onClick={handleMoreInfo}
            >
              <Info className="h-3 w-3 mr-1" />
              Details
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

// PropertyCarousel Component
interface PropertyCarouselProps {
  properties: Property[];
  title: string;
  onPropertyUpdate?: (properties: Property[]) => void;
}

const PropertyCarousel: React.FC<PropertyCarouselProps> = ({ 
  properties: initialProperties, 
  title, 
  onPropertyUpdate 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Update properties when prop changes
  useEffect(() => {
    setProperties(initialProperties);
  }, [initialProperties]);

  // Action handlers
  const handleAccept = (propertyId: string) => {
    console.log('Property accepted:', propertyId);
    // Update property status if needed
    const updatedProperties = properties.map(prop => 
      prop.id === propertyId ? { ...prop, status: 'accepted' } : prop
    );
    setProperties(updatedProperties);
    onPropertyUpdate?.(updatedProperties);
  };

  const handleReject = (propertyId: string) => {
    console.log('Property rejected:', propertyId);
    // Property will be removed by the card component
  };

  const handleRemove = (propertyId: string) => {
    const updatedProperties = properties.filter(prop => prop.id !== propertyId);
    setProperties(updatedProperties);
    onPropertyUpdate?.(updatedProperties);
    // Recheck scroll buttons after removal
    setTimeout(checkScrollButtons, 100);
  };

  const handleMoreInfo = (propertyId: string) => {
    console.log('More info requested for:', propertyId);
    // Modal is handled by the PropertyCard component
  };

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [properties]);

  // Don't render if no properties
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🏠</div>
        <p className="text-gray-500">No properties to display</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="text-sm text-gray-500">
          {properties.length} propert{properties.length === 1 ? 'y' : 'ies'}
        </div>
      </div>
     
      <div className="relative group">
        {/* Left Arrow */}
        {properties.length > 1 && (
          <Button
            variant="outline"
            size="icon"
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border-gray-300 transition-all duration-200 ${
              canScrollLeft ? 'opacity-100 hover:bg-gray-50' : 'opacity-0 pointer-events-none'
            }`}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Right Arrow */}
        {properties.length > 1 && (
          <Button
            variant="outline"
            size="icon"
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border-gray-300 transition-all duration-200 ${
              canScrollRight ? 'opacity-100 hover:bg-gray-50' : 'opacity-0 pointer-events-none'
            }`}
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' }
          }}
          onScroll={checkScrollButtons}
        >
          {properties.map((property) => (
            <PropertyCard 
              key={property.id} 
              {...property} 
              onAccept={handleAccept}
              onReject={handleReject}
              onMoreInfo={handleMoreInfo}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Demo Component
const PropertyCarouselDemo = () => {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      title: 'Modern Downtown Apartment with City Views',
      price: '₹75,00,000',
      location: 'Bhopal, Madhya Pradesh',
      beds: 3,
      baths: 2,
      sqft: '1,200 sq ft',
      image: 'https://images.unsplash.com/photo-1560448204-e1a5b74e2b83?w=400&h=300&auto=format&fit=crop',
      matchScore: 95,
      matchInsight: 'Perfect match for your budget and location preferences',
      isVerified: true
    },
    {
      id: '2',
      title: 'Spacious Family Home with Garden',
      price: '₹1,20,00,000',
      location: 'Indore, Madhya Pradesh',
      beds: 4,
      baths: 3,
      sqft: '2,500 sq ft',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&auto=format&fit=crop',
      matchScore: 88,
      matchInsight: 'Great for families with excellent school districts nearby',
      isVerified: true
    },
    {
      id: '3',
      title: 'Luxury Villa with Pool',
      price: '₹2,50,00,000',
      location: 'Jabalpur, Madhya Pradesh',
      beds: 5,
      baths: 4,
      sqft: '3,800 sq ft',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&auto=format&fit=crop',
      matchScore: 75,
      matchInsight: 'Premium location with luxury amenities',
      isVerified: false
    },
    {
      id: '4',
      title: 'Cozy Studio Apartment',
      price: '₹35,00,000',
      location: 'Gwalior, Madhya Pradesh',
      beds: 1,
      baths: 1,
      sqft: '650 sq ft',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&auto=format&fit=crop',
      matchScore: 82,
      matchInsight: 'Perfect starter home in a growing neighborhood',
      isVerified: true
    },
    {
      id: '5',
      title: 'Traditional Bungalow',
      price: '₹95,00,000',
      location: 'Ujjain, Madhya Pradesh',
      beds: 3,
      baths: 2,
      sqft: '1,800 sq ft',
      image: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=400&h=300&auto=format&fit=crop',
      matchScore: 90,
      matchInsight: 'Classic architecture with modern updates',
      isVerified: true
    }
  ]);

  const handlePropertyUpdate = (updatedProperties: Property[]) => {
    setProperties(updatedProperties);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <PropertyCarousel 
          properties={properties}
          title="Recommended Properties"
          onPropertyUpdate={handlePropertyUpdate}
        />
      </div>
    </div>
  );
};

export default PropertyCarouselDemo;