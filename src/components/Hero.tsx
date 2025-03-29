
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/skills?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="relative overflow-hidden bg-primary/5 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Share Knowledge,</span>
            <span className="block text-primary">Grow Together</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
            Join our community to teach what you know and learn what you don't. Exchange skills and knowledge with people from around the world.
          </p>
          
          <form onSubmit={handleSearch} className="mt-8 sm:mx-auto sm:max-w-lg">
            <div className="flex">
              <div className="min-w-0 flex-1">
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    className="block w-full rounded-l-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    placeholder="What do you want to learn today?"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="rounded-l-none rounded-r-md py-3 px-6"
              >
                Search
              </Button>
            </div>
          </form>
          
          <div className="mt-10 flex justify-center space-x-3">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => navigate("/skills")}
            >
              Browse Skills
            </Button>
            <Button 
              onClick={() => navigate("/register")}
            >
              Join Now
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10"></div>
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/5"></div>
    </div>
  );
};

export default Hero;
