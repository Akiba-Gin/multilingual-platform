import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Plane, 
  Car, 
  Train, 
  Clock,
  Globe,
  Shield,
  Heart,
  Briefcase,
  Camera,
  Mountain,
  Utensils,
  Wifi,
  CreditCard,
  Phone,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Star,
  ThermometerSun,
  CloudRain
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DestinationSetupPageProps {
  destination: string;
  selectedLanguage: string;
  onComplete: (travelData: TravelData) => void;
  onBack: () => void;
}

interface TravelData {
  destination: string;
  travelDates: {
    checkIn: string;
    checkOut: string;
  };
  travelers: number;
  tripPurpose: string;
  transportMode: string;
  interests: string[];
  specialNeeds: string;
  emergencyContact: string;
}

const tripPurposes = [
  { id: 'tourism', label: 'Tourism & Sightseeing', icon: <Camera className="h-4 w-4" /> },
  { id: 'business', label: 'Business Travel', icon: <Briefcase className="h-4 w-4" /> },
  { id: 'study', label: 'Study/Education', icon: <Globe className="h-4 w-4" /> },
  { id: 'family', label: 'Family Visit', icon: <Heart className="h-4 w-4" /> },
  { id: 'medical', label: 'Medical Treatment', icon: <Shield className="h-4 w-4" /> }
];

const transportModes = [
  { id: 'plane', label: 'Flight', icon: <Plane className="h-4 w-4" /> },
  { id: 'car', label: 'Car/Road Trip', icon: <Car className="h-4 w-4" /> },
  { id: 'train', label: 'Train', icon: <Train className="h-4 w-4" /> },
  { id: 'mixed', label: 'Multiple Modes', icon: <MapPin className="h-4 w-4" /> }
];

const interestCategories = [
  { id: 'culture', label: 'Culture & History', icon: '🏛️' },
  { id: 'food', label: 'Food & Dining', icon: '🍽️' },
  { id: 'nature', label: 'Nature & Outdoors', icon: '🌲' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'nightlife', label: 'Nightlife', icon: '🌃' },
  { id: 'adventure', label: 'Adventure Sports', icon: '⛰️' },
  { id: 'art', label: 'Art & Museums', icon: '🎨' },
  { id: 'relaxation', label: 'Relaxation', icon: '🧘‍♀️' }
];

// Mock destination data
const getDestinationInfo = (destination: string) => {
  const destinations: Record<string, any> = {
    'paris': {
      country: 'France',
      language: 'French',
      currency: 'EUR (€)',
      timeZone: 'CET (UTC+1)',
      weather: 'Mild, 15-22°C',
      emergencyNumber: '112',
      tips: ['Tipping 10-15% at restaurants', 'Metro closes at 1:15 AM', 'Many museums closed on Mondays'],
      attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Arc de Triomphe']
    },
    'tokyo': {
      country: 'Japan',
      language: 'Japanese',
      currency: 'JPY (¥)',
      timeZone: 'JST (UTC+9)',
      weather: 'Temperate, 18-25°C',
      emergencyNumber: '110 (Police), 119 (Fire/Medical)',
      tips: ['Bow when greeting', 'No tipping culture', 'Take shoes off indoors'],
      attractions: ['Tokyo Tower', 'Senso-ji Temple', 'Shibuya Crossing', 'Imperial Palace']
    }
  };
  
  return destinations[destination.toLowerCase()] || {
    country: 'Unknown',
    language: 'Local Language',
    currency: 'Local Currency',
    timeZone: 'Local Time',
    weather: 'Check local forecast',
    emergencyNumber: '112 or local emergency',
    tips: ['Research local customs', 'Learn basic phrases', 'Check visa requirements'],
    attractions: ['Popular landmarks', 'Cultural sites', 'Local attractions']
  };
};

