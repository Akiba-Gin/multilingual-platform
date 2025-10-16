import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Globe, ArrowLeft, User, Crown } from "lucide-react";

interface UserProfile {
  email: string;
  preferredLanguage: string;
  isLoggedIn: boolean;
}

interface HeaderProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  onBackToLanding: () => void;
  userProfile?: UserProfile | null;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
];

export function Header({ selectedLanguage, onLanguageChange, onBackToLanding, userProfile }: HeaderProps) {
  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToLanding}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-cyan-600" />
            <span className="font-semibold text-gray-900">MultiLingual Assistant</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* User Profile Display */}
          {userProfile ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full px-3 py-1 border border-cyan-200">
                <User className="h-4 w-4 text-cyan-600" />
                <span className="text-sm font-medium text-gray-700">
                  {userProfile.email.split('@')[0]}
                </span>
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                  <Crown className="h-3 w-3 mr-1" />
                  Member
                </Badge>
              </div>
            </div>
          ) : (
            <Badge variant="outline" className="text-gray-500 border-gray-300">
              Guest Mode
            </Badge>
          )}

          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-[180px] bg-white border-gray-200">
              <SelectValue>
                <div className="flex items-center space-x-2">
                  <span>{currentLanguage?.flag}</span>
                  <span>{currentLanguage?.name}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.code} value={language.code}>
                  <div className="flex items-center space-x-2">
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}