
import React, { useState, useRef } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImageUploaded: (image: string) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUploaded, className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    // Check if file is an image
    if (!file.type.match("image.*")) {
      toast({
        title: "Error",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Simulate upload process
    setUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && typeof e.target.result === "string") {
            onImageUploaded(e.target.result);
            setUploading(false);
            toast({
              title: "Success",
              description: "Image uploaded successfully!",
            });
          }
        };
        reader.readAsDataURL(file);
      }
    }, 200);
  };

  const handleSampleImage = () => {
    setUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // Use the uploaded demo image
          onImageUploaded("/lovable-uploads/c2c38528-2358-42dc-abd7-86ebb376e1bf.png");
          setUploading(false);
          toast({
            title: "Success",
            description: "Sample image loaded successfully!",
          });
        }, 300);
      }
    }, 100);
  };

  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center flex flex-col items-center justify-center h-60 transition-all cursor-pointer",
          isDragging ? "border-primary bg-primary/5" : "border-border",
          uploading && "opacity-50 pointer-events-none"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <ImageIcon className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-1">Upload Satellite Image</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop an image, or click to browse
        </p>
        <Button variant="outline" size="sm" type="button">
          <Upload className="h-4 w-4 mr-2" />
          Select Image
        </Button>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept="image/*"
        />
      </div>

      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading image...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={handleSampleImage} 
          disabled={uploading}
        >
          Try with sample image
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
