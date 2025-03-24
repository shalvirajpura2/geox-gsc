
import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Language } from "@/components/LanguageSwitcher";
import { translations } from "@/components/Layout";
import FeaturesShowcase from "@/components/FeaturesShowcase";
import HowItWorks from "@/components/HowItWorks";
import FutureFeatures from "@/components/FutureFeatures";

interface ContextType {
  language: Language;
  translations: typeof translations;
}

const Index = () => {
  const { language } = useOutletContext<ContextType>();
  const trans = translations[language];
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="geox-gradient-text">GeoX</span>: {trans.homepageTitle}
          </h1>
          <p className="text-xl text-muted-foreground mb-10">
            {trans.homepageSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/analyze">
              <Button size="lg" className="geox-primary-button">
                {trans.getStarted}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="geox-ghost-button">
              {trans.learnMore}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Powerful AI Analysis
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              GeoX combines cutting-edge AI with satellite imagery to deliver accurate land classification and analysis.
            </p>
          </div>
          <FeaturesShowcase />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <HowItWorks />
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">See GeoX in Action</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Upload your own satellite imagery or try our demo to experience the power of AI-driven land classification.
          </p>
          <div className="flex justify-center">
            <Link to="/analyze">
              <Button size="lg" className="geox-primary-button">
                Try the Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Future Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <FutureFeatures />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Upload your satellite imagery now and unlock the power of AI-driven land classification and analysis.
          </p>
          <Link to="/analyze">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              {trans.getStarted}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
