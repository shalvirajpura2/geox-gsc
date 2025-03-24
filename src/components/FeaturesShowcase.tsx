
import { User2, Laptop, BarChart3, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeaturesShowcaseProps {
  className?: string;
}

const FeaturesShowcase: React.FC<FeaturesShowcaseProps> = ({ className }) => {
  const features: Feature[] = [
    {
      title: "AI-Powered Analysis",
      description: "Advanced deep learning models identify and classify land features with high accuracy",
      icon: <Lightbulb className="h-6 w-6" />,
    },
    {
      title: "Multiple AI Models",
      description: "Choose between land classification, crop disease detection, and soil quality assessment",
      icon: <Laptop className="h-6 w-6" />,
    },
    {
      title: "Interactive Results",
      description: "Visualize analysis results with color-coded overlays and detailed breakdowns",
      icon: <BarChart3 className="h-6 w-6" />,
    },
    {
      title: "Conversational Interface",
      description: "Ask questions about the analyzed image and get specific insights through natural language",
      icon: <User2 className="h-6 w-6" />,
    },
  ];

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {features.map((feature, index) => (
        <Card key={index} className="border overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardContent className="p-6 pt-6">
            <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeaturesShowcase;
