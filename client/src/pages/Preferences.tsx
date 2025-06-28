
import React, { useState, useEffect } from 'react';
import Header from '@/components/Layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Trash2, Edit } from 'lucide-react';

interface UserPreferences {
  cities: string[];
  budgetRange: string;
  propertyTypes: string[];
  priceRange: [number, number];
  downPayment: number;
  preApprovedLoan: boolean;
  bedrooms: string;
  bathrooms: string;
  propertySize: [number, number];
  maxCommuteTime: number;
  proximityToTransport: boolean;
  parkingAvailable: boolean;
  petFriendly: boolean;
  gymFitness: boolean;
  balconyOutdoor: boolean;
  swimmingPool: boolean;
  urgentSearch: boolean;
  trustLevel: string;
  savedSearches: Array<{
    id: string;
    name: string;
    lastUpdated: string;
    description: string;
  }>;
}

const Preferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    cities: [],
    budgetRange: '',
    propertyTypes: [],
    priceRange: [300000, 1200000],
    downPayment: 20000,
    preApprovedLoan: false,
    bedrooms: '3 Bedrooms',
    bathrooms: '2 Bathrooms',
    propertySize: [1200, 2500],
    maxCommuteTime: 30,
    proximityToTransport: false,
    parkingAvailable: false,
    petFriendly: false,
    gymFitness: false,
    balconyOutdoor: false,
    swimmingPool: false,
    urgentSearch: false,
    trustLevel: 'High (Extensive Verification)',
    savedSearches: [
      {
        id: '1',
        name: 'Downtown Lofts',
        lastUpdated: '2 days ago',
        description: '2 Beds, $500K-$800K, Pet-friendly'
      },
      {
        id: '2',
        name: 'Family Home in Suburbs',
        lastUpdated: '1 week ago',
        description: '3+ Beds, $700K-$1.2M, Large Yard'
      },
      {
        id: '3',
        name: 'Investment Property',
        lastUpdated: '3 weeks ago',
        description: 'Multi-family, Low Trust, High ROI Potential'
      }
    ]
  });

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 
    'Chennai', 'Ahmedabad', 'Jaipur', 'Noida', 'Gurgaon'
  ];

  const propertyTypes = [
    '1 BHK', '2 BHK', '3 BHK', '4+ BHK', 'Villa', 'Plot'
  ];

  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      setPreferences(prev => ({ ...prev, ...JSON.parse(savedPreferences) }));
    }
  }, []);

  const handleCityToggle = (city: string) => {
    setPreferences(prev => ({
      ...prev,
      cities: prev.cities.includes(city)
        ? prev.cities.filter(c => c !== city)
        : [...prev.cities, city]
    }));
  };

  const handlePropertyTypeToggle = (type: string) => {
    setPreferences(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type]
    }));
  };

  const handleSwitchChange = (key: keyof UserPreferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const savePreferences = () => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    alert('Preferences saved successfully!');
  };

  const resetToDefaults = () => {
    setPreferences({
      cities: [],
      budgetRange: '',
      propertyTypes: [],
      priceRange: [300000, 1200000],
      downPayment: 20000,
      preApprovedLoan: false,
      bedrooms: '3 Bedrooms',
      bathrooms: '2 Bathrooms',
      propertySize: [1200, 2500],
      maxCommuteTime: 30,
      proximityToTransport: false,
      parkingAvailable: false,
      petFriendly: false,
      gymFitness: false,
      balconyOutdoor: false,
      swimmingPool: false,
      urgentSearch: false,
      trustLevel: 'High (Extensive Verification)',
      savedSearches: preferences.savedSearches
    });
  };

  const deleteSavedSearch = (id: string) => {
    setPreferences(prev => ({
      ...prev,
      savedSearches: prev.savedSearches.filter(search => search.id !== id)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Saved Filters & Preferences</h1>
          <p className="text-gray-600">Fine-tune your property search to find exactly what you're looking for.</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Budget & Financing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Budget & Financing</CardTitle>
              <p className="text-sm text-gray-600">Adjust your preferred price range and financing options.</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">Property Price Range</label>
                <Slider
                  value={preferences.priceRange}
                  onValueChange={(value) => setPreferences(prev => ({ ...prev, priceRange: value as [number, number] }))}
                  max={2000000}
                  min={100000}
                  step={50000}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>₹{preferences.priceRange[0].toLocaleString()}</span>
                  <span>₹{preferences.priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Estimated Down Payment</label>
                <input
                  type="number"
                  value={preferences.downPayment}
                  onChange={(e) => setPreferences(prev => ({ ...prev, downPayment: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Pre-approved for Loan</label>
                  <p className="text-xs text-gray-500">Include if you have a pre-approved home loan.</p>
                </div>
                <Switch
                  checked={preferences.preApprovedLoan}
                  onCheckedChange={(checked) => handleSwitchChange('preApprovedLoan', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Property Details</CardTitle>
              <p className="text-sm text-gray-600">Specify the type, size, and number of rooms you need.</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Property Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {propertyTypes.map(type => (
                    <Button
                      key={type}
                      variant={preferences.propertyTypes.includes(type) ? "default" : "outline"}
                      size="sm"
                      className={`text-xs ${preferences.propertyTypes.includes(type) ? 'bg-teal-500 hover:bg-teal-600' : ''}`}
                      onClick={() => handlePropertyTypeToggle(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Bedrooms</label>
                <Select value={preferences.bedrooms} onValueChange={(value) => setPreferences(prev => ({ ...prev, bedrooms: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 Bedroom">1 Bedroom</SelectItem>
                    <SelectItem value="2 Bedrooms">2 Bedrooms</SelectItem>
                    <SelectItem value="3 Bedrooms">3 Bedrooms</SelectItem>
                    <SelectItem value="4+ Bedrooms">4+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Bathrooms</label>
                <Select value={preferences.bathrooms} onValueChange={(value) => setPreferences(prev => ({ ...prev, bathrooms: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 Bathroom">1 Bathroom</SelectItem>
                    <SelectItem value="2 Bathrooms">2 Bathrooms</SelectItem>
                    <SelectItem value="3+ Bathrooms">3+ Bathrooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">Property Size (sq ft)</label>
                <Slider
                  value={preferences.propertySize}
                  onValueChange={(value) => setPreferences(prev => ({ ...prev, propertySize: value as [number, number] }))}
                  max={5000}
                  min={500}
                  step={100}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{preferences.propertySize[0]} sq ft</span>
                  <span>{preferences.propertySize[1]} sq ft</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location & Commute */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Location & Commute</CardTitle>
              <p className="text-sm text-gray-600">Choose preferred areas and desired commute options.</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Preferred Neighborhoods</label>
                <div className="grid grid-cols-2 gap-2">
                  {cities.slice(0, 6).map(city => (
                    <Button
                      key={city}
                      variant={preferences.cities.includes(city) ? "default" : "outline"}
                      size="sm"
                      className={`text-xs ${preferences.cities.includes(city) ? 'bg-teal-500 hover:bg-teal-600' : ''}`}
                      onClick={() => handleCityToggle(city)}
                    >
                      {city}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">Max Commute Time (minutes)</label>
                <Slider
                  value={[preferences.maxCommuteTime]}
                  onValueChange={(value) => setPreferences(prev => ({ ...prev, maxCommuteTime: value[0] }))}
                  max={90}
                  min={5}
                  step={5}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>5 min</span>
                  <span className="font-medium">{preferences.maxCommuteTime} min</span>
                  <span>90 min</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Proximity to Public Transport</label>
                  <p className="text-xs text-gray-500">Prioritize properties near public transport hubs.</p>
                </div>
                <Switch
                  checked={preferences.proximityToTransport}
                  onCheckedChange={(checked) => handleSwitchChange('proximityToTransport', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Lifestyle & Amenities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lifestyle & Amenities</CardTitle>
              <p className="text-sm text-gray-600">Select amenities crucial for your lifestyle.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'parkingAvailable', label: 'Parking Available', desc: 'Include properties with dedicated parking.' },
                { key: 'petFriendly', label: 'Pet Friendly', desc: 'Only show properties that allow pets.' },
                { key: 'gymFitness', label: 'Gym/Fitness Center', desc: 'Look for properties with on-site fitness facilities.' },
                { key: 'balconyOutdoor', label: 'Balcony/Outdoor Space', desc: 'Prioritize properties with private outdoor areas.' },
                { key: 'swimmingPool', label: 'Swimming Pool', desc: 'Include properties with access to a swimming pool.' }
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">{label}</label>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                  <Switch
                    checked={preferences[key as keyof UserPreferences] as boolean}
                    onCheckedChange={(checked) => handleSwitchChange(key as keyof UserPreferences, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Market & Trust Level */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Market & Trust Level</CardTitle>
              <p className="text-sm text-gray-600">Define search urgency and preferred listing trust level.</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Urgent Search</label>
                  <p className="text-xs text-gray-500">Prioritize properties with quick closing or high urgency.</p>
                </div>
                <Switch
                  checked={preferences.urgentSearch}
                  onCheckedChange={(checked) => handleSwitchChange('urgentSearch', checked)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Trust Level Preference</label>
                <Select value={preferences.trustLevel} onValueChange={(value) => setPreferences(prev => ({ ...prev, trustLevel: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High (Extensive Verification)">High (Extensive Verification)</SelectItem>
                    <SelectItem value="Medium (Standard Verification)">Medium (Standard Verification)</SelectItem>
                    <SelectItem value="Low (Basic Verification)">Low (Basic Verification)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  Trust levels are based on property verification, seller history, and transparency of details. 
                  Higher trust usually means more verified data points.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Your Saved Searches */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Saved Searches</CardTitle>
              <p className="text-sm text-gray-600">Quickly view and apply your previously saved filter sets.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {preferences.savedSearches.map((search) => (
                <div key={search.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{search.name}</h4>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        onClick={() => deleteSavedSearch(search.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{search.description}</p>
                  <p className="text-xs text-gray-500">Last Updated: {search.lastUpdated}</p>
                </div>
              ))}
              
              <Button variant="outline" className="w-full text-teal-600 border-teal-200 hover:bg-teal-50">
                Discover More Saved Searches
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline"
            onClick={resetToDefaults}
            className="px-8 py-3"
          >
            Reset to Defaults
          </Button>
          <Button 
            onClick={savePreferences}
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3"
          >
            Save Preferences
          </Button>
        </div>

        {/* Trust Score */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">4.9 Trust Score</p>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
