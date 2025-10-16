import { Button } from "./ui/button";
import { Languages, Scale, Compass, User } from "lucide-react";

interface MainDashboardProps {
  activeSection: string;
  onSectionChange: (section: 'translate' | 'help' | 'profile') => void;
  selectedLanguage: string;
}

const menuItems = [
  {
    id: 'translate',
    label: 'Translation',
    icon: Languages,
    description: 'Translate text, voice & images'
  },
  {
    id: 'help',
    label: 'Legal Help',
    icon: Scale,
    description: 'Indian Constitution & Legal Guidance'
  },
  {
    id: 'profile',
    label: 'Settings',
    icon: User,
    description: 'Language & preferences'
  }
];

export function MainDashboard({ activeSection, onSectionChange, selectedLanguage }: MainDashboardProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <h2 className="font-semibold text-gray-900 mb-6">Services</h2>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-auto p-4 ${
                  isActive 
                    ? "bg-cyan-600 text-white hover:bg-cyan-700" 
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => onSectionChange(item.id as any)}
              >
                <div className="flex items-start space-x-3">
                  <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className={`text-xs mt-1 ${
                      isActive ? "text-cyan-100" : "text-gray-500"
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </nav>

        <div className="mt-8 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-100">
          <h3 className="font-medium text-gray-900 mb-2">Quick Info</h3>
          <p className="text-sm text-gray-600 mb-3">
            Access instant translation or get legal help based on Indian Constitution.
          </p>
          <Button size="sm" variant="outline" className="w-full border-cyan-200 text-cyan-600 hover:bg-cyan-50">
            Emergency Contacts
          </Button>
        </div>
      </div>
    </aside>
  );
}