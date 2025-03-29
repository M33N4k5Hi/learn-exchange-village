
import { SkillCategory } from "../types";
import { Button } from "@/components/ui/button";
import { 
  Code, Languages, Music, ChefHat, Paintbrush, 
  BarChart2, Dumbbell, Palette, GraduationCap, FileQuestion 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CategoryProps {
  title: string;
  value: SkillCategory;
  icon: React.ReactNode;
  description: string;
}

const categories: CategoryProps[] = [
  {
    title: "Programming",
    value: "programming",
    icon: <Code className="h-5 w-5" />,
    description: "Learn coding and software development"
  },
  {
    title: "Languages",
    value: "languages",
    icon: <Languages className="h-5 w-5" />,
    description: "Master new languages and communication skills"
  },
  {
    title: "Music",
    value: "music",
    icon: <Music className="h-5 w-5" />,
    description: "Develop musical talents and abilities"
  },
  {
    title: "Cooking",
    value: "cooking",
    icon: <ChefHat className="h-5 w-5" />,
    description: "Explore culinary arts and techniques"
  },
  {
    title: "Design",
    value: "design",
    icon: <Paintbrush className="h-5 w-5" />,
    description: "Learn graphic, web, and product design"
  },
  {
    title: "Business",
    value: "business",
    icon: <BarChart2 className="h-5 w-5" />,
    description: "Develop business and entrepreneurship skills"
  },
  {
    title: "Fitness",
    value: "fitness",
    icon: <Dumbbell className="h-5 w-5" />,
    description: "Improve physical health and wellness"
  },
  {
    title: "Art",
    value: "art",
    icon: <Palette className="h-5 w-5" />,
    description: "Explore various art forms and techniques"
  },
  {
    title: "Academic",
    value: "academic",
    icon: <GraduationCap className="h-5 w-5" />,
    description: "Study academic subjects and topics"
  },
  {
    title: "Other",
    value: "other",
    icon: <FileQuestion className="h-5 w-5" />,
    description: "Discover unique and specialized skills"
  }
];

const CategoryList = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: SkillCategory) => {
    navigate(`/skills?category=${category}`);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Explore Skills by Category</h2>
          <p className="mt-4 text-xl text-gray-500">Discover the perfect skill to learn next or find students for your expertise</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant="outline"
              className="flex flex-col items-center justify-center h-32 text-center p-4 hover:bg-primary hover:text-white border-2 border-gray-100 shadow-sm"
              onClick={() => handleCategoryClick(category.value)}
            >
              <div className="bg-primary/10 p-2 rounded-full mb-2">
                {category.icon}
              </div>
              <h3 className="font-medium">{category.title}</h3>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
