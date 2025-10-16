import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  Scale, 
  Search, 
  FileText, 
  AlertTriangle, 
  Shield, 
  Phone, 
  Building, 
  Users,
  BookOpen,
  Gavel,
  PlusCircle,
  Lightbulb,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

interface LegalRightsProps {
  selectedLanguage: string;
}

interface LegalCase {
  id: string;
  title: string;
  description: string;
  relatedArticles: string[];
  suggestedActions: string[];
  urgency: 'low' | 'medium' | 'high';
  category: string;
}

const constitutionalArticles: Record<string, any> = {
  "Article 14": {
    title: "Right to Equality",
    content: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
    summary: "Everyone is equal before law and entitled to equal protection of laws.",
    relevantFor: ["discrimination", "unfair treatment", "bias", "inequality"]
  },
  "Article 19": {
    title: "Protection of Rights regarding Freedom of Speech",
    content: "All citizens shall have the right to freedom of speech and expression, to assemble peaceably and without arms, to form associations or unions, to move freely throughout the territory of India, to reside and settle in any part of the territory of India, and to practice any profession, or to carry on any occupation, trade or business.",
    summary: "Citizens have freedom of speech, assembly, association, movement, residence and profession.",
    relevantFor: ["free speech", "assembly", "movement", "profession", "business", "expression"]
  },
  "Article 20": {
    title: "Protection in respect of conviction for offences",
    content: "No person shall be convicted of any offence except for violation of a law in force at the time of the commission of the act charged as an offence, nor be subjected to a penalty greater than that which might have been inflicted under the law in force at the time of the commission of the offence.",
    summary: "Protection against retrospective punishment and double jeopardy.",
    relevantFor: ["criminal charges", "punishment", "conviction", "double jeopardy"]
  },
  "Article 21": {
    title: "Protection of Life and Personal Liberty",
    content: "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
    summary: "Right to life and personal liberty - cannot be taken away except by due process of law.",
    relevantFor: ["life threat", "personal liberty", "illegal detention", "right to life", "due process"]
  },
  "Article 22": {
    title: "Protection against arrest and detention",
    content: "No person who is arrested shall be detained in custody without being informed, as soon as may be, of the grounds for such arrest nor shall he be denied the right to consult, and to be defended by, a legal practitioner of his choice.",
    summary: "Rights during arrest including right to know charges and right to legal counsel.",
    relevantFor: ["arrest", "detention", "police custody", "legal counsel", "bail"]
  },
  "Article 25": {
    title: "Freedom of conscience and religion",
    content: "Subject to public order, morality and health and to the other provisions of this Part, all persons are equally entitled to freedom of conscience and the right freely to profess, practice and propagate religion.",
    summary: "Freedom to practice, profess and propagate religion subject to public order.",
    relevantFor: ["religious freedom", "faith", "religion", "worship", "religious practices"]
  }
};

const commonLegalIssues = [
  {
    category: "Employment Rights",
    issues: ["Workplace harassment", "Wrongful termination", "Salary disputes", "Discrimination at work"]
  },
  {
    category: "Consumer Rights",
    issues: ["Product defects", "Service quality", "Refund issues", "False advertising"]
  },
  {
    category: "Property Rights",
    issues: ["Property disputes", "Rent issues", "Illegal occupation", "Construction problems"]
  },
  {
    category: "Criminal Matters",
    issues: ["False accusations", "Police harassment", "Bail matters", "Criminal charges"]
  },
  {
    category: "Civil Rights",
    issues: ["Discrimination", "Privacy violation", "Freedom of expression", "Assembly rights"]
  }
];

