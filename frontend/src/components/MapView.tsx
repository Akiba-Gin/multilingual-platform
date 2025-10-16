import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  MapPin, 
  Truck, 
  Trash2, 
  Route,
  ZoomIn,
  ZoomOut,
  Layers,
  Filter,
  Navigation,
  Target,
  Clock,
  ArrowRight,
  Users,
  Settings
} from "lucide-react";

export function MapView() {
  const [viewMode, setViewMode] = useState<'admin' | 'citizen'>('admin');
  const [userLocation, setUserLocation] = useState('');
  const [selectedWasteType, setSelectedWasteType] = useState('general');

  const mapLayers = [
    { id: 'routes', label: 'Routes', active: true, color: 'bg-blue-500' },
    { id: 'bins', label: 'Bins', active: true, color: 'bg-green-500' },
    { id: 'vehicles', label: 'Vehicles', active: viewMode === 'admin', color: 'bg-red-500' },
    { id: 'traffic', label: 'Traffic', active: false, color: 'bg-orange-500' },
  ];

  const legendItems = viewMode === 'admin' ? [
    { label: 'Active Route', color: 'bg-blue-500', count: 8 },
    { label: 'Completed Route', color: 'bg-gray-400', count: 4 },
    { label: 'Full Bins', color: 'bg-red-500', count: 12 },
    { label: 'Empty Bins', color: 'bg-green-500', count: 156 },
    { label: 'Active Vehicles', color: 'bg-orange-500', count: 12 },
  ] : [
    { label: 'Available Bins', color: 'bg-green-500', count: 156 },
    { label: 'Full Bins', color: 'bg-red-500', count: 12 },
    { label: 'Your Route', color: 'bg-blue-500', count: 1 },
    { label: 'Recycling', color: 'bg-purple-500', count: 45 },
    { label: 'Organic Waste', color: 'bg-yellow-500', count: 32 },
  ];

  const nearbyBins = [
    {
      id: 'BIN-A1',
      type: 'General Waste',
      distance: '0.3 km',
      walkTime: '4 mins',
      address: 'Main Street & Oak Ave',
      capacity: 25,
      available: true
    },
    {
      id: 'BIN-A2', 
      type: 'Recycling',
      distance: '0.5 km',
      walkTime: '6 mins',
      address: 'Pine Street Park',
      capacity: 15,
      available: true
    },
    {
      id: 'BIN-A3',
      type: 'Organic',
      distance: '0.7 km',
      walkTime: '9 mins', 
      address: 'Community Center',
      capacity: 35,
      available: true
    },
    {
      id: 'BIN-A4',
      type: 'General Waste',
      distance: '0.8 km',
      walkTime: '10 mins',
      address: 'Shopping Plaza',
      capacity: 5,
      available: false
    }
  ];

  const routeDirections = [
    { step: 1, instruction: "Head north on Main Street", distance: "0.2 km" },
    { step: 2, instruction: "Turn right onto Oak Avenue", distance: "0.1 km" },
    { step: 3, instruction: "Bin will be on your left", distance: "Arrival" }
  ];

  const wasteTypes = [
    { value: 'general', label: 'General Waste' },
    { value: 'recycling', label: 'Recycling' },
    { value: 'organic', label: 'Organic Waste' },
    { value: 'hazardous', label: 'Hazardous Materials' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Map View</h2>
          <p className="text-muted-foreground">
            {viewMode === 'admin' 
              ? "Real-time visualization of routes, bins, and vehicles"
              : "Find the nearest bins for waste disposal"
            }
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'admin' | 'citizen')}>
            <TabsList>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Admin View
              </TabsTrigger>
              <TabsTrigger value="citizen" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Citizen View
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Layers className="h-4 w-4 mr-2" />
            Layers
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Control Panel */}
        <div className="space-y-4">
          {viewMode === 'citizen' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Find Nearest Bins
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Location</label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter your address..."
                      value={userLocation}
                      onChange={(e) => setUserLocation(e.target.value)}
                      className="flex-1"
                    />
                    <Button size="sm" variant="outline">
                      <Navigation className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Waste Type</label>
                  <Select value={selectedWasteType} onValueChange={setSelectedWasteType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {wasteTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Nearest Bins
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Map Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Map Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Layers</p>
                {mapLayers.map((layer) => (
                  <div key={layer.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded ${layer.color}`}></div>
                      <span className="text-sm">{layer.label}</span>
                    </div>
                    <div className={`w-4 h-4 rounded border ${layer.active ? 'bg-primary' : 'bg-background'}`}></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {legendItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${item.color}`}></div>
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">{item.count}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Citizen View - Nearby Bins */}
          {viewMode === 'citizen' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Nearby Bins
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {nearbyBins.slice(0, 3).map((bin) => (
                  <div key={bin.id} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={bin.available ? "secondary" : "destructive"} className="text-xs">
                          {bin.type}
                        </Badge>
                        {!bin.available && <Badge variant="destructive" className="text-xs">Full</Badge>}
                      </div>
                      <span className="text-sm font-medium">{bin.distance}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm">{bin.address}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{bin.walkTime}</span>
                        </div>
                        <span>{bin.capacity}% capacity</span>
                      </div>
                    </div>
                    
                    {bin.available && (
                      <Button size="sm" className="w-full">
                        <Route className="h-4 w-4 mr-1" />
                        Get Directions
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Route Directions for Citizens */}
          {viewMode === 'citizen' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  Directions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {routeDirections.map((direction) => (
                  <div key={direction.step} className="flex items-start gap-3 p-2 border rounded">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">
                      {direction.step}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{direction.instruction}</p>
                      <p className="text-xs text-muted-foreground">{direction.distance}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Map Display Area */}
        <div className="lg:col-span-3">
          <Card className="h-[600px]">
            <CardContent className="p-4 h-full">
              <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Mock Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50"></div>
                
                {/* Mock Streets */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-300"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300"></div>
                  <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-300"></div>
                  <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-300"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300"></div>
                  <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-300"></div>
                </div>

                {/* Route Lines */}
                <svg className="absolute inset-0 w-full h-full">
                  {viewMode === 'admin' && (
                    <>
                      <path d="M50 100 Q200 50 350 150 Q500 250 650 200" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="5,5" />
                      <path d="M100 300 Q250 200 400 350 Q550 400 700 300" stroke="#10b981" strokeWidth="3" fill="none" />
                    </>
                  )}
                  {viewMode === 'citizen' && (
                    <path d="M150 200 Q250 150 350 180 Q450 220 550 180" stroke="#2563eb" strokeWidth="4" fill="none" />
                  )}
                </svg>

                {/* User Location (Citizen View) */}
                {viewMode === 'citizen' && (
                  <div className="absolute top-1/3 left-1/6 bg-blue-600 rounded-full p-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}

                {/* Vehicles (Admin View Only) */}
                {viewMode === 'admin' && (
                  <>
                    <div className="absolute top-1/3 left-1/4 bg-orange-500 rounded p-1">
                      <Truck className="h-4 w-4 text-white" />
                    </div>
                    <div className="absolute top-2/3 right-1/3 bg-orange-500 rounded p-1">
                      <Truck className="h-4 w-4 text-white" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 bg-orange-500 rounded p-1">
                      <Truck className="h-4 w-4 text-white" />
                    </div>
                  </>
                )}

                {/* Bins */}
                <div className="absolute top-1/4 left-1/3 bg-green-500 rounded p-1">
                  <Trash2 className="h-3 w-3 text-white" />
                </div>
                <div className="absolute top-3/4 right-1/4 bg-red-500 rounded p-1">
                  <Trash2 className="h-3 w-3 text-white" />
                </div>
                <div className="absolute bottom-1/4 left-2/3 bg-green-500 rounded p-1">
                  <Trash2 className="h-3 w-3 text-white" />
                </div>
                <div className="absolute top-1/2 right-1/2 bg-red-500 rounded p-1">
                  <Trash2 className="h-3 w-3 text-white" />
                </div>

                {/* Route Markers (Admin View) */}
                {viewMode === 'admin' && (
                  <>
                    <div className="absolute top-1/6 left-1/5 bg-blue-500 rounded-full p-1">
                      <Route className="h-3 w-3 text-white" />
                    </div>
                    <div className="absolute bottom-1/6 right-1/5 bg-blue-500 rounded-full p-1">
                      <Route className="h-3 w-3 text-white" />
                    </div>
                  </>
                )}

                <div className="text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Interactive Map View</p>
                  <p className="text-sm">
                    {viewMode === 'admin' 
                      ? "Showing routes, vehicles, and bin locations"
                      : "Find your nearest waste disposal bins"
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}