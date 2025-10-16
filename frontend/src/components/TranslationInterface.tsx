import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Type, Mic, Camera, Copy, Volume2, RotateCcw } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface TranslationInterfaceProps {
  selectedLanguage: string;
  onGoToTranslatePage: () => void;
}

const commonPhrases = [
  { category: "Greetings", phrases: [
    { original: "Hello", translated: "Hola" },
    { original: "Thank you", translated: "Gracias" },
    { original: "Please", translated: "Por favor" },
    { original: "Excuse me", translated: "Disculpe" }
  ]},
  { category: "Emergency", phrases: [
    { original: "I need help", translated: "Necesito ayuda" },
    { original: "Call the police", translated: "Llame a la policía" },
    { original: "Where is the hospital?", translated: "¿Dónde está el hospital?" },
    { original: "I don't understand", translated: "No entiendo" }
  ]},
  { category: "Travel", phrases: [
    { original: "Where is the train station?", translated: "¿Dónde está la estación de tren?" },
    { original: "How much does it cost?", translated: "¿Cuánto cuesta?" },
    { original: "I need a taxi", translated: "Necesito un taxi" },
    { original: "Can you help me?", translated: "¿Puedes ayudarme?" }
  ]}
];

export function TranslationInterface({ selectedLanguage, onGoToTranslatePage }: TranslationInterfaceProps) {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState("auto");

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setIsTranslating(true);
    // Simulate translation API call
    setTimeout(() => {
      setTranslatedText(`[Translated to ${selectedLanguage}]: ${inputText}`);
      setIsTranslating(false);
    }, 1000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleSwapLanguages = () => {
    const temp = inputText;
    setInputText(translatedText);
    setTranslatedText(temp);
  };

  const handleVoiceInput = () => {
    toast.info("Voice input feature coming soon!");
  };

  const handleImageUpload = () => {
    toast.info("Image translation feature coming soon!");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2">Translation Services</h1>
            <p className="text-muted-foreground">
              Translate text, voice, and images instantly to communicate effectively while traveling.
            </p>
          </div>
          <Button 
            onClick={onGoToTranslatePage}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
          >
            Open Full Translator
          </Button>
        </div>
      </div>

      <Tabs defaultValue="text" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="text" className="flex items-center space-x-2">
            <Type className="h-4 w-4" />
            <span>Text</span>
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center space-x-2">
            <Mic className="h-4 w-4" />
            <span>Voice</span>
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center space-x-2">
            <Camera className="h-4 w-4" />
            <span>Image</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Translation Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Text Translation
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSwapLanguages}
                    className="h-8 w-8 p-0"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </CardTitle>
                <CardDescription>
                  Enter text to translate to your preferred language
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-detect</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge variant="secondary">to {selectedLanguage}</Badge>
                </div>

                <Textarea
                  placeholder="Enter text to translate..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[120px]"
                />

                <Button 
                  onClick={handleTranslate}
                  disabled={!inputText.trim() || isTranslating}
                  className="w-full"
                >
                  {isTranslating ? "Translating..." : "Translate"}
                </Button>

                {translatedText && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Translation:</span>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(translatedText)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toast.info("Text-to-speech coming soon!")}
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      {translatedText}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Common Phrases */}
            <Card>
              <CardHeader>
                <CardTitle>Common Phrases</CardTitle>
                <CardDescription>
                  Quick access to frequently used travel phrases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commonPhrases.map((category, index) => (
                    <div key={index}>
                      <h4 className="font-medium mb-2">{category.category}</h4>
                      <div className="space-y-2">
                        {category.phrases.map((phrase, phraseIndex) => (
                          <div
                            key={phraseIndex}
                            className="p-3 bg-gray-50 rounded-lg border cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => {
                              setInputText(phrase.original);
                              setTranslatedText(phrase.translated);
                            }}
                          >
                            <div className="text-sm font-medium">{phrase.original}</div>
                            <div className="text-sm text-gray-600">{phrase.translated}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="voice">
          <Card>
            <CardHeader>
              <CardTitle>Voice Translation</CardTitle>
              <CardDescription>
                Speak into your device to get instant voice translations
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Mic className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-lg font-medium mb-2">Voice Translation</h3>
              <p className="text-gray-600 mb-6">
                Click the button below to start recording your voice
              </p>
              <Button onClick={handleVoiceInput} size="lg">
                <Mic className="h-5 w-5 mr-2" />
                Start Recording
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="image">
          <Card>
            <CardHeader>
              <CardTitle>Image Translation</CardTitle>
              <CardDescription>
                Upload or capture images with text to translate signs, menus, and documents
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Camera className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-lg font-medium mb-2">Image Translation</h3>
              <p className="text-gray-600 mb-6">
                Upload an image or use your camera to translate text in images
              </p>
              <div className="flex justify-center space-x-4">
                <Button onClick={handleImageUpload}>
                  <Camera className="h-5 w-5 mr-2" />
                  Take Photo
                </Button>
                <Button variant="outline" onClick={() => document.getElementById('imageUpload')?.click()}>
                  Upload Image
                </Button>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={() => toast.info("Image processing feature coming soon!")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}