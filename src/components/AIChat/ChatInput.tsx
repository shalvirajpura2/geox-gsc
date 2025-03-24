
import { useState, useRef, KeyboardEvent } from "react";
import { Mic, Send, MicOff, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { translations } from "../Layout";
import { Language } from "../LanguageSwitcher";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  language: Language;
  disabled?: boolean;
  suggestedQuestions?: string[];
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  language,
  disabled = false,
  suggestedQuestions = [],
}) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    // Simulated voice recording
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Start recording simulation
      setTimeout(() => {
        // Stop simulated recording after 3 seconds and send a message
        setIsRecording(false);
        onSendMessage(translations[language].demoQuestions[0]);
      }, 3000);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    onSendMessage(question);
  };

  return (
    <div className="space-y-4 p-4 border-t bg-card/80 backdrop-blur-sm">
      {suggestedQuestions.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {suggestedQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="whitespace-nowrap shadow-sm hover:bg-primary/10 transition-colors"
              onClick={() => handleSuggestedQuestion(question)}
              disabled={disabled}
            >
              <MessageSquare className="w-3 h-3 mr-1 opacity-70" />
              {question}
            </Button>
          ))}
        </div>
      )}
      
      <div className="flex items-end gap-2">
        <Textarea
          ref={textareaRef}
          placeholder={isRecording ? "Listening..." : "Type your message..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[60px] resize-none bg-background border-muted focus-visible:ring-primary/40"
          disabled={disabled || isRecording}
        />
        <div className="flex flex-col gap-2">
          <Button
            size="icon"
            variant={isRecording ? "destructive" : "outline"}
            onClick={toggleRecording}
            disabled={disabled}
            title={isRecording ? "Stop recording" : "Start voice input"}
            className={isRecording ? "" : "border-muted bg-background hover:bg-primary/10 hover:text-primary"}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={disabled || isRecording || !message.trim()}
            title="Send message"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
