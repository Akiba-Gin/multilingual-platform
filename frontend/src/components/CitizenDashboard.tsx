import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  MapPin, 
  Trash2, 
  Navigation,
  Clock,
  Calendar,
  Recycle,
  Leaf,
  AlertTriangle,
  CheckCircle,
  Star,
  User,
  Settings,
  ArrowLeft,
  Search,
  Target,
  Route
} from "lucide-react";

interface CitizenDashboardProps {
  onBack: () => void;
}

export function CitizenDashboard({ onBack }: CitizenDashboardProps) {
  const [userLocation, setUserLocation] = useState('');
  const [selectedWasteType, setSelectedWasteType] = useState('general');

  const nearbyBins = [
    {
      id: 'BIN-A1',
      type: 'General Waste',
      distance: '0.3 km',
      walkTime: '4 mins',
      address: 'Main Street & Oak Ave',
      capacity: 25,
      available: true,
      rating: 4.5
    },
    {
      id: 'BIN-A2', 
      type: 'Recycling',
      distance: '0.5 km',
      walkTime: '6 mins',
      address: 'Pine Street Park',
      capacity: 15,
      available: true,
      rating: 4.8
    },
    {
      id: 'BIN-A3',
      type: 'Organic',
      distance: '0.7 km',
      walkTime: '9 mins', 
      address: 'Community Center',
      capacity: 35,
      available: true,
      rating: 4.2
    }
  ];

  const collectionSchedule = [
    { day: 'Monday', type: 'General Waste', time: '7:00 AM', status: 'upcoming' },
    { day: 'Wednesday', type: 'Recycling', time: '8:00 AM', status: 'upcoming' },
    { day: 'Friday', type: 'Organic', time: '7:30 AM', status: 'upcoming' },
    { day: 'Saturday', type: 'Hazardous', time: '9:00 AM', status: 'monthly' }
  ];

  const wasteTypes = [
    { value: 'general', label: 'General Waste', icon: Trash2, color: 'bg-gray-500' },
    { value: 'recycling', label: 'Recycling', icon: Recycle, color: 'bg-blue-500' },
    { value: 'organic', label: 'Organic Waste', icon: Leaf, color: 'bg-green-500' },
    { value: 'hazardous', label: 'Hazardous Materials', icon: AlertTriangle, color: 'bg-red-500' }
  ];

  const tips = [
    {
      category: 'Recycling',
      tip: 'Rinse containers before recycling to avoid contamination',
      icon: Recycle
    },
    {
      category: 'Organic',
      tip: 'Compost food scraps to reduce methane emissions',
      icon: Leaf
    },
    {
      category: 'General',
      tip: 'Reduce waste by choosing reusable items when possible',
      icon: Trash2
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Trash2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">SmartWaste</h1>
              <p className="text-sm text-muted-foreground">Citizen Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Find Waste Disposal Locations</h2>
          <p className="text-muted-foreground">Locate nearby bins, check schedules, and learn about proper waste disposal</p>
        </div>

        <Tabs defaultValue="find-bins" className="space-y-6">
          <TabsList>
            <TabsTrigger value="find-bins">Find Bins</TabsTrigger>
            <TabsTrigger value="schedule">Collection Schedule</TabsTrigger>
            <TabsTrigger value="guidelines">Waste Guidelines</TabsTrigger>
          </TabsList>

          <TabsContent value="find-bins" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Search Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
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
                            <div className="flex items-center gap-2">
                              <type.icon className="h-4 w-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Search Bins
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Nearby Bins ({nearbyBins.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {nearbyBins.map((bin) => (
                      <div key={bin.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary">{bin.type}</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm">{bin.rating}</span>
                            </div>
                          </div>
                          <span className="font-medium">{bin.distance}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{bin.address}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{bin.walkTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Trash2 className="h-4 w-4" />
                              <span>{bin.capacity}% capacity</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button className="w-full">
                          <Route className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Collection Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {collectionSchedule.map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div>
                          <div className="font-medium">{schedule.day}</div>
                          <div className="text-sm text-muted-foreground">{schedule.type}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{schedule.time}</div>
                        <Badge variant={schedule.status === 'upcoming' ? 'default' : 'secondary'} className="text-xs">
                          {schedule.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guidelines" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wasteTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Card key={type.value}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon className={`h-5 w-5 text-white p-1 rounded ${type.color}`} />
                        {type.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        {type.value === 'recycling' && (
                          <>
                            <div>• Clean containers before disposal</div>
                            <div>• Remove caps and labels when possible</div>
                            <div>• No glass or hazardous materials</div>
                          </>
                        )}
                        {type.value === 'organic' && (
                          <>
                            <div>• Food scraps and yard waste</div>
                            <div>• No meat, dairy, or oily foods</div>
                            <div>• Use compostable bags only</div>
                          </>
                        )}
                        {type.value === 'general' && (
                          <>
                            <div>• Non-recyclable household waste</div>
                            <div>• Bag securely to prevent spillage</div>
                            <div>• No hazardous materials</div>
                          </>
                        )}
                        {type.value === 'hazardous' && (
                          <>
                            <div>• Batteries, electronics, chemicals</div>
                            <div>• Special collection points only</div>
                            <div>• Never mix with regular waste</div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Helpful Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tips.map((tip, index) => {
                    const Icon = tip.icon;
                    return (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <Icon className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">{tip.category}</div>
                          <div className="text-sm text-muted-foreground">{tip.tip}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}