import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Mic, Volume2, Copy, RotateCcw, Camera, ArrowRight, MicOff } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface GoogleTranslatePageProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  onBack: () => void;
}

const languages = [
  { code: 'auto', name: 'Detect language', flag: '🌐' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' }
];

const recentTranslations = [
  { from: "Hello, how are you?", to: "Hola, ¿cómo estás?", fromLang: "en", toLang: "es" },
  { from: "Where is the nearest hospital?", to: "¿Dónde está el hospital más cercano?", fromLang: "en", toLang: "es" },
  { from: "Thank you very much", to: "Muchas gracias", fromLang: "en", toLang: "es" }
];

export function GoogleTranslatePage({ selectedLanguage, onLanguageChange, onBack }: GoogleTranslatePageProps) {
  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [targetLanguage, setTargetLanguage] = useState(selectedLanguage);
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState("");

  // Auto-translate as user types
  useEffect(() => {
    if (sourceText.trim() && sourceText.length > 2) {
      const timeoutId = setTimeout(() => {
        handleTranslate();
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else {
      setTranslatedText("");
    }
  }, [sourceText, sourceLanguage, targetLanguage]);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    
    setIsTranslating(true);
    // Simulate translation API call
    setTimeout(() => {
      const fromLang = languages.find(l => l.code === sourceLanguage)?.name || "Auto-detected";
      const toLang = languages.find(l => l.code === targetLanguage)?.name || "Target";
      setTranslatedText(`[${fromLang} → ${toLang}]: ${sourceText}`);
      
      if (sourceLanguage === "auto") {
        setDetectedLanguage("English");
      }
      setIsTranslating(false);
    }, 800);
  };

  const handleSwapLanguages = () => {
    if (sourceLanguage === "auto") return;
    
    const tempLang = sourceLanguage;
    const tempText = sourceText;
    
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLang);
    setSourceText(translatedText);
    setTranslatedText(tempText);
  };

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      toast.success("Voice recording stopped");
      // Simulate voice recognition result
      setTimeout(() => {
        setSourceText("Hello, I need help finding the nearest train station.");
      }, 500);
    } else {
      setIsListening(true);
      toast.info("Listening... Speak now");
      // Auto-stop after 5 seconds
      setTimeout(() => {
        if (isListening) {
          setIsListening(false);
        }
      }, 5000);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleSpeak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      speechSynthesis.speak(utterance);
      toast.success("Playing audio");
    } else {
      toast.info("Text-to-speech not supported in this browser");
    }
  };

  const handleImageUpload = () => {
    toast.info("Image translation feature coming soon!");
  };

  const handleRecentTranslation = (recent: typeof recentTranslations[0]) => {
    setSourceLanguage(recent.fromLang);
    setTargetLanguage(recent.toLang);
    setSourceText(recent.from);
    setTranslatedText(recent.to);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="text-gray-600 hover:text-gray-900">
                ← Back
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <h1 className="text-xl font-semibold text-gray-900">MultiLingual Translate</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-cyan-100 text-cyan-700">
                Real-time Translation
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Language Selector Bar */}
        <Card className="p-6 mb-6 bg-white shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                <SelectTrigger className="w-[200px] bg-gray-50 border-gray-200">
                  <SelectValue>
                    <div className="flex items-center space-x-2">
                      <span>{languages.find(l => l.code === sourceLanguage)?.flag}</span>
                      <span>{languages.find(l => l.code === sourceLanguage)?.name}</span>
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

              {detectedLanguage && sourceLanguage === "auto" && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Detected: {detectedLanguage}
                </Badge>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleSwapLanguages}
              disabled={sourceLanguage === "auto"}
              className="p-2 hover:bg-cyan-50 rounded-full"
            >
              <RotateCcw className="h-5 w-5 text-cyan-600" />
            </Button>

            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger className="w-[200px] bg-gray-50 border-gray-200">
                <SelectValue>
                  <div className="flex items-center space-x-2">
                    <span>{languages.find(l => l.code === targetLanguage)?.flag}</span>
                    <span>{languages.find(l => l.code === targetLanguage)?.name}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {languages.filter(l => l.code !== "auto").map((language) => (
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
        </Card>

        {/* Translation Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Source Text */}
          <Card className="bg-white shadow-lg border-0">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">
                  {languages.find(l => l.code === sourceLanguage)?.name || "Source"}
                </h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleVoiceInput}
                    className={`p-2 rounded-full ${
                      isListening 
                        ? "bg-red-100 text-red-600 hover:bg-red-200" 
                        : "hover:bg-cyan-50 text-cyan-600"
                    }`}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleImageUpload}
                    className="p-2 hover:bg-cyan-50 text-cyan-600 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Textarea
                placeholder="Enter text to translate..."
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                className="min-h-[200px] border-gray-200 focus:border-cyan-400 focus:ring-cyan-400 resize-none text-lg"
              />
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-500">
                  {sourceText.length}/5000 characters
                </span>
                <div className="flex items-center space-x-2">
                  {sourceText && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSpeak(sourceText, sourceLanguage)}
                      className="text-cyan-600 hover:bg-cyan-50"
                    >
                      <Volume2 className="h-4 w-4 mr-1" />
                      Listen
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Translated Text */}
          <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 shadow-lg border-0">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">
                  {languages.find(l => l.code === targetLanguage)?.name || "Translation"}
                </h3>
                {isTranslating && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-cyan-600">Translating...</span>
                  </div>
                )}
              </div>
              
              <div className="min-h-[200px] p-4 bg-white rounded-lg border border-gray-200">
                {translatedText ? (
                  <p className="text-lg text-gray-900 leading-relaxed">{translatedText}</p>
                ) : (
                  <p className="text-gray-400 text-lg">Translation will appear here...</p>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  {translatedText && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSpeak(translatedText, targetLanguage)}
                        className="text-cyan-600 hover:bg-cyan-50"
                      >
                        <Volume2 className="h-4 w-4 mr-1" />
                        Listen
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(translatedText)}
                        className="text-cyan-600 hover:bg-cyan-50"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Translations */}
        <Card className="bg-white shadow-lg border-0">
          <div className="p-6">
            <h3 className="font-medium text-gray-900 mb-4">Recent Translations</h3>
            <div className="space-y-3">
              {recentTranslations.map((recent, index) => (
                <div
                  key={index}
                  onClick={() => handleRecentTranslation(recent)}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-gray-500">
                          {languages.find(l => l.code === recent.fromLang)?.flag}
                          {languages.find(l => l.code === recent.fromLang)?.name}
                        </span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {languages.find(l => l.code === recent.toLang)?.flag}
                          {languages.find(l => l.code === recent.toLang)?.name}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-1">{recent.from}</p>
                      <p className="text-cyan-600">{recent.to}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}