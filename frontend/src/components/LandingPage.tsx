import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Globe, Scale, MapPin, Languages, Shield, Compass } from "lucide-react";

interface LandingPageProps {
  onEnterPlatform: () => void;
}

export function LandingPage({ onEnterPlatform }: LandingPageProps) {
  const handleGetStarted = () => {
    onEnterPlatform();
  };

  const features = [
    {
      icon: <Languages className="h-8 w-8 text-cyan-600" />,
      title: "Instant Translation",
      description: "Translate text, voice, and images in real-time to your native language without complex AI systems."
    },
    {
      icon: <Scale className="h-8 w-8 text-green-600" />,
      title: "Legal Help System",
      description: "Get help with legal issues based on Indian Constitution. Describe your problem and get relevant laws and processes."
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Emergency Support",
      description: "Quick access to emergency phrases, contact numbers, and legal assistance information."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <Globe className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  MultiLingual Assistant
                </span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Language & Legal
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                Assistant
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Break language barriers with instant translation and get legal help based on Indian Constitution. 
              Simple, fast, and accurate assistance in your preferred language.
            </p>

            {/* Get Started Button */}
            <div className="max-w-md mx-auto mb-8">
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-8 py-3 text-lg"
              >
                Create Free Account
              </Button>
              <p className="text-sm text-gray-500 mt-3">
                Or continue as guest - no registration required
              </p>
            </div>

            <p className="text-sm text-gray-500">
              Start using our platform instantly - no registration required
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need for seamless travel
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides comprehensive language and legal support without complex AI systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-600">
              Simple, fast, and reliable assistance in three easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Access the Platform</h3>
              <p className="text-gray-600">Start using our services instantly - no registration required</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Choose Your Service</h3>
              <p className="text-gray-600">Select translation for language help or legal assistance for constitutional guidance</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Instant Help</h3>
              <p className="text-gray-600">Receive accurate translations or legal guidance with suggested processes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Globe className="h-6 w-6" />
            <span className="text-lg font-semibold">MultiLingual Assistant</span>
          </div>
          <p className="text-gray-400">
            Empowering travelers with language and legal support worldwide
          </p>
        </div>
      </footer>
    </div>
  );
}