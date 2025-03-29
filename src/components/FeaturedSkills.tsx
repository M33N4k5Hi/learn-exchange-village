
import { useSkills } from "../context/SkillsContext";
import SkillCard from "./SkillCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedSkills = () => {
  const { featuredSkills, isLoading } = useSkills();

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-1/3 mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96">
                <Skeleton className="h-full w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Featured Skills</h2>
          <p className="mt-4 text-xl text-gray-500">Discover popular skills that our community members are sharing</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild>
            <Link to="/skills">View All Skills</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSkills;
