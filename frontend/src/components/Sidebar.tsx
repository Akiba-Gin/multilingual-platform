import { 
  LayoutDashboard, 
  Map, 
  Route, 
  Trash2, 
  Truck, 
  BarChart3,
  Calendar,
  AlertTriangle
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'map', label: 'Map View', icon: Map },
  { id: 'routes', label: 'Route Planning', icon: Route },
  { id: 'bins', label: 'Bin Management', icon: Trash2 },
  { id: 'vehicles', label: 'Vehicle Tracking', icon: Truck },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="w-64 border-r bg-card h-full">
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3",
                activeSection === item.id && "bg-secondary"
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}