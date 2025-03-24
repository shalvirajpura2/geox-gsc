
import { ArrowRight, Activity, Globe, Map, CloudLightning } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  comingSoon: boolean;
}

interface FutureFeaturesProps {
  className?: string;
}

const FutureFeatures: React.FC<FutureFeaturesProps> = ({ className }) => {
  const features: FeatureCard[] = [
    {
      title: "Time Series Analysis",
      description: "Track changes in land use and vegetation over time with historical imagery comparison",
      icon: <Activity className="h-10 w-10" />,
      comingSoon: true,
    },
    {
      title: "GIS Integration",
      description: "Export analysis results to common GIS formats for use in professional mapping software",
      icon: <Map className="h-10 w-10" />,
      comingSoon: true,
    },
    {
      title: "Global Coverage",
      description: "Access satellite imagery from anywhere in the world with our expanded coverage",
      icon: <Globe className="h-10 w-10" />,
      comingSoon: false,
    },
    {
      title: "Climate Modeling",
      description: "Predict the impact of climate change on landscapes with advanced climate models",
      icon: <CloudLightning className="h-10 w-10" />,
      comingSoon: true,
    },
  ];

  return (
    <div className={cn("py-12", className)}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We're constantly improving GeoX with new features and capabilities. Here's what we're working on next.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className={cn(
            "overflow-hidden transition-all duration-300 hover:shadow-md",
            feature.comingSoon ? "border-dashed" : ""
          )}>
            <CardContent className="p-6 pt-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="rounded-full bg-primary/10 p-3">
                  {feature.icon}
                </div>
                {feature.comingSoon && (
                  <span className="text-xs bg-accent/30 text-accent-foreground px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm flex-1">{feature.description}</p>
              <Button variant="ghost" size="sm" className="mt-4 self-start p-0 h-auto">
                Learn more <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FutureFeatures;
