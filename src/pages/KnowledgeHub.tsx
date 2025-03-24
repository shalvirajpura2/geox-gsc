
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const KnowledgeHub = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Knowledge Hub</h1>
      <p className="text-muted-foreground mb-8 max-w-3xl">
        Welcome to the GeoX Knowledge Hub! This resource center will help you understand how to use our platform 
        effectively and get the most out of our AI-powered satellite imagery analysis tools.
      </p>

      <Tabs defaultValue="getting-started" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="prompting-guide">Prompting Guide</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="getting-started" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started with GeoX</CardTitle>
              <CardDescription>
                Learn the basics of using GeoX for satellite imagery analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6 space-y-4">
                  <h3 className="text-xl font-semibold">Step 1: Upload Your Image</h3>
                  <p className="text-muted-foreground">
                    Navigate to the Analyze page and upload a satellite or aerial image of your area of interest. 
                    We support common image formats like JPEG, PNG, and TIFF.
                  </p>
                  <Link to="/analyze">
                    <Button variant="outline" className="w-full">
                      Go to Analyze Page
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className="border rounded-lg p-6 space-y-4">
                  <h3 className="text-xl font-semibold">Step 2: Select Analysis Models</h3>
                  <p className="text-muted-foreground">
                    Choose from our various analysis models based on your needs. We offer land classification, 
                    vegetation analysis, urban planning, and more.
                  </p>
                </div>
                
                <div className="border rounded-lg p-6 space-y-4">
                  <h3 className="text-xl font-semibold">Step 3: View Results</h3>
                  <p className="text-muted-foreground">
                    Our AI processes your image and provides detailed analysis results. You'll see a breakdown 
                    of land classification, vegetation coverage, and other insights.
                  </p>
                </div>
                
                <div className="border rounded-lg p-6 space-y-4">
                  <h3 className="text-xl font-semibold">Step 4: Chat with AI</h3>
                  <p className="text-muted-foreground">
                    Ask questions about your analyzed image in natural language. Our AI assistant will provide 
                    insights and answer questions specific to your imagery.
                  </p>
                </div>
              </div>

              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Tip</AlertTitle>
                <AlertDescription>
                  For the best results, use clear, high-resolution satellite imagery with minimal cloud cover.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorial</CardTitle>
              <CardDescription>
                Watch this quick tutorial to learn how to use GeoX effectively
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted flex items-center justify-center rounded-md">
                <div className="text-center">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">Video tutorial coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prompting-guide" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Effective Prompting Guide</CardTitle>
              <CardDescription>
                Learn how to craft effective prompts to get the most accurate and useful results from our AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Principles of Effective Prompting</h3>
                <p>
                  When chatting with our AI about your satellite imagery, the way you phrase your questions 
                  can significantly impact the quality and usefulness of the responses you receive.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Be Specific</h4>
                    <p className="text-muted-foreground text-sm">
                      Provide clear details about what you're looking for in the satellite image.
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded text-sm">
                        <span className="font-medium">Less effective:</span> "What do you see in this image?"
                      </div>
                      <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded text-sm">
                        <span className="font-medium">More effective:</span> "Identify the percentage of agricultural land visible in the northwestern quadrant of this image."
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Use Technical Terms When Applicable</h4>
                    <p className="text-muted-foreground text-sm">
                      Our AI understands geospatial and environmental terminology.
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded text-sm">
                        <span className="font-medium">Less effective:</span> "Is there water in this picture?"
                      </div>
                      <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded text-sm">
                        <span className="font-medium">More effective:</span> "Identify all hydrological features in this image and estimate their total area coverage."
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Ask Sequential Questions</h4>
                    <p className="text-muted-foreground text-sm">
                      Build on previous responses to drill down into specific details.
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded text-sm">
                        <span className="font-medium">First question:</span> "Identify all urban areas in this image."
                      </div>
                      <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded text-sm">
                        <span className="font-medium">Follow-up:</span> "For the largest urban area identified, what is the approximate population density based on building patterns?"
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Request Comparative Analysis</h4>
                    <p className="text-muted-foreground text-sm">
                      Ask the AI to compare different elements within the same image.
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded text-sm">
                        <span className="font-medium">Effective prompt:</span> "Compare the vegetation health in the eastern versus western portions of this image. What factors might explain any differences?"
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-xl font-semibold mb-4">Sample Prompts for Different Analyses</h3>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="land-classification">
                    <AccordionTrigger>Land Classification Prompts</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <p className="text-sm">• "Identify and quantify all land use types visible in this image."</p>
                      <p className="text-sm">• "What percentage of this area is dedicated to agricultural use versus natural vegetation?"</p>
                      <p className="text-sm">• "Detect any recent land use changes in this image compared to typical patterns."</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="urban-planning">
                    <AccordionTrigger>Urban Planning Prompts</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <p className="text-sm">• "Analyze the urban sprawl pattern visible in this image and suggest potential growth directions."</p>
                      <p className="text-sm">• "Identify major transportation corridors and assess their connectivity."</p>
                      <p className="text-sm">• "What is the ratio of green space to developed areas in this urban region?"</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="agriculture">
                    <AccordionTrigger>Agricultural Analysis Prompts</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <p className="text-sm">• "Identify the types of crops likely being grown in these fields based on patterns and coloration."</p>
                      <p className="text-sm">• "Assess the irrigation systems visible in this agricultural region."</p>
                      <p className="text-sm">• "Are there any signs of crop stress or disease visible in this image?"</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="environmental">
                    <AccordionTrigger>Environmental Monitoring Prompts</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <p className="text-sm">• "Identify any visible signs of deforestation or forest degradation in this image."</p>
                      <p className="text-sm">• "Assess the health of the wetland ecosystem visible in this image."</p>
                      <p className="text-sm">• "Are there any visible signs of erosion or land degradation in this region?"</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions about using GeoX
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="file-formats">
                  <AccordionTrigger>What image formats are supported?</AccordionTrigger>
                  <AccordionContent>
                    GeoX supports common image formats including JPEG, PNG, TIFF, and GeoTIFF. For the best results, 
                    we recommend using georeferenced images when possible, though our system can analyze non-georeferenced 
                    images as well.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="accuracy">
                  <AccordionTrigger>How accurate are the AI analyses?</AccordionTrigger>
                  <AccordionContent>
                    Our AI models have been trained on millions of satellite images and achieve high accuracy levels for most 
                    land classification tasks (typically 85-95% accuracy). However, accuracy can vary depending on image quality, 
                    resolution, and the specific features being analyzed. For critical applications, we recommend using the 
                    AI analysis as a supportive tool alongside expert human interpretation.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="image-size">
                  <AccordionTrigger>Is there a limit to image size?</AccordionTrigger>
                  <AccordionContent>
                    The free version of GeoX accepts images up to 10MB in size and 4000x4000 pixels in dimensions. 
                    Premium subscribers can upload larger images up to 50MB and 10000x10000 pixels. For very large 
                    imagery, we recommend splitting into smaller sections or contacting us for custom solutions.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="privacy">
                  <AccordionTrigger>How is my data handled and protected?</AccordionTrigger>
                  <AccordionContent>
                    We take data privacy seriously. All uploaded images are processed securely and are not shared with 
                    third parties. They are stored temporarily during analysis and can be permanently deleted from our 
                    servers at your request. Premium users have additional privacy controls and data retention options.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="subscription">
                  <AccordionTrigger>Do I need a subscription to use GeoX?</AccordionTrigger>
                  <AccordionContent>
                    GeoX offers both free and premium tiers. The free tier allows for basic analysis with limitations 
                    on image size and number of analyses per month. Premium subscriptions provide advanced analysis 
                    capabilities, higher usage limits, priority processing, and additional features. View our pricing 
                    page for detailed information on subscription options.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="models">
                  <AccordionTrigger>What analysis models are available?</AccordionTrigger>
                  <AccordionContent>
                    GeoX offers multiple analysis models including land cover classification, vegetation health assessment, 
                    urban feature detection, water body mapping, agricultural field delineation, change detection, and more. 
                    The available models depend on your subscription level, with premium tiers having access to specialized 
                    models for specific applications.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          
          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link to="/analyze">
                Try It Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeHub;
