
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Language } from "./LanguageSwitcher";
import { Toaster } from "@/components/ui/toaster";

// Content translations
export const translations = {
  en: {
    homepageTitle: "AI-Powered Land Classification",
    homepageSubtitle: "Extract valuable insights from satellite imagery",
    getStarted: "Get Started",
    learnMore: "Learn More",
    uploadImage: "Upload Image",
    analyzeImage: "Analyze Image",
    chatWithAI: "Chat with AI",
    viewResults: "View Results",
    demoQuestions: [
      "What percentage of the image is covered by water bodies?",
      "How much of the land is agricultural?",
      "Are there any urban areas in the image?",
      "What kind of vegetation is present?",
      "Can this area support crop growth?"
    ],
    sampleUpload: "Try with sample image",
    landClassification: "Land Classification",
    cropDiseaseDetection: "Crop Disease Detection",
    soilQualityAssessment: "Soil Quality Assessment",
    adminDashboard: "Admin Dashboard",
    settings: "Settings",
    futureFeatures: "Coming Soon",
    howItWorks: "How It Works",
    testimonials: "What Users Say",
    languages: "Languages",
    themeSettings: "Theme Settings",
    signIn: "Sign In",
  },
  hi: {
    homepageTitle: "AI-संचालित भूमि वर्गीकरण",
    homepageSubtitle: "उपग्रह छवियों से मूल्यवान अंतर्दृष्टि प्राप्त करें",
    getStarted: "शुरू करें",
    learnMore: "और जानें",
    uploadImage: "छवि अपलोड करें",
    analyzeImage: "छवि का विश्लेषण करें",
    chatWithAI: "AI से चैट करें",
    viewResults: "परिणाम देखें",
    demoQuestions: [
      "छवि का कितना प्रतिशत जल निकायों से ढका है?",
      "कितनी भूमि कृषि है?",
      "क्या छवि में कोई शहरी क्षेत्र हैं?",
      "किस प्रकार का वनस्पति मौजूद है?",
      "क्या यह क्षेत्र फसल की वृद्धि का समर्थन कर सकता है?"
    ],
    sampleUpload: "नमूना छवि के साथ प्रयास करें",
    landClassification: "भूमि वर्गीकरण",
    cropDiseaseDetection: "फसल रोग का पता लगाना",
    soilQualityAssessment: "मिट्टी की गुणवत्ता का आकलन",
    adminDashboard: "व्यवस्थापक डैशबोर्ड",
    settings: "सेटिंग्स",
    futureFeatures: "जल्द आ रहा है",
    howItWorks: "यह कैसे काम करता है",
    testimonials: "उपयोगकर्ता क्या कहते हैं",
    languages: "भाषाएँ",
    themeSettings: "थीम सेटिंग्स",
    signIn: "साइन इन करें",
  },
  gu: {
    homepageTitle: "AI-સંચાલિત જમીન વર્ગીકરણ",
    homepageSubtitle: "ઉપગ્રહ છબીઓમાંથી મૂલ્યવાન અંતર્દૃષ્ટિ મેળવો",
    getStarted: "શરૂ કરો",
    learnMore: "વધુ જાણો",
    uploadImage: "છબી અપલોડ કરો",
    analyzeImage: "છબીનું વિશ્લેષણ કરો",
    chatWithAI: "AI સાથે ચેટ કરો",
    viewResults: "પરિણામો જુઓ",
    demoQuestions: [
      "છબીનો કેટલો ભાગ પાણીના સ્ત્રોતોથી આવરી લેવાયો છે?",
      "કેટલી જમીન ખેતીની છે?",
      "શું છબીમાં કોઈ શહેરી વિસ્તારો છે?",
      "કયા પ્રકારની વનસ્પતિ હાજર છે?",
      "શું આ વિસ્તાર પાક વૃદ્ધિનું સમર્થન કરી શકે છે?"
    ],
    sampleUpload: "નમૂના છબી સાથે પ્રયાસ કરો",
    landClassification: "જમીન વર્ગીકરણ",
    cropDiseaseDetection: "પાક રોગની શોધ",
    soilQualityAssessment: "માટીની ગુણવત્તાનું મૂલ્યાંકન",
    adminDashboard: "એડમિન ડેશબોર્ડ",
    settings: "સેટિંગ્સ",
    futureFeatures: "ટૂંક સમયમાં આવી રહ્યું છે",
    howItWorks: "તે કેવી રીતે કામ કરે છે",
    testimonials: "વપરાશકર્તાઓ શું કહે છે",
    languages: "ભાષાઓ",
    themeSettings: "થીમ સેટિંગ્સ",
    signIn: "સાઇન ઇન કરો",
  }
};

const Layout: React.FC = () => {
  const [language, setLanguage] = useState<Language>("en");

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onLanguageChange={handleLanguageChange} />
      <main className="flex-1">
        <Outlet context={{ language, translations }} />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
