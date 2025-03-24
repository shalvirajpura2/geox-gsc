
import { useState } from "react";
import { Check, MapPin, Sprout, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { translations } from "./Layout";
import { Language } from "./LanguageSwitcher";

interface ModelSelectorProps {
  onModelChange: (model: "land" | "crop" | "soil") => void;
  language: Language;
  className?: string;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ 
  onModelChange,
  language,
  className 
}) => {
  const [selectedModel, setSelectedModel] = useState<"land" | "crop" | "soil">("land");

  const trans = translations[language];

  const handleModelChange = (model: "land" | "crop" | "soil") => {
    setSelectedModel(model);
    onModelChange(model);
  };

  const models = [
    {
      id: "land",
      name: trans.landClassification,
      icon: <MapPin className="h-4 w-4" />,
      description: "Classify land into forests, urban areas, water, fields"
    },
    {
      id: "crop",
      name: trans.cropDiseaseDetection,
      icon: <Sprout className="h-4 w-4" />,
      description: "Identify plant health issues from images"
    },
    {
      id: "soil",
      name: trans.soilQualityAssessment,
      icon: <Mountain className="h-4 w-4" />,
      description: "Analyze soil fertility, erosion risks"
    }
  ];

  const selectedModelObj = models.find(model => model.id === selectedModel);

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <div className="text-sm text-muted-foreground">AI Model</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              {selectedModelObj?.icon}
              <span>{selectedModelObj?.name}</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[300px]">
          {models.map((model) => (
            <DropdownMenuItem
              key={model.id}
              onClick={() => handleModelChange(model.id as "land" | "crop" | "soil")}
              className="flex items-start gap-2 p-3"
            >
              <div className={cn(
                "rounded-full p-2",
                selectedModel === model.id ? "bg-primary text-primary-foreground" : "bg-muted"
              )}>
                {model.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{model.name}</div>
                  {selectedModel === model.id && <Check className="h-4 w-4" />}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {model.description}
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ModelSelector;
