import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Search, Filter, Plus, Minus, Camera, Play, RefreshCcw, UserCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

type Property = {
  id: number;
  lat: number;
  lng: number;
  price: string;
  type: string;
  location: string;
  image: string;
  stories?: PropertyStory[];
};

type PropertyStory = {
  id: string;
  url: string; // video or image url
  type: 'image' | 'video';
  title?: string;
  uploadedBy: string;
  uploadedAt: string;
};

const fetchPropertiesNearby = async (lat: number, lng: number): Promise<Property[]> => {
  // Simulate API - replace with real API
  await new Promise(res => setTimeout(res, 800));
  return [
    {
      id: 1,
      lat: lat + 0.002,
      lng: lng + 0.002,
      price: "₹2.5 Cr",
      type: "3 BHK Apartment",
      location: "Marine Drive, Mumbai",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      stories: [
        {
          id: 'story1',
          url: "https://www.w3schools.com/html/mov_bbb.mp4",
          type: 'video',
          title: "Sunset View",
          uploadedBy: "Amit",
          uploadedAt: "2025-06-26T18:00:00Z"
        }
      ]
    },
    {
      id: 2,
      lat: lat - 0.004,
      lng: lng - 0.003,
      price: "₹1.8 Cr",
      type: "2 BHK Apartment",
      location: "Bandra West, Mumbai",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      stories: [
        {
          id: 'story2',
          url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
          type: 'image',
          title: "Living Room",
          uploadedBy: "Riya",
          uploadedAt: "2025-06-27T10:30:00Z"
        }
      ]
    },
    {
      id: 3,
      lat: lat + 0.005,
      lng: lng - 0.002,
      price: "₹3.2 Cr",
      type: "4 BHK Villa",
      location: "Powai, Mumbai",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];
};

const Map = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [zoom, setZoom] = useState(14);
  const [storyDialog, setStoryDialog] = useState<{ open: boolean; property: Property | null; storyIndex: number }>({ open: false, property: null, storyIndex: 0 });
  const [uploadDialog, setUploadDialog] = useState<{ open: boolean; property: Property | null }>({ open: false, property: null });
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Get live location
  useEffect(() => {
    if (navigator.geolocation) {
      const geoId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          setUserLocation({ lat: 19.0760, lng: 72.8777 }); // Default Mumbai
        },
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(geoId);
    } else {
      setUserLocation({ lat: 19.0760, lng: 72.8777 });
    }
  }, []);

  // Fetch properties nearby
  useEffect(() => {
    if (!userLocation) return;
    (async () => {
      const props = await fetchPropertiesNearby(userLocation.lat, userLocation.lng);
      setProperties(props);
    })();
  }, [userLocation]);

  // Simulate crazy animated background for "map"
  const getBgMapUrl = () =>
    `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${userLocation?.lng},${userLocation?.lat},${zoom},0,0/900x1200?access_token=pk.eyJ1IjoibWFwbG92ZXIiLCJhIjoiY2w4cW5qdmJpMDJ3dDN3bnZ0dnhmc2Z5dCJ9.6P9sZ2KfH6A9UwPwo6oaBw`;

  // Calculate position on "map" container (simulate)
  const getPinPosition = (lat: number, lng: number) => {
    if (!userLocation || !mapContainerRef.current) return { left: '50%', top: '50%' };
    // Fake: positions pins within container based on delta from user location
    const maxDelta = 0.01;
    const x = 50 + ((lng - userLocation.lng) / maxDelta) * 35;
    const y = 50 - ((lat - userLocation.lat) / maxDelta) * 35;
    return { left: `${x}%`, top: `${y}%` };
  };

  // Handle upload
  const handleUpload = async () => {
    if (!uploadedFile || !uploadDialog.property) return;
    setUploading(true);
    // Simulate file upload
    await new Promise(res => setTimeout(res, 1200));
    const url = URL.createObjectURL(uploadedFile);
    const newStory: PropertyStory = {
      id: Math.random().toString(36).slice(2),
      url,
      type: uploadedFile.type.startsWith('video') ? 'video' : 'image',
      uploadedBy: "You",
      uploadedAt: new Date().toISOString(),
      title: uploadedFile.name
    };
    setProperties(prev =>
      prev.map(p =>
        p.id === uploadDialog.property!.id
          ? { ...p, stories: [...(p.stories || []), newStory] }
          : p
      )
    );
    setUploading(false);
    setUploadDialog({ open: false, property: null });
    setUploadedFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-fuchsia-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 bg-white/90 shadow-xl border-b sticky top-0 z-20">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-all">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
          <div className="w-8 h-8 bg-gradient-to-tr from-fuchsia-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-fuchsia-200">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900 text-lg">Mumbai Map</h1>
            <p className="text-xs text-gray-500">Find properties near you</p>
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 shadow">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search address, area, landmark..."
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-64"
            />
          </div>
          <Button variant="outline" size="icon" className="shadow">
            <Filter className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="shadow">
            <UserCircle2 className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      {/* Map area */}
      <div className="relative h-[80vh]" ref={mapContainerRef}>
        {/* Map Image */}
        <img
          src={getBgMapUrl()}
          alt="map"
          className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-2xl"
          style={{ filter: 'brightness(0.98) saturate(1.2) blur(0.5px)' }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent via-blue-50/30 to-fuchsia-100/70"></div>

        {/* Property Pins */}
        {properties.map((property) => (
          <div
            key={property.id}
            className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto group"
            style={getPinPosition(property.lat, property.lng)}
            onMouseEnter={() => setSelectedProperty(property)}
            onMouseLeave={() => setSelectedProperty(null)}
          >
            <div className="relative group">
              <button
                className="w-10 h-10 bg-gradient-to-br from-fuchsia-500 to-rose-500 rounded-full border-4 border-white shadow-2xl animate-pulse hover:animate-none flex items-center justify-center"
                onClick={() => setSelectedProperty(property)}
                tabIndex={0}
                aria-label="Property Pin"
              >
                <MapPin className="w-5 h-5 text-white" />
                {property.stories?.length ? (
                  <div className="absolute -bottom-1 -right-1 bg-fuchsia-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center border-2 border-white animate-bounce shadow">
                    <Play className="w-3 h-3" />
                  </div>
                ) : (
                  <div className="absolute -bottom-1 -right-1 bg-gray-200 text-gray-500 rounded-full text-xs w-5 h-5 flex items-center justify-center border-2 border-white shadow">
                    <Camera className="w-3 h-3" />
                  </div>
                )}
              </button>
            </div>
          </div>
        ))}

        {/* User Location Pin */}
        {userLocation && (
          <div
            className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: '50%', top: '50%' }}
          >
            <div className="w-6 h-6 bg-blue-600 ring-2 ring-white rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <UserCircle2 className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -inset-2 bg-blue-500/20 rounded-full animate-ping"></div>
            <Badge className="absolute left-8 top-2 bg-blue-600 text-white px-2 py-0.5 rounded-xl">You</Badge>
          </div>
        )}

        {/* Property Hover Card */}
        {selectedProperty && (
          <div
            className="absolute z-30 transform -translate-x-1/2 pointer-events-auto"
            style={{
              ...getPinPosition(selectedProperty.lat, selectedProperty.lng),
              top: `calc(${getPinPosition(selectedProperty.lat, selectedProperty.lng).top} - 10%)`
            }}
            onMouseLeave={() => setSelectedProperty(null)}
          >
            <Card className="w-96 bg-white/95 backdrop-blur-2xl shadow-2xl border-0 rounded-2xl ring-2 ring-fuchsia-100">
              <CardContent className="p-0">
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.location}
                  className="w-full h-36 object-cover rounded-t-2xl"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl text-fuchsia-700">{selectedProperty.price}</h3>
                    <Badge variant="default" className="bg-fuchsia-100 text-fuchsia-700">{selectedProperty.type}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{selectedProperty.location}</p>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => setStoryDialog({ open: true, property: selectedProperty, storyIndex: 0 })}
                      disabled={!selectedProperty.stories?.length}
                    >
                      <Play className="w-4 h-4" /> {selectedProperty.stories?.length ? "View Story" : "No Story"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => setUploadDialog({ open: true, property: selectedProperty })}
                    >
                      <Camera className="w-4 h-4" /> Upload Story
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Zoom Controls */}
        <div className="absolute top-24 right-4 space-y-3 z-40 flex flex-col">
          <Button variant="outline" className="w-12 h-12 p-0 bg-white shadow border-2 border-fuchsia-100"
            onClick={() => setZoom(z => Math.min(z + 1, 20))}>
            <Plus className="w-6 h-6" />
          </Button>
          <Button variant="outline" className="w-12 h-12 p-0 bg-white shadow border-2 border-fuchsia-100"
            onClick={() => setZoom(z => Math.max(z - 1, 10))}>
            <Minus className="w-6 h-6" />
          </Button>
          <Button variant="outline" className="w-12 h-12 p-0 bg-white shadow border-2 border-fuchsia-100"
            onClick={() => userLocation && setZoom(16)}>
            <RefreshCcw className="w-5 h-5" />
          </Button>
        </div>

        {/* My Location Button */}
        <div className="absolute bottom-24 right-4 z-40">
          <Button
            className="bg-gradient-to-tr from-blue-600 to-fuchsia-500 hover:from-fuchsia-500 hover:to-blue-600 text-white px-6 py-2 rounded-full shadow-lg"
            size="lg"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                  setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  });
                });
              }
            }}
          >
            <MapPin className="w-5 h-5 mr-2" /> My Live Location
          </Button>
        </div>
      </div>

      {/* Dialog for Stories */}
      <Dialog open={storyDialog.open} onOpenChange={open => setStoryDialog(s => ({ ...s, open }))}>
        {storyDialog.property && (
          <DialogContent className="max-w-lg bg-gradient-to-tr from-fuchsia-50 to-blue-50 rounded-2xl shadow-2xl border-0">
            <DialogHeader>
              <DialogTitle>
                {storyDialog.property.location} Stories
                <Badge className="ml-3 bg-fuchsia-600/90">{storyDialog.property.stories?.length ?? 0}</Badge>
              </DialogTitle>
              <DialogClose asChild>
                <Button variant="ghost" className="absolute top-2 right-4">×</Button>
              </DialogClose>
            </DialogHeader>
            {storyDialog.property.stories?.length ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center shadow-lg">
                  {storyDialog.property.stories[storyDialog.storyIndex].type === 'video' ?
                    <video
                      src={storyDialog.property.stories[storyDialog.storyIndex].url}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    /> :
                    <img
                      src={storyDialog.property.stories[storyDialog.storyIndex].url}
                      alt="story"
                      className="w-full h-full object-cover"
                    />
                  }
                </div>
                <div className="flex justify-between w-full items-center px-2">
                  <div>
                    <span className="font-semibold">{storyDialog.property.stories[storyDialog.storyIndex].title ?? 'Property Story'}</span>
                    <span className="ml-2 text-xs text-gray-500">by {storyDialog.property.stories[storyDialog.storyIndex].uploadedBy}</span>
                  </div>
                  <span className="text-xs text-gray-500">{new Date(storyDialog.property.stories[storyDialog.storyIndex].uploadedAt).toLocaleString()}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={storyDialog.storyIndex === 0}
                    onClick={() => setStoryDialog(s => ({ ...s, storyIndex: s.storyIndex - 1 }))}
                  >&#8592;</Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={storyDialog.storyIndex === (storyDialog.property.stories.length - 1)}
                    onClick={() => setStoryDialog(s => ({ ...s, storyIndex: s.storyIndex + 1 }))}
                  >&#8594;</Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">No stories yet. Be the first to upload!</div>
            )}
          </DialogContent>
        )}
      </Dialog>

      {/* Dialog for Upload Story */}
      <Dialog open={uploadDialog.open} onOpenChange={open => setUploadDialog({ open, property: uploadDialog.property })}>
        {uploadDialog.property && (
          <DialogContent className="max-w-md bg-white/90 rounded-xl shadow-2xl border-0">
            <DialogHeader>
              <DialogTitle>
                Upload Story for {uploadDialog.property.location}
              </DialogTitle>
              <DialogClose asChild>
                <Button variant="ghost" className="absolute top-2 right-4">×</Button>
              </DialogClose>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4 py-4">
              <input
                type="file"
                accept="image/*,video/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-fuchsia-50 file:text-fuchsia-700 hover:file:bg-fuchsia-100"
                onChange={e => setUploadedFile(e.target.files?.[0] ?? null)}
              />
              {uploadedFile && (
                <div className="w-48 h-32 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                  {uploadedFile.type.startsWith('video') ?
                    <video src={URL.createObjectURL(uploadedFile)} className="w-full h-full object-cover" controls /> :
                    <img src={URL.createObjectURL(uploadedFile)} className="w-full h-full object-cover" alt="preview" />
                  }
                </div>
              )}
              <Button
                className="w-full bg-gradient-to-tr from-fuchsia-500 to-blue-500 text-white"
                onClick={handleUpload}
                disabled={uploading || !uploadedFile}
              >
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-gray-400 mt-10">
        Crafted for Mumbai <span className="mx-1">•</span> Live location, stories & AI property map <span className="mx-1">•</span> Next-gen UI 🚀
      </footer>
    </div>
  );
};

export default Map;