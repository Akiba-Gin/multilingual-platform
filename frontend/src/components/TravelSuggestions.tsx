import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Compass, MapPin, Utensils, CreditCard, Calendar, Clock, Star, Heart } from "lucide-react";

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

interface TravelSuggestionsProps {
  selectedLanguage: string;
  userLocation: string;
  travelData?: TravelData | null;
}

const categories = [
  { id: "cultural", label: "Cultural Tips", icon: "🏛️" },
  { id: "dining", label: "Dining", icon: "🍽️" },
  { id: "transportation", label: "Transport", icon: "🚇" },
  { id: "shopping", label: "Shopping", icon: "🛍️" },
  { id: "safety", label: "Safety", icon: "🛡️" },
  { id: "etiquette", label: "Etiquette", icon: "🤝" }
];

const culturalTips = [
  {
    category: "Greetings",
    tip: "In Spain, people often greet with two kisses on the cheek, even in business settings.",
    importance: "medium",
    region: "Spain"
  },
  {
    category: "Dining",
    tip: "Dinner is typically served very late (9-11 PM). Lunch is the main meal of the day.",
    importance: "high",
    region: "Spain"
  },
  {
    category: "Siesta",
    tip: "Many shops close between 2-5 PM for siesta. Plan your shopping accordingly.",
    importance: "medium",
    region: "Spain"
  },
  {
    category: "Tipping",
    tip: "Tipping is not mandatory but 5-10% is appreciated for good service.",
    importance: "low",
    region: "Spain"
  }
];

const diningTips = [
  {
    name: "Tapas Culture",
    description: "Order small plates to share. It's common to bar hop and try different tapas.",
    price: "€€",
    rating: 4.8,
    bestTime: "Evening"
  },
  {
    name: "Menu del Día",
    description: "Look for daily set menus at lunch time - excellent value for money.",
    price: "€",
    rating: 4.5,
    bestTime: "Lunch"
  },
  {
    name: "Local Markets",
    description: "Visit local markets for fresh ingredients and authentic food experiences.",
    price: "€",
    rating: 4.7,
    bestTime: "Morning"
  }
];

const transportationTips = [
  {
    type: "Metro/Subway",
    description: "Buy multi-day passes for better value. Download offline maps.",
    cost: "€1-3 per ride",
    tips: ["Keep tickets until you exit", "Validate before boarding", "Avoid rush hours"]
  },
  {
    type: "Taxi/Rideshare",
    description: "Use official taxi apps or rideshare services. Airport taxis may have fixed rates.",
    cost: "€0.50-2 per km",
    tips: ["Check meter is running", "Ask for receipt", "Tip is not required"]
  },
  {
    type: "Walking",
    description: "Many city centers are walkable and pedestrian-friendly.",
    cost: "Free",
    tips: ["Wear comfortable shoes", "Respect pedestrian zones", "Download walking maps"]
  }
];

const safetyTips = [
  {
    category: "General Safety",
    tips: [
      "Keep copies of important documents separately",
      "Use hotel safes for valuables",
      "Stay aware of your surroundings",
      "Keep emergency contacts handy"
    ],
    level: "Essential"
  },
  {
    category: "Common Scams",
    tips: [
      "Beware of distraction techniques near tourist areas",
      "Don't accept help from strangers with ATMs",
      "Verify taxi meters and routes",
      "Be cautious of overly friendly strangers"
    ],
    level: "Important"
  },
  {
    category: "Health & Medical",
    tips: [
      "Carry basic medications",
      "Know location of nearest hospital",
      "Keep travel insurance details accessible",
      "Understand local pharmacy hours"
    ],
    level: "Recommended"
  }
];

