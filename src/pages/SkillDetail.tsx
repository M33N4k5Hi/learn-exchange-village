
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSkills } from "../context/SkillsContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MessageCircle, ChevronLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useToast } from "@/hooks/use-toast";

const SkillDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getSkillById } = useSkills();
  const { toast } = useToast();
  const [isRequestSent, setIsRequestSent] = useState(false);
  
  const skill = getSkillById(id || "");
  
  if (!skill) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Skill not found</h1>
            <p className="mb-6">The skill you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/skills">Back to Skills</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleRequestSkill = () => {
    // In a real app, this would send an API request
    toast({
      title: "Request sent!",
      description: `Your request for ${skill.title} has been sent to ${skill.owner.name}.`,
    });
    setIsRequestSent(true);
  };

  const handleContactTeacher = () => {
    toast({
      title: "Message sent!",
      description: `Your message has been sent to ${skill.owner.name}.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link to="/skills" className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                <ChevronLeft className="h-4 w-4" />
                Back to Skills
              </Link>
            </Button>
          </div>
          
          {/* Skill Header */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{skill.title}</h1>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {skill.category}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Listed {new Date(skill.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-medium">{skill.rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-gray-500">
                  ({skill.reviews.length} {skill.reviews.length === 1 ? "review" : "reviews"})
                </span>
              </div>
            </div>
            
            {/* Teacher Info */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarImage src={skill.owner.avatar} alt={skill.owner.name} />
                <AvatarFallback>{skill.owner.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Taught by {skill.owner.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Star className="h-3 w-3" />
                  <span>{skill.owner.rating.toFixed(1)} teacher rating</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Skill Content and Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {/* Description */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">About this skill</h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {skill.description}
                  </p>
                </CardContent>
              </Card>
              
              {/* Reviews */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Reviews</h2>
                  
                  {skill.reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet.</p>
                  ) : (
                    <div className="space-y-6">
                      {skill.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                          <div className="flex items-center gap-3 mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={review.userAvatar} alt={review.userName} />
                              <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{review.userName}</h4>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-3 w-3 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Action Sidebar */}
            <div>
              <Card className="sticky top-6">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-1">
                      {skill.isPaid ? `$${skill.price?.toFixed(2)} USD` : "Free"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {skill.isPaid ? "Paid skill" : "This skill is offered for free"}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full" 
                      disabled={isRequestSent}
                      onClick={handleRequestSkill}
                    >
                      {isRequestSent ? "Request Sent" : "Request this Skill"}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center gap-2"
                      onClick={handleContactTeacher}
                    >
                      <MessageCircle className="h-4 w-4" />
                      Contact Teacher
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SkillDetail;
