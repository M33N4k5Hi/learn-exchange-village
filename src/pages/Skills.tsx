
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSkills } from "../context/SkillsContext";
import { SkillCategory } from "../types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SkillCard from "../components/SkillCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Skills = () => {
  const { skills, isLoading, searchSkills, filterByCategory } = useSkills();
  const [filteredSkills, setFilteredSkills] = useState(skills);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | "all">("all");
  const [sortBy, setSortBy] = useState<"newest" | "rating" | "price">("newest");
  const location = useLocation();

  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("search");
    const categoryParam = params.get("category") as SkillCategory | null;

    if (searchParam) {
      setSearchTerm(searchParam);
    }
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  // Filter skills based on search, category, and sorting
  useEffect(() => {
    let result = skills;

    // Apply search filter
    if (searchTerm) {
      result = searchSkills(searchTerm);
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter(skill => skill.category === selectedCategory);
    }

    // Apply sorting
    if (sortBy === "newest") {
      result = [...result].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price") {
      result = [...result].sort((a, b) => {
        // Free skills first, then by price
        if (!a.isPaid && b.isPaid) return -1;
        if (a.isPaid && !b.isPaid) return 1;
        if (a.isPaid && b.isPaid) {
          return (a.price || 0) - (b.price || 0);
        }
        return 0;
      });
    }

    setFilteredSkills(result);
  }, [skills, searchTerm, selectedCategory, sortBy, searchSkills]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already handled by the useEffect
  };

  // Categories for the filter
  const categories: { label: string; value: SkillCategory | "all" }[] = [
    { label: "All Categories", value: "all" },
    { label: "Programming", value: "programming" },
    { label: "Languages", value: "languages" },
    { label: "Music", value: "music" },
    { label: "Cooking", value: "cooking" },
    { label: "Design", value: "design" },
    { label: "Business", value: "business" },
    { label: "Fitness", value: "fitness" },
    { label: "Art", value: "art" },
    { label: "Academic", value: "academic" },
    { label: "Other", value: "other" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Explore Skills</h1>
              <p className="mt-2 text-gray-600">Discover and connect with people who can teach you new skills</p>
            </div>
            
            <form onSubmit={handleSearch} className="w-full md:w-auto flex">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2"
                />
              </div>
              <Button type="submit" className="ml-2 hidden md:flex">Search</Button>
              
              {/* Mobile filters button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="ml-2 md:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Narrow down skills based on your preferences
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <Select
                        value={selectedCategory}
                        onValueChange={(value) => setSelectedCategory(value as SkillCategory | "all")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                      <Select
                        value={sortBy}
                        onValueChange={(value) => setSortBy(value as "newest" | "rating" | "price")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="rating">Highest Rated</SelectItem>
                          <SelectItem value="price">Price (Low to High)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </form>
          </div>
          
          {/* Desktop filters */}
          <div className="hidden md:flex items-center space-x-4 mb-8">
            <div className="w-48">
              <Select
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value as SkillCategory | "all")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-48">
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as "newest" | "rating" | "price")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price">Price (Low to High)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Skill cards grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-72 w-full" />
              ))}
            </div>
          ) : filteredSkills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium text-gray-900">No skills found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Skills;
