
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: Date;
  };
  typing?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, typing = false }) => {
  const [expanded, setExpanded] = useState(false);
  const isUser = message.role === "user";
  
  const maxLength = 150;
  const isLongMessage = message.content.length > maxLength;
  const displayContent = !expanded && isLongMessage 
    ? `${message.content.slice(0, maxLength)}...` 
    : message.content;

  return (
    <div 
      className={cn(
        "flex w-full items-start gap-4 p-4 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary/20 text-primary">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div
        className={cn(
          "flex flex-col space-y-1 max-w-[80%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-lg px-4 py-2 shadow-sm",
            isUser 
              ? "bg-primary text-primary-foreground" 
              : "bg-card border"
          )}
        >
          <div className={typing ? "animate-pulse" : ""}>
            {displayContent}
          </div>
          {isLongMessage && (
            <button 
              onClick={() => setExpanded(!expanded)} 
              className={cn(
                "text-xs underline mt-1 hover:opacity-100",
                isUser ? "opacity-70" : "opacity-70 text-primary"
              )}
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary/10 text-primary">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
