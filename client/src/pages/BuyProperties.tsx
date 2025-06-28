
import React, { useState } from 'react';
import Header from '@/components/Layout/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Bed, Bath, Square, Shield, Star, Heart, Share2 } from 'lucide-react';

const BuyProperties = () => {
  const [favorited, setFavorited] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorited(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const properties = [
    {
      id: 1,
      title: "Luxury 3BHK Villa in Whitefield",
      location: "Whitefield, Bangalore",
      price: "₹1,25,00,000",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
      beds: 3,
      baths: 3,
      area: "2,100 sq ft",
      rating: 4.8,
      verified: true,
      tag: "Premium"
    },
    {
      id: 2,
      title: "Modern 2BHK Apartment in Koramangala",
      location: "Koramangala, Bangalore",
      price: "₹85,00,000",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      beds: 2,
      baths: 2,
      area: "1,350 sq ft",
      rating: 4.6,
      verified: true,
      tag: "Hot Deal"
    },
    {
      id: 3,
      title: "Spacious 4BHK Penthouse in Bandra",
      location: "Bandra West, Mumbai",
      price: "₹3,50,00,000",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      beds: 4,
      baths: 4,
      area: "3,200 sq ft",
      rating: 4.9,
      verified: true,
      tag: "Luxury"
    },
    {
      id: 4,
      title: "Cozy 2BHK Home in Sector 62",
      location: "Sector 62, Gurgaon",
      price: "₹75,00,000",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
      beds: 2,
      baths: 2,
      area: "1,200 sq ft",
      rating: 4.4,
      verified: true,
      tag: "Value Buy"
    },
    {
      id: 5,
      title: "Executive 3BHK in Cyber City",
      location: "Cyber City, Hyderabad",
      price: "₹95,00,000",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      beds: 3,
      baths: 2,
      area: "1,800 sq ft",
      rating: 4.7,
      verified: true,
      tag: "Tech Hub"
    },
    {
      id: 6,
      title: "Heritage 3BHK Villa in Alipore",
      location: "Alipore, Kolkata",
      price: "₹1,15,00,000",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      beds: 3,
      baths: 3,
      area: "2,500 sq ft",
      rating: 4.5,
      verified: true,
      tag: "Heritage"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-teal-600 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Verified Properties for Sale
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Discover your dream home from our curated collection of verified properties across India's premium locations
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span>100% Verified</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              <span>Premium Locations</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Pan India</span>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
              <p className="text-gray-600 mt-2">Handpicked homes that match your lifestyle</p>
            </div>
            <Button variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50">
              View All Properties
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Card key={property.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${
                      property.tag === 'Premium' ? 'bg-purple-500' :
                      property.tag === 'Luxury' ? 'bg-yellow-500' :
                      property.tag === 'Hot Deal' ? 'bg-red-500' :
                      'bg-blue-500'
                    } text-white`}>
                      {property.tag}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => toggleFavorite(property.id)}
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      <Heart className={`h-4 w-4 ${favorited.includes(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </button>
                    <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  {property.verified && (
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified by Smart Broker
                      </div>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{property.title}</h3>
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{property.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      <span>{property.area}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-teal-600">{property.price}</div>
                    <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Smart Broker?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">100% Verified</h4>
              <p className="text-gray-600 text-sm">Every property is thoroughly verified by our expert team</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Premium Quality</h4>
              <p className="text-gray-600 text-sm">Handpicked properties that meet our high standards</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Trusted Platform</h4>
              <p className="text-gray-600 text-sm">Over 10,000+ satisfied customers across India</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuyProperties;