export function TravelSuggestions({ selectedLanguage, userLocation, travelData }: TravelSuggestionsProps) {
  const [selectedCategory, setSelectedCategory] = useState("cultural");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (item: string) => {
    setFavorites(prev => 
      prev.includes(item) 
        ? prev.filter(fav => fav !== item)
        : [...prev, item]
    );
  };

  const renderCulturalTips = () => (
    <div className="space-y-4">
      {culturalTips.map((tip, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-medium">{tip.category}</h3>
                  <Badge 
                    variant={tip.importance === "high" ? "destructive" : 
                            tip.importance === "medium" ? "default" : "secondary"}
                  >
                    {tip.importance}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm">{tip.tip}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-500">{tip.region}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFavorite(`cultural-${index}`)}
                className="ml-2"
              >
                <Heart 
                  className={`h-4 w-4 ${
                    favorites.includes(`cultural-${index}`) 
                      ? "fill-red-500 text-red-500" 
                      : "text-gray-400"
                  }`} 
                />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderDiningTips = () => (
    <div className="space-y-4">
      {diningTips.map((tip, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-medium">{tip.name}</h3>
                  <Badge variant="outline">{tip.price}</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{tip.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">{tip.description}</p>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-500">Best time: {tip.bestTime}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFavorite(`dining-${index}`)}
                className="ml-2"
              >
                <Heart 
                  className={`h-4 w-4 ${
                    favorites.includes(`dining-${index}`) 
                      ? "fill-red-500 text-red-500" 
                      : "text-gray-400"
                  }`} 
                />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderTransportationTips = () => (
    <div className="space-y-4">
      {transportationTips.map((tip, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-medium">{tip.type}</h3>
                  <Badge variant="secondary">{tip.cost}</Badge>
                </div>
                <p className="text-gray-600 text-sm mb-3">{tip.description}</p>
                <div>
                  <h4 className="font-medium text-sm mb-1">Tips:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {tip.tips.map((t, tIndex) => (
                      <li key={tIndex}>• {t}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFavorite(`transport-${index}`)}
                className="ml-2"
              >
                <Heart 
                  className={`h-4 w-4 ${
                    favorites.includes(`transport-${index}`) 
                      ? "fill-red-500 text-red-500" 
                      : "text-gray-400"
                  }`} 
                />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderSafetyTips = () => (
    <div className="space-y-4">
      {safetyTips.map((tip, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-medium">{tip.category}</h3>
                  <Badge 
                    variant={tip.level === "Essential" ? "destructive" : 
                            tip.level === "Important" ? "default" : "secondary"}
                  >
                    {tip.level}
                  </Badge>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {tip.tips.map((t, tIndex) => (
                    <li key={tIndex}>• {t}</li>
                  ))}
                </ul>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFavorite(`safety-${index}`)}
                className="ml-2"
              >
                <Heart 
                  className={`h-4 w-4 ${
                    favorites.includes(`safety-${index}`) 
                      ? "fill-red-500 text-red-500" 
                      : "text-gray-400"
                  }`} 
                />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (selectedCategory) {
      case "cultural":
        return renderCulturalTips();
      case "dining":
        return renderDiningTips();
      case "transportation":
        return renderTransportationTips();
      case "safety":
        return renderSafetyTips();
      default:
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <Compass className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-medium text-gray-500 mb-2">More suggestions coming soon</h3>
              <p className="text-sm text-gray-400">
                We're working on adding {selectedCategory} tips for your destination.
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="mb-2">Travel Suggestions & Tips</h1>
        <p className="text-muted-foreground">
          Get local insights, cultural tips, and practical suggestions for your destination.
        </p>
        
        {/* Personalized Trip Summary */}
        {travelData && (
          <Card className="mt-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Compass className="h-5 w-5 text-cyan-600 mr-2" />
                  Your {travelData.destination} Trip
                </h3>
                <Badge variant="secondary" className="bg-cyan-100 text-cyan-700">
                  {travelData.tripPurpose.charAt(0).toUpperCase() + travelData.tripPurpose.slice(1)} Trip
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-cyan-600" />
                  <span className="text-gray-600">
                    {new Date(travelData.travelDates.checkIn).toLocaleDateString()} - {new Date(travelData.travelDates.checkOut).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-cyan-600" />
                  <span className="text-gray-600">{travelData.travelers} traveler{travelData.travelers > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-cyan-600" />
                  <span className="text-gray-600">
                    {Math.ceil((new Date(travelData.travelDates.checkOut).getTime() - new Date(travelData.travelDates.checkIn).getTime()) / (1000 * 3600 * 24))} days
                  </span>
                </div>
              </div>
              
              {travelData.interests.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Your interests:</p>
                  <div className="flex flex-wrap gap-2">
                    {travelData.interests.map((interest) => (
                      <Badge key={interest} variant="outline" className="text-xs">
                        {interest.charAt(0).toUpperCase() + interest.slice(1)}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {categories.map((category) => {
                  const isActive = selectedCategory === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        isActive 
                          ? "bg-cyan-50 text-cyan-700 border-l-4 border-cyan-600" 
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-medium text-sm">{category.label}</span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>

          {favorites.length > 0 && (
            <Card className="mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  <span>Favorites</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  You have {favorites.length} saved tip{favorites.length !== 1 ? 's' : ''}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{categories.find(c => c.id === selectedCategory)?.icon}</span>
                    <span>{categories.find(c => c.id === selectedCategory)?.label}</span>
                  </CardTitle>
                  <CardDescription>
                    {userLocation && `Suggestions for ${userLocation}`}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {renderContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}