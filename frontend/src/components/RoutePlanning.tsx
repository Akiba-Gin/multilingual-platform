import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Route, 
  MapPin, 
  Clock,
  Fuel,
  Truck,
  Plus,
  Settings,
  Play,
  Save,
  RefreshCw
} from "lucide-react";

export function RoutePlanning() {
  const routes = [
    {
      id: "R001",
      name: "Downtown Route",
      status: "active",
      vehicle: "T-03",
      bins: 24,
      distance: "12.5 km",
      duration: "2h 15m",
      efficiency: 85
    },
    {
      id: "R002", 
      name: "Residential North",
      status: "planned",
      vehicle: "T-07",
      bins: 31,
      distance: "18.2 km", 
      duration: "2h 45m",
      efficiency: 92
    },
    {
      id: "R003",
      name: "Industrial Zone",
      status: "completed",
      vehicle: "T-12",
      bins: 18,
      distance: "9.8 km",
      duration: "1h 50m",
      efficiency: 78
    }
  ];

  const optimizationOptions = [
    { label: "Shortest Distance", value: "distance" },
    { label: "Fastest Time", value: "time" },
    { label: "Fuel Efficiency", value: "fuel" },
    { label: "Balanced", value: "balanced" }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Route Planning</h2>
          <p className="text-muted-foreground">Optimize collection routes for maximum efficiency</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Re-optimize
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Route
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Optimization Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Optimization Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Optimization Type</label>
              <Select defaultValue="balanced">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {optimizationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Vehicle Type</label>
              <Select defaultValue="standard">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Truck</SelectItem>
                  <SelectItem value="compact">Compact Truck</SelectItem>
                  <SelectItem value="large">Large Truck</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Max Route Duration</label>
              <Input placeholder="3 hours" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority Areas</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select areas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="downtown">Downtown</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full">
              <Play className="h-4 w-4 mr-2" />
              Generate Routes
            </Button>
          </CardContent>
        </Card>

        {/* Route List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="h-5 w-5" />
                Current Routes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {routes.map((route) => (
                <div key={route.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium">{route.name}</h3>
                      <Badge 
                        variant={
                          route.status === 'active' ? 'default' : 
                          route.status === 'completed' ? 'secondary' : 
                          'outline'
                        }
                      >
                        {route.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span>{route.vehicle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{route.bins} bins</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Route className="h-4 w-4 text-muted-foreground" />
                      <span>{route.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{route.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Efficiency: {route.efficiency}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      {route.status === 'planned' && (
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Start
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Route className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Routes</p>
                    <p className="text-xl font-bold">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Duration</p>
                    <p className="text-xl font-bold">2.4h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Fuel className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Efficiency</p>
                    <p className="text-xl font-bold">87%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}