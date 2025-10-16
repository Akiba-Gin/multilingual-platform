import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { 
  Trash2, 
  MapPin, 
  Search,
  Filter,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from "lucide-react";

export function BinManagement() {
  const bins = [
    {
      id: "BIN-001",
      location: "Main Street & 1st Ave",
      fillLevel: 85,
      status: "critical",
      lastCollection: "2 days ago",
      type: "General Waste",
      size: "Large"
    },
    {
      id: "BIN-002", 
      location: "Oak Avenue Park",
      fillLevel: 45,
      status: "normal",
      lastCollection: "1 day ago",
      type: "Recycling",
      size: "Medium"
    },
    {
      id: "BIN-003",
      location: "Downtown Plaza",
      fillLevel: 92,
      status: "critical",
      lastCollection: "3 days ago",
      type: "General Waste",
      size: "Large"
    },
    {
      id: "BIN-004",
      location: "Pine Street School",
      fillLevel: 20,
      status: "normal",
      lastCollection: "6 hours ago",
      type: "General Waste",
      size: "Medium"
    },
    {
      id: "BIN-005",
      location: "Maple Road Market",
      fillLevel: 67,
      status: "warning",
      lastCollection: "1 day ago",
      type: "Organic",
      size: "Large"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'normal': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getFillLevelColor = (level: number) => {
    if (level >= 80) return 'bg-red-500';
    if (level >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const stats = [
    { label: 'Total Bins', value: '247', icon: Trash2, color: 'text-blue-600' },
    { label: 'Critical Level', value: '12', icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Recently Collected', value: '89', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Overdue', value: '5', icon: Clock, color: 'text-orange-600' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Bin Management</h2>
          <p className="text-muted-foreground">Monitor and manage garbage bin status across the city</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Bin
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

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
                <Input placeholder="Search bins..." className="pl-9" />
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
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="general">General Waste</SelectItem>
                  <SelectItem value="recycling">Recycling</SelectItem>
                  <SelectItem value="organic">Organic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Fill Level</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="high">80-100%</SelectItem>
                  <SelectItem value="medium">40-79%</SelectItem>
                  <SelectItem value="low">0-39%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </CardContent>
        </Card>

        {/* Bins List */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Bin Status ({bins.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bins.map((bin) => (
                  <div key={bin.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{bin.id}</h3>
                        <Badge 
                          className={getStatusColor(bin.status)}
                        >
                          {bin.status}
                        </Badge>
                        <Badge variant="outline">{bin.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="outline" size="sm">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{bin.location}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Fill Level</span>
                          <span className="font-medium">{bin.fillLevel}%</span>
                        </div>
                        <Progress 
                          value={bin.fillLevel} 
                          className="h-2"
                        />
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Last collected: {bin.lastCollection}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                        <span>Size: {bin.size}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}