import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { MainDashboard } from "./components/MainDashboard";
import { TranslationInterface } from "./components/TranslationInterface";
import { GoogleTranslatePage } from "./components/GoogleTranslatePage";
import { LegalRights } from "./components/LegalRights";
import { LanguageSelector } from "./components/LanguageSelector";
import { Header } from "./components/Header";
import { Button } from "./components/ui/button";

type AppState = 'landing' | 'login' | 'dashboard' | 'translate-page';
type ActiveSection = 'translate' | 'help' | 'profile';

interface UserProfile {
  email: string;
  preferredLanguage: string;
  isLoggedIn: boolean;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [activeSection, setActiveSection] = useState<ActiveSection>('translate');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleEnterPlatform = () => {
    setAppState('login');
  };

  const handleSkipLogin = () => {
    setAppState('dashboard');
  };

  const handleLogin = (credentials: { email: string; password: string; preferredLanguage: string }) => {
    setUserProfile({
      email: credentials.email,
      preferredLanguage: credentials.preferredLanguage,
      isLoggedIn: true
    });
    setSelectedLanguage(credentials.preferredLanguage);
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setUserProfile(null);
    setSelectedLanguage('en');
    setAppState('landing');
    setActiveSection('translate');
  };

  const handleBackToLanding = () => {
    setAppState('landing');
    setActiveSection('translate');
  };

  const handleBackToLogin = () => {
    setAppState('login');
  };

  const handleGoToTranslatePage = () => {
    setAppState('translate-page');
  };

  const handleBackToDashboard = () => {
    setAppState('dashboard');
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'translate':
        return <TranslationInterface selectedLanguage={selectedLanguage} onGoToTranslatePage={handleGoToTranslatePage} />;
      case 'help':
        return <LegalRights selectedLanguage={selectedLanguage} />;
      case 'profile':
        return (
          <div className="p-6 max-w-2xl">
            <h2 className="mb-6">Profile Settings</h2>
            
            {userProfile ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-lg border border-cyan-200">
                  <h3 className="font-medium mb-3">Account Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Email:</strong> {userProfile.email}</div>
                    <div><strong>Member since:</strong> {new Date().toLocaleDateString()}</div>
                    <div><strong>Account type:</strong> Free Account</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Language Preferences</h3>
                  <LanguageSelector 
                    selectedLanguage={selectedLanguage}
                    onLanguageChange={setSelectedLanguage}
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    onClick={handleLogout}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-800 mb-2">Guest Mode</h3>
                  <p className="text-sm text-yellow-700 mb-3">
                    You're using the platform as a guest. Create an account to save your progress and access additional features.
                  </p>
                  <Button 
                    onClick={handleBackToLogin}
                    className="bg-yellow-600 hover:bg-yellow-700"
                  >
                    Create Account
                  </Button>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Language Preferences</h3>
                  <LanguageSelector 
                    selectedLanguage={selectedLanguage}
                    onLanguageChange={setSelectedLanguage}
                  />
                </div>
              </div>
            )}
          </div>
        );
      default:
        return <TranslationInterface selectedLanguage={selectedLanguage} onGoToTranslatePage={handleGoToTranslatePage} />;
    }
  };

  if (appState === 'landing') {
    return <LandingPage onEnterPlatform={handleEnterPlatform} />;
  }

  if (appState === 'login') {
    return (
      <LoginPage 
        onLogin={handleLogin}
        onBack={handleBackToLanding}
        onSkip={handleSkipLogin}
      />
    );
  }

  if (appState === 'translate-page') {
    return (
      <GoogleTranslatePage 
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header 
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        onBackToLanding={handleBackToLanding}
        userProfile={userProfile}
      />
      <div className="flex flex-1 overflow-hidden">
        <MainDashboard 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          selectedLanguage={selectedLanguage}
        />
        <main className="flex-1 overflow-auto">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}