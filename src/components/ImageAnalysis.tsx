
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface AnalysisCategory {
  name: string;
  percentage: number;
  color: string;
}

interface ImageAnalysisProps {
  imageUrl: string;
  className?: string;
}

const ImageAnalysis: React.FC<ImageAnalysisProps> = ({ imageUrl, className }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [categories, setCategories] = useState<AnalysisCategory[]>([]);
  
  useEffect(() => {
    // Simulate analysis process
    setIsAnalyzing(true);
    setCategories([]);
    
    setTimeout(() => {
      // Predefined analysis results for the demo
      setCategories([
        { name: "Agricultural Fields", percentage: 45, color: "bg-geox-field" },
        { name: "Forests", percentage: 23, color: "bg-geox-forest" },
        { name: "Urban Areas", percentage: 20, color: "bg-accent" },
        { name: "Water Bodies", percentage: 12, color: "bg-geox-water" },
      ]);
      setIsAnalyzing(false);
    }, 2500);
  }, [imageUrl]);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="relative">
        <img 
          src={imageUrl} 
          alt="Satellite image" 
          className="w-full h-64 object-cover"
        />
        
        {/* Overlay effect for analyzed image */}
        <div className="absolute inset-0 bg-black bg-opacity-20">
          {!isAnalyzing && (
            <>
              {/* Simulated analysis overlay with semi-transparent colors */}
              <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-geox-forest/30 border border-geox-forest"></div>
              <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 bg-geox-field/30 border border-geox-field"></div>
              <div className="absolute top-1/3 right-0 w-1/4 h-2/3 bg-accent/30 border border-accent"></div>
              <div className="absolute bottom-0 left-0 w-1/5 h-1/3 bg-geox-water/30 border border-geox-water"></div>
            </>
          )}
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          {isAnalyzing ? "Analyzing Image..." : "Land Classification Results"}
        </h3>
        
        <div className="space-y-4">
          {isAnalyzing ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
                <Progress value={65} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-2/3 bg-muted rounded animate-pulse"></div>
                <Progress value={40} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-1/2 bg-muted rounded animate-pulse"></div>
                <Progress value={25} className="h-2" />
              </div>
            </div>
          ) : (
            <>
              {categories.map((category, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span>{category.name}</span>
                    <span className="font-medium">{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div 
                      className={cn("h-2.5 rounded-full", category.color)} 
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium mb-2">Summary</h4>
                <p className="text-sm text-muted-foreground">
                  The analyzed region is predominantly agricultural (45%) with significant forest coverage (23%). 
                  Urban development accounts for 20% of the area, and water bodies make up 12%, 
                  indicating a balanced landscape with diverse land use patterns.
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageAnalysis;
