
import React, { useState } from 'react';
import Header from '@/components/Layout/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Bed, Bath, Square, TrendingUp, DollarSign, Users, Clock } from 'lucide-react';

const SellProperties = () => {
  const [activeTab, setActiveTab] = useState('rental');

  const rentalProperties = [
    {
      id: 1,
      title: "Premium 2BHK in IT Corridor",
      location: "Electronic City, Bangalore",
      rentPrice: "₹35,000/month",
      deposit: "₹1,05,000",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      beds: 2,
      baths: 2,
      area: "1,100 sq ft",
      tenantType: "Working Professional",
      availability: "Immediately",
      roi: "8.2%"
    },
    {
      id: 2,
      title: "Furnished 1BHK Near Metro",
      location: "Koramangala, Bangalore",
      rentPrice: "₹28,000/month",
      deposit: "₹84,000",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      beds: 1,
      baths: 1,
      area: "650 sq ft",
      tenantType: "Young Professional",
      availability: "Next Week",
      roi: "9.1%"
    },
    {
      id: 3,
      title: "Spacious 3BHK Family Home",
      location: "Powai, Mumbai",
      rentPrice: "₹65,000/month",
      deposit: "₹1,95,000",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
      beds: 3,
      baths: 2,
      area: "1,650 sq ft",
      tenantType: "Family",
      availability: "15 Days",
      roi: "7.8%"
    },
    {
      id: 4,
      title: "Modern Studio in Tech Park",
      location: "Gachibowli, Hyderabad",
      rentPrice: "₹22,000/month",
      deposit: "₹66,000",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
      beds: 1,
      baths: 1,
      area: "550 sq ft",
      tenantType: "IT Professional",
      availability: "Immediately",
      roi: "10.5%"
    },
    {
      id: 5,
      title: "Luxury 3BHK with Amenities",
      location: "Salt Lake, Kolkata",
      rentPrice: "₹45,000/month",
      deposit: "₹1,35,000",
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",
      beds: 3,
      baths: 3,
      area: "1,800 sq ft",
      tenantType: "Executive",
      availability: "Next Month",
      roi: "8.7%"
    },
    {
      id: 6,
      title: "Cozy 2BHK Near Metro Station",
      location: "Sector 18, Noida",
      rentPrice: "₹32,000/month",
      deposit: "₹96,000",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop",
      beds: 2,
      baths: 2,
      area: "950 sq ft",
      tenantType: "Couple",
      availability: "1 Week",
      roi: "9.3%"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-blue-600 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Maximize Your Property Returns
          </h1>
          <p className="text-xl text-teal-100 mb-8 max-w-3xl mx-auto">
            List your property for rent and earn consistent monthly income with guaranteed tenants
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              <span>High ROI</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span>Verified Tenants</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              <span>Market Best Rates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Properties Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">High-Yield Rental Properties</h2>
              <p className="text-gray-600 mt-2">Properties generating excellent rental returns across prime locations</p>
            </div>
            <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white">
              List Your Property
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rentalProperties.map((property) => (
              <Card key={property.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-500 text-white">
                      {property.roi} ROI
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-700">
                      Available {property.availability}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{property.title}</h3>
                  
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

                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Preferred Tenant:</span>
                      <span className="font-medium">{property.tenantType}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Available {property.availability}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-teal-600">{property.rentPrice}</div>
                      <div className="text-sm text-gray-500">Deposit: {property.deposit}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Est. Monthly ROI</div>
                      <div className="text-lg font-bold text-green-600">{property.roi}</div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white">
                    View Rental Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Benefits */}
      <section className="py-16 bg-teal-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Rent Out Your Property?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Steady Income</h4>
              <p className="text-gray-600 text-sm">Earn consistent monthly rental income</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">High Returns</h4>
              <p className="text-gray-600 text-sm">Up to 10% annual returns on investment</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Verified Tenants</h4>
              <p className="text-gray-600 text-sm">Background-checked, reliable tenants</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Quick Process</h4>
              <p className="text-gray-600 text-sm">List and rent out within 7 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Earning?</h3>
          <p className="text-xl text-teal-100 mb-8">
            Join thousands of property owners who are maximizing their rental income with Smart Broker
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              List My Property
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3 text-lg font-semibold">
              Calculate Returns
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellProperties;
