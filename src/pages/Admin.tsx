
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Check, Upload, PlusCircle, Languages, MonitorSmartphone, Brain, ImagePlus } from "lucide-react";
import { Language } from "@/components/LanguageSwitcher";
import { translations } from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

interface ContextType {
  language: Language;
  translations: typeof translations;
}

const Admin = () => {
  const { language } = useOutletContext<ContextType>();
  const trans = translations[language];
  const { toast } = useToast();
  
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [modelAccuracy, setModelAccuracy] = useState(85);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleModelUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Success",
            description: "New AI model uploaded successfully",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleThemeChange = (checked: boolean) => {
    setDarkMode(checked);
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(checked ? "dark" : "light");
    localStorage.setItem("theme", checked ? "dark" : "light");
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">{trans.adminDashboard}</h1>
      <p className="text-muted-foreground mb-6">
        Configure settings and manage AI models for the GeoX platform.
      </p>

      <Tabs defaultValue="ai-models">
        <TabsList className="mb-6">
          <TabsTrigger value="ai-models" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Models
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Chatbot Questions
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Languages className="h-4 w-4" />
            Language Settings
          </TabsTrigger>
          <TabsTrigger value="theme" className="flex items-center gap-2">
            <MonitorSmartphone className="h-4 w-4" />
            Theme Settings
          </TabsTrigger>
          <TabsTrigger value="demo-images" className="flex items-center gap-2">
            <ImagePlus className="h-4 w-4" />
            Demo Images
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-models">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Land Classification</CardTitle>
                <CardDescription>
                  Identifies forests, urban areas, water bodies, fields
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Model Version</Label>
                      <span className="text-sm">v2.3.4</span>
                    </div>
                    <div className="flex justify-between">
                      <Label>Accuracy</Label>
                      <span className="text-sm">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <Label>Status</Label>
                      <span className="text-sm flex items-center text-green-600">
                        <Check className="h-3 w-3 mr-1" /> Active
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" onClick={handleModelUpload}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Model
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Crop Disease Detection</CardTitle>
                <CardDescription>
                  Identifies plant health issues from images
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Model Version</Label>
                      <span className="text-sm">v1.5.2</span>
                    </div>
                    <div className="flex justify-between">
                      <Label>Accuracy</Label>
                      <span className="text-sm">79%</span>
                    </div>
                    <div className="flex justify-between">
                      <Label>Status</Label>
                      <span className="text-sm flex items-center text-green-600">
                        <Check className="h-3 w-3 mr-1" /> Active
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Model
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Soil Quality Assessment</CardTitle>
                <CardDescription>
                  Analyzes soil fertility, erosion risks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Model Version</Label>
                      <span className="text-sm">v1.2.1</span>
                    </div>
                    <div className="flex justify-between">
                      <Label>Accuracy</Label>
                      <span className="text-sm">72%</span>
                    </div>
                    <div className="flex justify-between">
                      <Label>Status</Label>
                      <span className="text-sm flex items-center text-green-600">
                        <Check className="h-3 w-3 mr-1" /> Active
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Model
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {isUploading && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Uploading New Model</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Upload progress</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Model Settings</CardTitle>
              <CardDescription>
                Configure global settings for all AI models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Accuracy Threshold ({modelAccuracy}%)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="range"
                      min={50}
                      max={95}
                      value={modelAccuracy}
                      onChange={(e) => setModelAccuracy(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Set the minimum accuracy threshold for model predictions.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="cache-results" defaultChecked />
                  <Label htmlFor="cache-results">Cache analysis results</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="gpu-acceleration" defaultChecked />
                  <Label htmlFor="gpu-acceleration">Use GPU acceleration</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chatbot">
          <Card>
            <CardHeader>
              <CardTitle>Default Chatbot Questions</CardTitle>
              <CardDescription>
                Configure predefined questions that will be suggested to users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {translations.en.demoQuestions.map((question, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`question-${index}`}>Question {index + 1}</Label>
                    <Input 
                      id={`question-${index}`} 
                      defaultValue={question} 
                    />
                  </div>
                ))}
                <Button className="w-full mt-4">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New Question
                </Button>
                <div className="space-y-2 mt-6">
                  <Label htmlFor="welcome-message">Welcome Message</Label>
                  <Textarea 
                    id="welcome-message" 
                    defaultValue="I've analyzed your image and identified various land types. What would you like to know about it?"
                    rows={3}
                  />
                </div>
                <Button className="mt-4">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle>Language Settings</CardTitle>
              <CardDescription>
                Configure available languages and translation settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Available Languages</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="lang-en" defaultChecked />
                      <Label htmlFor="lang-en">English</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="lang-hi" defaultChecked />
                      <Label htmlFor="lang-hi">Hindi</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="lang-gu" defaultChecked />
                      <Label htmlFor="lang-gu">Gujarati</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="lang-es" />
                      <Label htmlFor="lang-es">Spanish</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="lang-fr" />
                      <Label htmlFor="lang-fr">French</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="lang-de" />
                      <Label htmlFor="lang-de">German</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Default Language</Label>
                  <select className="w-full p-2 border rounded">
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="gu">Gujarati</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="auto-detect" defaultChecked />
                  <Label htmlFor="auto-detect">Auto-detect user language</Label>
                </div>

                <Button className="mt-4">Save Language Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>
                Configure the appearance of the GeoX platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Color Scheme</Label>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="dark-mode" 
                      checked={darkMode}
                      onCheckedChange={handleThemeChange}
                    />
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="grid grid-cols-6 gap-2">
                    <div className="h-10 rounded-md bg-primary cursor-pointer border-2 border-ring"></div>
                    <div className="h-10 rounded-md bg-blue-600 cursor-pointer"></div>
                    <div className="h-10 rounded-md bg-purple-600 cursor-pointer"></div>
                    <div className="h-10 rounded-md bg-pink-600 cursor-pointer"></div>
                    <div className="h-10 rounded-md bg-orange-600 cursor-pointer"></div>
                    <div className="h-10 rounded-md bg-red-600 cursor-pointer"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <select className="w-full p-2 border rounded">
                    <option value="small">Small</option>
                    <option value="medium" selected>Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Animation Effects</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="animations" defaultChecked />
                    <Label htmlFor="animations">Enable animations</Label>
                  </div>
                </div>

                <Button className="mt-4">Save Theme Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demo-images">
          <Card>
            <CardHeader>
              <CardTitle>Sample Satellite Images</CardTitle>
              <CardDescription>
                Manage sample images available for demo analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src="/lovable-uploads/c2c38528-2358-42dc-abd7-86ebb376e1bf.png" 
                    alt="Sample 1" 
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3">
                    <div className="font-medium">Agricultural Region</div>
                    <div className="text-sm text-muted-foreground">Mixed farmland and forest area</div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="w-full h-40 bg-muted flex items-center justify-center">
                    <ImagePlus className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="p-3">
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="w-full h-40 bg-muted flex items-center justify-center">
                    <ImagePlus className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="p-3">
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
