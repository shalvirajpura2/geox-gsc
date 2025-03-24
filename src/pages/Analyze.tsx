
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Language } from "@/components/LanguageSwitcher";
import { translations } from "@/components/Layout";
import ImageUpload from "@/components/ImageUpload";
import ImageAnalysis from "@/components/ImageAnalysis";
import ChatWindow from "@/components/AIChat/ChatWindow";
import ModelSelector from "@/components/ModelSelector";

interface ContextType {
  language: Language;
  translations: typeof translations;
}

const Analyze = () => {
  const { language } = useOutletContext<ContextType>();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [modelType, setModelType] = useState<"land" | "crop" | "soil">("land");
  
  const trans = translations[language];
  
  const handleImageUploaded = (imageUrl: string) => {
    setUploadedImage(imageUrl);
  };
  
  const handleModelChange = (model: "land" | "crop" | "soil") => {
    setModelType(model);
  };
  
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-2">{trans.analyzeImage}</h1>
          <p className="text-muted-foreground max-w-3xl">
            Upload a satellite or aerial image to analyze land features and get AI-powered insights.
            Our advanced models can identify various land types, assess crop health, and evaluate soil quality.
          </p>
        </div>

        {/* 50-50% layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left side - Analysis Section */}
          <div className="space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
            <div className="bg-card rounded-lg border shadow-sm p-4">
              <h2 className="text-xl font-semibold mb-4">Analysis Settings</h2>
              <ModelSelector onModelChange={handleModelChange} language={language} />
            </div>
            
            {!uploadedImage ? (
              <div className="bg-card rounded-lg border shadow-sm">
                <ImageUpload onImageUploaded={handleImageUploaded} />
              </div>
            ) : (
              <ImageAnalysis imageUrl={uploadedImage} />
            )}
          </div>

          {/* Right side - Chat Section */}
          <div className="space-y-6">
            {uploadedImage ? (
              <ChatWindow 
                modelType={modelType} 
                imageUploaded={!!uploadedImage} 
                className="bg-card rounded-lg border shadow-sm h-[calc(100vh-12rem)]" 
              />
            ) : (
              <div className="h-[calc(100vh-12rem)] flex items-center justify-center border rounded-lg p-8 text-center bg-card shadow-sm">
                <div className="max-w-md">
                  <div className="mb-4 text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 opacity-50">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Image Uploaded</h3>
                  <p className="text-muted-foreground mb-4">
                    Upload a satellite or aerial image to start analyzing land features and get AI-powered insights.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
