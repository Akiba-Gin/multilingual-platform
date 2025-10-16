import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Truck, 
  MapPin, 
  Search,
  Filter,
  Plus,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Fuel,
  Wrench,
  User,
  Activity,
  Calendar,
  BarChart3
} from "lucide-react";

export function VehicleTracking() {
  const fleetStats = [
    { label: 'Active Vehicles', value: '12', total: '15', icon: Truck, color: 'text-green-600' },
    { label: 'In Maintenance', value: '2', total: '15', icon: Wrench, color: 'text-orange-600' },
    { label: 'On Route', value: '8', total: '12', icon: MapPin, color: 'text-blue-600' },
    { label: 'Fuel Alerts', value: '3', total: '12', icon: Fuel, color: 'text-red-600' }
  ];

  const vehicles = [
    {
      id: "T-001",
      model: "Freightliner M2",
      driver: "John Smith",
      status: "active",
      location: "Main Street & Oak Ave",
      route: "R001 - Downtown Route",
      fuelLevel: 75,
      mileage: "45,230",
      lastMaintenance: "2 weeks ago",
      nextMaintenance: "500 miles",
      efficiency: 8.2,
      alerts: 0
    },
    {
      id: "T-002", 
      model: "International DuraStar",
      driver: "Sarah Johnson",
      status: "maintenance",
      location: "Service Depot",
      route: "Not assigned",
      fuelLevel: 40,
      mileage: "52,100",
      lastMaintenance: "Today",
      nextMaintenance: "2,500 miles",
      efficiency: 7.8,
      alerts: 1
    },
    {
      id: "T-003",
      model: "Mack TerraPro",
      driver: "Mike Davis",
      status: "active",
      location: "Pine Street Sector",
      route: "R003 - Residential North",
      fuelLevel: 45,
      mileage: "38,950",
      lastMaintenance: "1 week ago",
      nextMaintenance: "1,200 miles",
      efficiency: 9.1,
      alerts: 2
    },
    {
      id: "T-004",
      model: "Peterbilt 220",
      driver: "Lisa Wilson",
      status: "idle",
      location: "Central Depot",
      route: "Not assigned",
      fuelLevel: 90,
      mileage: "29,800",
      lastMaintenance: "3 days ago",
      nextMaintenance: "3,000 miles",
      efficiency: 8.7,
      alerts: 0
    }
  ];

  const maintenanceAlerts = [
    { vehicle: "T-002", type: "Scheduled Maintenance", priority: "high", dueDate: "Today", description: "6-month service inspection" },
    { vehicle: "T-007", type: "Oil Change", priority: "medium", dueDate: "In 2 days", description: "Regular oil change due" },
    { vehicle: "T-003", type: "Tire Inspection", priority: "low", dueDate: "Next week", description: "Routine tire wear check" },
    { vehicle: "T-005", type: "Brake Service", priority: "high", dueDate: "Overdue", description: "Brake system maintenance" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'maintenance': return 'text-orange-600 bg-orange-50';
      case 'idle': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Vehicle Tracking</h2>
          <p className="text-muted-foreground">Monitor fleet status, performance, and maintenance schedules</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Reports
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </Button>
        </div>
      </div>

      {/* Fleet Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {fleetStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">of {stat.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="vehicles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="vehicles">Fleet Overview</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search vehicles..." className="pl-9" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="idle">Idle</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Route</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All routes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Routes</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </CardContent>
            </Card>

            {/* Vehicle List */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Fleet Status ({vehicles.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vehicles.map((vehicle) => (
                      <div key={vehicle.id} className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <h3 className="font-medium">{vehicle.id}</h3>
                            <Badge className={getStatusColor(vehicle.status)}>
                              {vehicle.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{vehicle.model}</span>
                            {vehicle.alerts > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {vehicle.alerts} Alert{vehicle.alerts > 1 ? 's' : ''}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">View Details</Button>
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>Driver: {vehicle.driver}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{vehicle.location}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Activity className="h-4 w-4 text-muted-foreground" />
                              <span>{vehicle.route}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>Mileage: {vehicle.mileage} mi</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="text-sm">
                              <div className="flex justify-between mb-1">
                                <span>Fuel Level</span>
                                <span className="font-medium">{vehicle.fuelLevel}%</span>
                              </div>
                              <Progress value={vehicle.fuelLevel} className="h-2" />
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Fuel className="h-4 w-4 text-muted-foreground" />
                              <span>Efficiency: {vehicle.efficiency} MPG</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Wrench className="h-4 w-4 text-muted-foreground" />
                              <span>Last: {vehicle.lastMaintenance}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Next: {vehicle.nextMaintenance}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Maintenance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Maintenance Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Due Today</span>
                    <Badge variant="destructive">2</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Due This Week</span>
                    <Badge variant="secondary">5</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Overdue</span>
                    <Badge variant="destructive">1</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Completed This Month</span>
                    <Badge variant="outline">12</Badge>
                  </div>
                </div>

                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Maintenance
                </Button>
              </CardContent>
            </Card>

            {/* Maintenance Alerts */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Maintenance Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {maintenanceAlerts.map((alert, index) => (
                      <div key={index} className="border rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{alert.vehicle}</span>
                            <Badge className={getPriorityColor(alert.priority)}>
                              {alert.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{alert.dueDate}</span>
                            <Button variant="outline" size="sm">
                              Schedule
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-sm">{alert.type}</p>
                          <p className="text-sm text-muted-foreground">{alert.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fleet Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Performance analytics charts would be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fuel Efficiency Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  <Fuel className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Fuel efficiency trends would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}