export function DestinationSetupPage({ destination, selectedLanguage, onComplete, onBack }: DestinationSetupPageProps) {
  const [step, setStep] = useState(1);
  const [travelData, setTravelData] = useState<TravelData>({
    destination,
    travelDates: { checkIn: '', checkOut: '' },
    travelers: 1,
    tripPurpose: '',
    transportMode: '',
    interests: [],
    specialNeeds: '',
    emergencyContact: ''
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;
  const destInfo = getDestinationInfo(destination);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(travelData);
    }
  };

  const handleInterestToggle = (interestId: string) => {
    setTravelData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return travelData.travelDates.checkIn && travelData.travelDates.checkOut && travelData.travelers > 0;
      case 2:
        return travelData.tripPurpose && travelData.transportMode;
      case 3:
        return travelData.interests.length > 0;
      case 4:
        return true; // Emergency contact is optional
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl mb-2">Travel Details</h2>
              <p className="text-muted-foreground">Let's plan your trip to {destination}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="h-5 w-5 text-cyan-600" />
                  <h3>Travel Dates</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2">Check-in Date</label>
                    <Input
                      type="date"
                      value={travelData.travelDates.checkIn}
                      onChange={(e) => setTravelData(prev => ({
                        ...prev,
                        travelDates: { ...prev.travelDates, checkIn: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Check-out Date</label>
                    <Input
                      type="date"
                      value={travelData.travelDates.checkOut}
                      onChange={(e) => setTravelData(prev => ({
                        ...prev,
                        travelDates: { ...prev.travelDates, checkOut: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="h-5 w-5 text-cyan-600" />
                  <h3>Travelers</h3>
                </div>
                <div>
                  <label className="block mb-2">Number of Travelers</label>
                  <Select
                    value={travelData.travelers.toString()}
                    onValueChange={(value) => setTravelData(prev => ({ ...prev, travelers: parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'Traveler' : 'Travelers'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </Card>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl mb-2">Trip Purpose & Transport</h2>
              <p className="text-muted-foreground">Help us customize your experience</p>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="mb-4">Purpose of Travel</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {tripPurposes.map((purpose) => (
                    <div
                      key={purpose.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        travelData.tripPurpose === purpose.id
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-gray-200 hover:border-cyan-300'
                      }`}
                      onClick={() => setTravelData(prev => ({ ...prev, tripPurpose: purpose.id }))}
                    >
                      <div className="flex items-center space-x-2">
                        {purpose.icon}
                        <span>{purpose.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4">Primary Transport Mode</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {transportModes.map((transport) => (
                    <div
                      key={transport.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        travelData.transportMode === transport.id
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-gray-200 hover:border-cyan-300'
                      }`}
                      onClick={() => setTravelData(prev => ({ ...prev, transportMode: transport.id }))}
                    >
                      <div className="flex items-center space-x-2">
                        {transport.icon}
                        <span>{transport.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl mb-2">Your Interests</h2>
              <p className="text-muted-foreground">Select what interests you most</p>
            </div>

            <Card className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {interestCategories.map((interest) => (
                  <div
                    key={interest.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all text-center ${
                      travelData.interests.includes(interest.id)
                        ? 'border-cyan-500 bg-cyan-50'
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                    onClick={() => handleInterestToggle(interest.id)}
                  >
                    <div className="text-2xl mb-2">{interest.icon}</div>
                    <div className="text-sm">{interest.label}</div>
                    {travelData.interests.includes(interest.id) && (
                      <CheckCircle className="h-4 w-4 text-cyan-600 mx-auto mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl mb-2">Final Details</h2>
              <p className="text-muted-foreground">Additional information for your safety</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="mb-4">Special Requirements</h3>
                <Textarea
                  placeholder="Any dietary restrictions, accessibility needs, medical conditions, or other special requirements..."
                  value={travelData.specialNeeds}
                  onChange={(e) => setTravelData(prev => ({ ...prev, specialNeeds: e.target.value }))}
                  className="min-h-[100px]"
                />
              </Card>

              <Card className="p-6">
                <h3 className="mb-4">Emergency Contact</h3>
                <Input
                  placeholder="Name and phone number of emergency contact"
                  value={travelData.emergencyContact}
                  onChange={(e) => setTravelData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                />
              </Card>
            </div>

            {/* Destination Overview */}
            <Card className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50">
              <h3 className="mb-4 flex items-center">
                <MapPin className="h-5 w-5 text-cyan-600 mr-2" />
                {destination} Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Country:</span>
                    <span>{destInfo.country}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Language:</span>
                    <span>{destInfo.language}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Currency:</span>
                    <span>{destInfo.currency}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Emergency:</span>
                    <Badge variant="destructive">{destInfo.emergencyNumber}</Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Time Zone:</span>
                    <span>{destInfo.timeZone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Weather:</span>
                    <span>{destInfo.weather}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="text-gray-600 hover:text-gray-900">
                ← Back
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold">Trip Setup</h1>
                  <p className="text-sm text-muted-foreground">Destination: {destination}</p>
                </div>
              </div>
            </div>
            
            <Badge variant="secondary" className="bg-cyan-100 text-cyan-700">
              Step {step} of {totalSteps}
            </Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={progress} className="w-full h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {renderStepContent()}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            {step === totalSteps ? 'Complete Setup' : 'Next'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}