
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react';

interface PropertyCardProps {
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

const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  price,
  location,
  beds,
  baths,
  sqft,
  image,
  matchScore,
  matchInsight,
  isVerified = false
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 snap-start flex-shrink-0 w-80">
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
        
        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-2">
          {isVerified && (
            <Badge className="bg-teal-500 text-white">Verified Listing</Badge>
          )}
          {matchScore && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {matchScore}% Match
            </Badge>
          )}
        </div>
        
        {/* Heart icon */}
        <button 
          onClick={handleHeartClick}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
        >
          <Heart 
            className={`h-4 w-4 transition-colors ${
              isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'
            }`} 
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg text-gray-900">{price}</h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{title}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>

        <div className="flex items-center space-x-4 text-gray-600 text-sm mb-4">
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
            <span>{sqft} sqft</span>
          </div>
        </div>

        {matchInsight && (
          <div className="mb-4 p-3 bg-teal-50 rounded-lg border-l-4 border-teal-400">
            <p className="text-sm text-teal-800 font-medium">Match Insight:</p>
            <p className="text-sm text-teal-700">{matchInsight}</p>
          </div>
        )}

        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            Reject
          </Button>
          <Button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white" size="sm">
            Accept
          </Button>
          <Button variant="outline" size="sm">
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