export function LegalRights({ selectedLanguage }: LegalRightsProps) {
  const [userProblem, setUserProblem] = useState("");
  const [analysisResult, setAnalysisResult] = useState<LegalCase | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const analyzeLegalProblem = async () => {
    if (!userProblem.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      const problem = userProblem.toLowerCase();
      let relevantArticles: string[] = [];
      let suggestedActions: string[] = [];
      let urgency: 'low' | 'medium' | 'high' = 'medium';
      let category = 'General';

      // Analyze problem and match with constitutional articles
      Object.entries(constitutionalArticles).forEach(([article, info]) => {
        if (info.relevantFor.some((keyword: string) => problem.includes(keyword))) {
          relevantArticles.push(article);
        }
      });

      // Determine suggested actions based on problem type
      if (problem.includes('arrest') || problem.includes('police') || problem.includes('custody')) {
        suggestedActions = [
          "Contact a criminal lawyer immediately",
          "Know your rights under Article 22",
          "Do not sign any document without legal counsel",
          "Inform family members about the situation",
          "Apply for bail if arrested"
        ];
        urgency = 'high';
        category = 'Criminal Law';
      } else if (problem.includes('discrimination') || problem.includes('unfair') || problem.includes('bias')) {
        suggestedActions = [
          "Document all instances of discrimination",
          "File a complaint with relevant authorities",
          "Consult with a civil rights lawyer",
          "Gather witness statements",
          "Approach Human Rights Commission if needed"
        ];
        urgency = 'medium';
        category = 'Civil Rights';
      } else if (problem.includes('employment') || problem.includes('job') || problem.includes('workplace')) {
        suggestedActions = [
          "Check your employment contract",
          "Document workplace incidents",
          "Approach HR department first",
          "File complaint with Labor Commissioner",
          "Consider consulting employment lawyer"
        ];
        urgency = 'medium';
        category = 'Employment Law';
      } else if (problem.includes('property') || problem.includes('rent') || problem.includes('land')) {
        suggestedActions = [
          "Gather all property documents",
          "Consult with a property lawyer",
          "Check local municipal records",
          "Consider mediation first",
          "File case in appropriate civil court"
        ];
        urgency = 'low';
        category = 'Property Law';
      } else {
        suggestedActions = [
          "Consult with a qualified lawyer",
          "Document all relevant evidence",
          "Research applicable laws",
          "Consider alternative dispute resolution",
          "Approach appropriate authorities"
        ];
      }

      if (relevantArticles.length === 0) {
        relevantArticles = ["Article 14", "Article 21"]; // Default fundamental rights
      }

      const result: LegalCase = {
        id: Date.now().toString(),
        title: `Legal Analysis - ${category}`,
        description: userProblem,
        relatedArticles: relevantArticles,
        suggestedActions,
        urgency,
        category
      };

      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 2000);
  };

  const renderArticleDetails = (articleKey: string) => {
    const article = constitutionalArticles[articleKey];
    if (!article) return null;

    return (
      <Card key={articleKey} className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
              {articleKey}
            </CardTitle>
            <Badge variant="outline" className="text-blue-600 border-blue-200">
              Constitutional Right
            </Badge>
          </div>
          <CardDescription className="font-medium">
            {article.title}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-2">Quick Summary:</h4>
              <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                {article.summary}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-2">Full Article:</h4>
              <p className="text-sm text-gray-600 italic">
                "{article.content}"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Scale className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Legal Help System</h1>
            <p className="text-gray-600">Get legal guidance based on Indian Constitution</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <AlertTriangle className="h-4 w-4 inline mr-2 text-yellow-600" />
          This tool provides general legal information based on Indian Constitution. For specific legal advice, please consult with a qualified lawyer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Problem Description */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-cyan-600" />
                Describe Your Legal Problem
              </CardTitle>
              <CardDescription>
                Explain your situation in detail. The more specific you are, the better guidance we can provide.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Example: I was arrested by police without being told the reason. They didn't allow me to call my lawyer or inform my family. I was kept in custody for 3 days without any charges being filed. Is this legal?"
                value={userProblem}
                onChange={(e) => setUserProblem(e.target.value)}
                className="min-h-[120px]"
              />
              <Button 
                onClick={analyzeLegalProblem}
                disabled={!userProblem.trim() || isAnalyzing}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {isAnalyzing ? (
                  <>Analyzing...</>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Analyze Legal Issue
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Result */}
          {analysisResult && (
            <Card className="border-l-4 border-l-cyan-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Gavel className="h-5 w-5 mr-2 text-cyan-600" />
                    Legal Analysis Result
                  </CardTitle>
                  <Badge 
                    variant={analysisResult.urgency === 'high' ? 'destructive' : 
                           analysisResult.urgency === 'medium' ? 'default' : 'secondary'}
                  >
                    {analysisResult.urgency.toUpperCase()} PRIORITY
                  </Badge>
                </div>
                <CardDescription>
                  Category: {analysisResult.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Related Constitutional Articles */}
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Relevant Constitutional Articles
                  </h3>
                  {analysisResult.relatedArticles.map(renderArticleDetails)}
                </div>

                <Separator />

                {/* Suggested Actions */}
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Suggested Actions & Process
                  </h3>
                  <div className="space-y-2">
                    {analysisResult.suggestedActions.map((action, index) => (
                      <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emergency Contacts */}
                {analysisResult.urgency === 'high' && (
                  <Card className="bg-red-50 border-red-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-red-800 mb-2 flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Emergency Legal Contacts
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>📞 <strong>Legal Aid:</strong> 15100 (National Legal Services Authority)</div>
                        <div>📞 <strong>Police Complaint:</strong> 100</div>
                        <div>📞 <strong>Women Helpline:</strong> 1091</div>
                        <div>📞 <strong>Human Rights Commission:</strong> 011-23385368</div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Help Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Common Legal Issues</CardTitle>
              <CardDescription>
                Click on any issue to get quick guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commonLegalIssues.map((category) => (
                  <div key={category.category}>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">
                      {category.category}
                    </h4>
                    <div className="space-y-1">
                      {category.issues.map((issue) => (
                        <Button
                          key={issue}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-left h-auto p-2 text-sm"
                          onClick={() => setUserProblem(issue)}
                        >
                          <ArrowRight className="h-3 w-3 mr-2 flex-shrink-0" />
                          {issue}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-4">
              <h4 className="font-medium mb-3 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-blue-600" />
                Know Your Rights
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Right to remain silent during questioning</div>
                <div>• Right to legal representation</div>
                <div>• Right to know charges against you</div>
                <div>• Right to bail in bailable offenses</div>
                <div>• Right to fair and speedy trial</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Legal Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Find Nearby Legal Aid
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Lawyer Directory
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Scale className="h-4 w-4 mr-2" />
                Court Procedures
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}