import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Languages, Check } from "lucide-react";

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', region: 'Global' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', region: 'Spain, Latin America' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', region: 'France, Canada' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', region: 'Germany, Austria' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', region: 'Italy' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', region: 'Portugal, Brazil' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', region: 'Russia, Eastern Europe' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', region: 'Japan' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', region: 'South Korea' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', region: 'China, Taiwan' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', region: 'Middle East, North Africa' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'India' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', region: 'Thailand' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', region: 'Vietnam' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', region: 'Turkey' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', region: 'Poland' }
];

const popularLanguages = ['en', 'es', 'fr', 'de', 'it', 'zh', 'ja'];

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  const popular = languages.filter(lang => popularLanguages.includes(lang.code));
  const others = languages.filter(lang => !popularLanguages.includes(lang.code));

  const LanguageCard = ({ language, isSelected }: { language: typeof languages[0], isSelected: boolean }) => (
    <Button
      variant={isSelected ? "default" : "outline"}
      className={`h-auto p-4 justify-start text-left w-full ${
        isSelected ? "bg-blue-600 text-white hover:bg-blue-700" : ""
      }`}
      onClick={() => onLanguageChange(language.code)}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{language.flag}</span>
          <div>
            <div className="font-medium">{language.name}</div>
            <div className={`text-sm ${isSelected ? "text-blue-100" : "text-gray-500"}`}>
              {language.nativeName}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge 
            variant={isSelected ? "secondary" : "outline"} 
            className={`text-xs ${isSelected ? "bg-blue-100 text-blue-800" : ""}`}
          >
            {language.region}
          </Badge>
          {isSelected && <Check className="h-4 w-4" />}
        </div>
      </div>
    </Button>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Languages className="h-5 w-5" />
            <span>Language Preferences</span>
          </CardTitle>
          <CardDescription>
            Select your preferred language for translations and content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-3">Popular Languages</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {popular.map((language) => (
                  <LanguageCard
                    key={language.code}
                    language={language}
                    isSelected={selectedLanguage === language.code}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Other Languages</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {others.map((language) => (
                  <LanguageCard
                    key={language.code}
                    language={language}
                    isSelected={selectedLanguage === language.code}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Language Features</CardTitle>
          <CardDescription>
            What you can do with your selected language
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="font-medium text-blue-800 mb-1">Translation</div>
              <div className="text-sm text-blue-600">
                Translate to/from your language
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="font-medium text-green-800 mb-1">Legal Rights</div>
              <div className="text-sm text-green-600">
                Access rights info in your language
              </div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="font-medium text-purple-800 mb-1">Travel Tips</div>
              <div className="text-sm text-purple-600">
                Get localized travel suggestions
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}