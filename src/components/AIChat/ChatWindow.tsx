import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useOutletContext } from "react-router-dom";
import { Language } from "../LanguageSwitcher";
import { translations } from "../Layout";
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatWindowProps {
  className?: string;
  modelType?: "land" | "crop" | "soil";
  imageUploaded?: boolean;
}

interface ContextType {
  language: Language;
  translations: typeof translations;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  className,
  modelType = "land",
  imageUploaded = false,
}) => {
  const { language } = useOutletContext<ContextType>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const trans = translations[language];

  useEffect(() => {
    if (imageUploaded && messages.length === 0) {
      // Add initial messages if an image has been uploaded
      const initialMessages: Message[] = [];
      
      // Welcome message
      initialMessages.push({
        id: "welcome",
        content: "Welcome to GeoX AI Analysis! I've processed your satellite image and I'm ready to provide insights.",
        role: "assistant",
        timestamp: new Date(Date.now() - 120000),
      });
      
      // Initial analysis message
      let analysisMsg = "";
      if (modelType === "land") {
        analysisMsg = "I've analyzed your image and identified various land types including forests (23%), agricultural fields (45%), water bodies (12%), and urban areas (20%). Here are some key observations:";
      } else if (modelType === "crop") {
        analysisMsg = "I've analyzed the crop health in your image. The vegetation appears healthy overall with no significant disease patterns detected. There are some stressed areas in the northeast section. Here's what I found:";
      } else {
        analysisMsg = "I've analyzed the soil in your image. The soil appears to be primarily clay-loam with moderate fertility. There are signs of erosion in some parts. Here's my assessment:";
      }
      
      initialMessages.push({
        id: "analysis",
        content: analysisMsg,
        role: "assistant",
        timestamp: new Date(Date.now() - 60000),
      });
      
      // Specific observations based on model type
      let detailsMsg = "";
      if (modelType === "land") {
        detailsMsg = "The agricultural areas show regular patterns indicating active farming. The forest regions appear denser in the northeast. Urban development is concentrated in the southern section with typical grid patterns. Water bodies include what appears to be a small lake or reservoir system.";
      } else if (modelType === "crop") {
        detailsMsg = "Most crop fields show good NDVI values indicating healthy photosynthetic activity. The northeastern section shows signs of water stress that may require attention. No significant pest activity patterns are detected. Crop rows appear well-maintained with consistent spacing.";
      } else {
        detailsMsg = "Soil composition appears to be primarily clay-loam with good water retention capacity. Organic matter content is estimated to be moderate. Some sloped areas show signs of erosion that may need attention. pH levels appear to be in the neutral to slightly acidic range based on vegetation patterns.";
      }
      
      initialMessages.push({
        id: "details",
        content: detailsMsg,
        role: "assistant",
        timestamp: new Date(Date.now() - 30000),
      });
      
      setMessages(initialMessages);
    }
  }, [imageUploaded, modelType]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setIsTyping(true);
    
    // Simulate AI response based on the model type
    setTimeout(() => {
      let response = "";
      
      if (modelType === "land") {
        if (content.toLowerCase().includes("water") || content.toLowerCase().includes("percentage")) {
          response = "The image shows approximately 12% water coverage. There is a small lake in the southwest portion of the image that spans about 5 hectares.";
        } else if (content.toLowerCase().includes("agriculture") || content.toLowerCase().includes("agricultural")) {
          response = "Agricultural areas make up about 45% of the image. These areas primarily consist of crop fields with some evidence of irrigation systems. The main crops appear to be wheat and maize based on the patterns and coloration.";
        } else if (content.toLowerCase().includes("urban")) {
          response = "Urban areas make up about 20% of the image, primarily concentrated in the southern portion. The urban development appears to be low-density residential with some commercial structures.";
        } else if (content.toLowerCase().includes("vegetation") || content.toLowerCase().includes("forest")) {
          response = "Forests and dense vegetation cover approximately 23% of the image, primarily in the northeast and eastern regions. The vegetation appears to be a mix of deciduous and coniferous trees, with some shrubland areas at the forest edges.";
        } else if (content.toLowerCase().includes("crop") || content.toLowerCase().includes("support")) {
          response = "Based on the soil types and existing agricultural patterns, this area shows good potential for crop growth. The existing fields demonstrate successful cultivation, and there are adequate water resources nearby. The soil appears to have good drainage properties in most areas.";
        } else {
          response = "Based on my analysis, the image shows a diverse landscape with agricultural land (45%), forests (23%), water bodies (12%), and urban development (20%). The agricultural areas appear to be actively cultivated, and the water resources seem adequate for irrigation. Would you like more specific information about any particular feature?";
        }
      } else if (modelType === "crop") {
        response = "Based on my analysis of the crop patterns, the fields show healthy vegetation with good growth patterns. There are small areas showing signs of moisture stress that may benefit from irrigation adjustment. I don't detect any significant disease patterns, though there are some minor nutrient deficiency indicators in the northeastern section.";
      } else {
        response = "The soil analysis indicates a clay-loam composition with moderate organic matter content. The soil pH appears to be in the 6.2-6.8 range based on vegetation patterns. Some areas show signs of erosion, particularly on slopes. Based on these characteristics, this soil would be suitable for a variety of crops with proper management practices.";
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={cn("flex flex-col border rounded-lg overflow-hidden bg-background h-full", className)}>
      <div className="p-4 border-b bg-card/80 backdrop-blur-sm flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Bot className="h-4 w-4" />
          </div>
          <h3 className="font-semibold">GeoX AI Assistant</h3>
        </div>
        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
          {modelType === "land" 
            ? trans.landClassification 
            : modelType === "crop" 
            ? trans.cropDiseaseDetection
            : trans.soilQualityAssessment}
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 bg-muted/5">
        {messages.length === 0 && imageUploaded && (
          <div className="flex justify-center items-center h-full text-muted-foreground">
            <p>Ask a question about the analyzed image...</p>
          </div>
        )}
        
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <ChatMessage
            message={{
              id: "typing",
              content: "Analyzing data...",
              role: "assistant",
              timestamp: new Date(),
            }}
            typing
          />
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        language={language}
        disabled={!imageUploaded || isTyping}
        suggestedQuestions={imageUploaded ? trans.demoQuestions : []}
      />
    </div>
  );
};

export default ChatWindow;
