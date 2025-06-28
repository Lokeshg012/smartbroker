
import React from 'react';
import Header from '@/components/Layout/Header';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowLeft, TrendingUp, Building2, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Invest = () => {
  const navigate = useNavigate();

  const sponsorData = [
    {
      name: 'DLF',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop&auto=format',
      growth: [
        { period: '1M', value: 2.5 },
        { period: '6M', value: 12.8 },
        { period: '1Y', value: 28.4 },
        { period: '10Y', value: 245.6 }
      ],
      currentValue: '₹45,67,890'
    },
    {
      name: 'Godrej Properties',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&auto=format',
      growth: [
        { period: '1M', value: 3.2 },
        { period: '6M', value: 15.6 },
        { period: '1Y', value: 32.1 },
        { period: '10Y', value: 287.3 }
      ],
      currentValue: '₹38,92,150'
    },
    {
      name: 'Prestige Group',
      logo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&h=100&fit=crop&auto=format',
      growth: [
        { period: '1M', value: 1.8 },
        { period: '6M', value: 10.4 },
        { period: '1Y', value: 24.7 },
        { period: '10Y', value: 198.2 }
      ],
      currentValue: '₹52,34,670'
    },
    {
      name: 'Brigade Group',
      logo: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=100&h=100&fit=crop&auto=format',
      growth: [
        { period: '1M', value: 2.1 },
        { period: '6M', value: 11.9 },
        { period: '1Y', value: 26.8 },
        { period: '10Y', value: 215.4 }
      ],
      currentValue: '₹41,78,320'
    },
    {
      name: 'Sobha Limited',
      logo: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=100&h=100&fit=crop&auto=format',
      growth: [
        { period: '1M', value: 2.9 },
        { period: '6M', value: 14.2 },
        { period: '1Y', value: 30.5 },
        { period: '10Y', value: 267.1 }
      ],
      currentValue: '₹47,85,910'
    }
  ];

  const states = [
    { name: 'Maharashtra', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=300&h=200&fit=crop&auto=format', builders: 45 },
    { name: 'Gujarat', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=300&h=200&fit=crop&auto=format', builders: 32 },
    { name: 'Tamil Nadu', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop&auto=format', builders: 38 },
    { name: 'Karnataka', image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=300&h=200&fit=crop&auto=format', builders: 41 },
    { name: 'Telangana', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop&auto=format', builders: 28 },
    { name: 'West Bengal', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop&auto=format', builders: 25 }
  ];

  const chartConfig = {
    value: {
      label: "Growth %",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Button>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Investment Opportunities</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover premium investment opportunities with India's most trusted builders and developers
            </p>
          </div>
        </div>
      </section>

      {/* Our Sponsors Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Sponsors</h2>
            <p className="text-gray-600">Leading builders with proven track records of exceptional growth</p>
          </div>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {sponsorData.map((sponsor, index) => (
              <div key={sponsor.name} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img 
                      src={sponsor.logo} 
                      alt={`${sponsor.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{sponsor.name}</h3>
                    <p className="text-teal-600 font-medium">{sponsor.currentValue}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-700">Property Value Growth</span>
                  </div>
                  
                  <ChartContainer config={chartConfig} className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sponsor.growth}>
                        <XAxis dataKey="period" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" fill="hsl(var(--primary))" radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-center">
                  {sponsor.growth.map((item) => (
                    <div key={item.period} className="bg-gray-50 rounded-lg p-2">
                      <div className="text-xs text-gray-500">{item.period}</div>
                      <div className="text-sm font-semibold text-green-600">+{item.value}%</div>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full mt-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600">
                  Invest Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Builders Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">More Builders</h2>
            <p className="text-gray-600">Explore investment opportunities by state across India</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {states.map((state) => (
              <div 
                key={state.name} 
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                onClick={() => {
                  // Navigate to state-specific builders page
                  console.log(`Navigate to ${state.name} builders`);
                }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={state.image} 
                    alt={state.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold mb-1">{state.name}</h3>
                    <div className="flex items-center space-x-2 text-sm">
                      <Building2 className="h-4 w-4" />
                      <span>{state.builders} Builders</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">Premium Properties Available</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700">
                      Explore →
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Investing?</h2>
          <p className="text-gray-600 mb-8">Join thousands of investors who trust Smart Broker for their property investments</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold">
              Get Investment Guide
            </Button>
            <Button variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50 px-8 py-3">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Invest;
