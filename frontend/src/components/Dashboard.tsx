import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { 
  Truck, 
  Trash2, 
  Route, 
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  MapPin
} from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      title: "Active Vehicles",
      value: "12",
      subtitle: "out of 15",
      icon: Truck,
      trend: "+2%",
      color: "text-blue-600"
    },
    {
      title: "Bins Collected Today",
      value: "247",
      subtitle: "target: 280",
      icon: Trash2,
      trend: "+12%",
      color: "text-green-600"
    },
    {
      title: "Routes Completed",
      value: "8",
      subtitle: "out of 12",
      icon: Route,
      trend: "+5%",
      color: "text-purple-600"
    },
    {
      title: "Avg Collection Time",
      value: "2.4h",
      subtitle: "per route",
      icon: Clock,
      trend: "-8%",
      color: "text-orange-600"
    }
  ];

  const recentAlerts = [
    { id: 1, type: "warning", message: "Bin #A247 is overflowing", location: "Main Street", time: "10 mins ago" },
    { id: 2, type: "info", message: "Route 5 completed successfully", location: "Downtown", time: "25 mins ago" },
    { id: 3, type: "error", message: "Vehicle T-04 maintenance required", location: "Depot", time: "1 hour ago" },
  ];

  const activeRoutes = [
    { id: "R001", driver: "John Smith", vehicle: "T-03", progress: 75, location: "Oak Avenue", eta: "14:30" },
    { id: "R002", driver: "Sarah Johnson", vehicle: "T-07", progress: 45, location: "Pine Street", eta: "15:15" },
    { id: "R003", driver: "Mike Davis", vehicle: "T-12", progress: 90, location: "Maple Road", eta: "14:45" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">Monitor your garbage collection operations in real-time</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                  <Badge variant="secondary" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.trend}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Routes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="h-5 w-5" />
              Active Routes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeRoutes.map((route) => (
              <div key={route.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{route.id}</span>
                    <Badge variant="outline">{route.vehicle}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{route.driver}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {route.location}
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="text-sm font-medium">ETA: {route.eta}</div>
                  <div className="w-20">
                    <Progress value={route.progress} className="h-2" />
                    <span className="text-xs text-muted-foreground">{route.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="mt-1">
                  {alert.type === 'error' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                  {alert.type === 'info' && <CheckCircle className="h-4 w-4 text-blue-500" />}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm">{alert.message}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{alert.location}</span>
                    <span>{alert.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}