
import { Skill } from "../types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Get current date to determine if it's today
    const now = new Date();
    const isToday = 
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
    
    if (isToday) {
      return "Today";
    }
    
    // Return a simple date format
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get the appropriate color for category
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      programming: "bg-skill-blue text-white",
      languages: "bg-skill-purple text-white",
      music: "bg-skill-pink text-white",
      cooking: "bg-skill-orange text-white",
      design: "bg-skill-green text-white",
      business: "bg-blue-600 text-white",
      fitness: "bg-red-500 text-white",
      art: "bg-pink-500 text-white",
      academic: "bg-yellow-500 text-white",
      other: "bg-gray-500 text-white",
    };
    
    return colors[category] || "bg-gray-500 text-white";
  };

  return (
    <Link to={`/skills/${skill.id}`}>
      <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1 skill-card-gradient">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <Badge className={`${getCategoryColor(skill.category)} capitalize`}>
              {skill.category}
            </Badge>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sm font-medium">{skill.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <h3 className="mt-4 text-lg font-semibold line-clamp-2 text-balance">{skill.title}</h3>
          
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">{skill.description}</p>
          
          <div className="mt-4 flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={skill.owner.avatar} alt={skill.owner.name} />
              <AvatarFallback>{skill.owner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <p className="text-sm font-medium">{skill.owner.name}</p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="px-6 py-3 bg-muted/50 flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatDate(skill.createdAt)}</span>
          </div>
          
          <div>
            {skill.isPaid ? (
              <p className="font-medium text-primary">${skill.price}/hr</p>
            ) : (
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                Free
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default SkillCard;
