
import { Upload, Bot, Image as ImageIcon, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface HowItWorksProps {
  className?: string;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ className }) => {
  const steps: Step[] = [
    {
      title: "Upload",
      description: "Upload a satellite or aerial image of your area of interest",
      icon: <Upload className="h-8 w-8" />,
    },
    {
      title: "Analyze",
      description: "Our AI models process the image and identify land features",
      icon: <ImageIcon className="h-8 w-8" />,
    },
    {
      title: "Visualize",
      description: "View detailed breakdowns of land types and distributions",
      icon: <BarChart3 className="h-8 w-8" />,
    },
    {
      title: "Interact",
      description: "Ask questions and get insights about the analyzed landscape",
      icon: <Bot className="h-8 w-8" />,
    },
  ];

  return (
    <div className={cn("py-12", className)}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          GeoX uses advanced AI to analyze and interpret satellite imagery, providing you with valuable insights about land use and features.
        </p>
      </div>

      <div className="relative">
        {/* Connecting line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border hidden md:block" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="rounded-full bg-card p-6 border-2 border-primary z-10 mb-4 relative">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
