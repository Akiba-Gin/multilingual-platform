import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  Globe, 
  Languages,
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  CheckCircle2,
  User,
  Settings,
  Shield,
  Sparkles
} from "lucide-react";

interface LoginPageProps {
  onLogin: (credentials: { email: string; password: string; preferredLanguage: string }) => void;
  onBack: () => void;
  onSkip: () => void;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩', nativeName: 'বাংলা' },
  { code: 'ur', name: 'Urdu', flag: '🇵🇰', nativeName: 'اردو' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳', nativeName: 'తెలుగు' }
];

export function LoginPage({ onLogin, onBack, onSkip }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [step, setStep] = useState<'language' | 'login'>('language');

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setStep('login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin({ email, password, preferredLanguage: selectedLanguage });
      setIsLoading(false);
    }, 1500);
  };

  const userBenefits = [
    "Save your translation history",
    "Personalized legal guidance",
    "Sync across all devices",
    "Faster access to services",
    "Custom language preferences"
  ];

  if (step === 'language') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mb-6 self-start"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>

            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <Globe className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  MultiLingual Assistant
                </span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Preferred Language
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select your primary language to personalize your experience. You can change this anytime in settings.
            </p>
          </div>

          {/* Language Selection Grid */}
          <Card className="bg-white/80 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center">
                <Languages className="h-5 w-5 mr-2 text-cyan-600" />
                Select Language / भाषा चुनें / Seleccionar idioma
              </CardTitle>
              <CardDescription className="text-center">
                Click on your preferred language to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {languages.map((language) => (
                  <Button
                    key={language.code}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 hover:border-cyan-300 hover:bg-cyan-50 transition-all duration-200"
                    onClick={() => handleLanguageSelect(language.code)}
                  >
                    <span className="text-2xl">{language.flag}</span>
                    <div className="text-center">
                      <div className="font-medium text-sm">{language.name}</div>
                      <div className="text-xs text-gray-500">{language.nativeName}</div>
                    </div>
                  </Button>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Button 
                  variant="ghost" 
                  onClick={onSkip}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Skip for now (Use English by default)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const selectedLang = languages.find(lang => lang.code === selectedLanguage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding & Benefits */}
        <div className="space-y-8">
          <div className="space-y-6">
            <Button 
              variant="ghost" 
              onClick={() => setStep('language')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Language Selection
            </Button>

            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-lg">
                <Globe className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">MultiLingual Assistant</h1>
                <p className="text-muted-foreground">Translation & Legal Help Platform</p>
              </div>
            </div>

            {/* Selected Language Display */}
            <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-cyan-200">
              <Languages className="h-5 w-5 text-cyan-600" />
              <div>
                <div className="font-medium">Selected Language</div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{selectedLang?.flag}</span>
                  <span className="text-sm text-gray-600">{selectedLang?.name} ({selectedLang?.nativeName})</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold">
                Create Your Account
                <br />
                <span className="text-cyan-600">Save Your Progress</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Sign up to save your translations, legal consultations, and access personalized features.
              </p>
            </div>
          </div>

          {/* User Benefits */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-cyan-600" />
              <span className="font-medium">Member Benefits</span>
            </div>
            
            <div className="space-y-2">
              {userBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-4">
            <div className="text-center">
              <CardTitle className="text-2xl">Create Account</CardTitle>
              <CardDescription className="mt-2">
                Join thousands of users worldwide
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Create Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="text-muted-foreground">
                  Free forever
                </div>
                <Button variant="link" className="p-0 h-auto text-sm">
                  Privacy Policy
                </Button>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <User className="h-4 w-4 mr-2" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            <Separator className="my-6" />

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Already have an account?
              </p>
              <Button variant="outline" className="w-full">
                Sign In Instead
              </Button>
            </div>

            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                onClick={onSkip}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Continue without account
              </Button>
            </div>

            {/* Demo Notice */}
            <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
              <div className="text-sm font-medium text-cyan-800 mb-2">Demo Version</div>
              <div className="text-xs text-cyan-600">
                This is a demonstration. Use any email and password to continue.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}