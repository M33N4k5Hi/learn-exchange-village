
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { SkillCategory, UserRole } from "../types";
import { 
  CheckCircle, 
  PlusCircle, 
  X, 
  Upload, 
  Edit2
} from "lucide-react";

// Mock user data
const mockUser = {
  id: "user-1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
  bio: "Tech enthusiast and lifelong learner. I'm interested in programming, languages, and music.",
  role: "both" as UserRole,
  skills: ["JavaScript", "Spanish", "Photography"],
  interests: ["Piano", "Cooking", "Web Development"],
  rating: 4.8,
  createdAt: "2023-07-01T14:30:00Z",
};

// Mock user skills
const mockUserSkills = [
  {
    id: "skill-7",
    title: "Photography Basics",
    description: "Learn the fundamentals of photography, including composition, lighting, and basic camera settings.",
    category: "art" as SkillCategory,
    price: null,
    isPaid: false,
    rating: 4.6,
    students: 12,
  },
  {
    id: "skill-8",
    title: "Conversational Spanish",
    description: "Practice Spanish conversation with a fluent speaker. Improve your speaking skills and vocabulary.",
    category: "languages" as SkillCategory,
    price: 15,
    isPaid: true,
    rating: 4.9,
    students: 8,
  },
  {
    id: "skill-9",
    title: "JavaScript for Beginners",
    description: "Introduction to JavaScript programming. Learn syntax, variables, functions, and basic DOM manipulation.",
    category: "programming" as SkillCategory,
    price: 20,
    isPaid: true,
    rating: 4.7,
    students: 15,
  },
];

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: mockUser.name,
    bio: mockUser.bio,
    email: mockUser.email,
    role: mockUser.role,
  });
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [skills, setSkills] = useState(mockUser.skills);
  const [interests, setInterests] = useState(mockUser.interests);
  const [userSkills] = useState(mockUserSkills);

  const handleSaveProfile = () => {
    // In a real app, this would call an API
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    setSkills([...skills, newSkill]);
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleAddInterest = () => {
    if (!newInterest.trim()) return;
    setInterests([...interests, newInterest]);
    setNewInterest("");
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(interests.filter(interest => interest !== interestToRemove));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile sidebar */}
            <div className="md:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={mockUser.avatar} />
                        <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute bottom-0 right-0 rounded-full bg-white"
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    {isEditing ? (
                      <div className="space-y-4 w-full">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            value={formData.bio}
                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                            className="min-h-[100px]"
                          />
                        </div>
                        
                        <div className="flex justify-between">
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleSaveProfile}>
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold mt-2">{mockUser.name}</h2>
                        <p className="text-gray-500">{mockUser.email}</p>
                        
                        <div className="mt-3">
                          <Badge className="capitalize">
                            {mockUser.role === "both" 
                              ? "Teacher & Learner" 
                              : mockUser.role}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center mt-2 text-yellow-600">
                          <span className="font-medium mr-1">{mockUser.rating}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(mockUser.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-500 mt-4 text-center">
                          Member since {new Date(mockUser.createdAt).toLocaleDateString()}
                        </p>
                        
                        <Button 
                          onClick={() => setIsEditing(true)}
                          variant="outline"
                          className="mt-6 w-full"
                        >
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Bio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{mockUser.bio}</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="md:col-span-2">
              <Tabs defaultValue="skills">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="skills">My Skills</TabsTrigger>
                  <TabsTrigger value="interests">My Interests</TabsTrigger>
                  <TabsTrigger value="listings">My Listings</TabsTrigger>
                </TabsList>
                
                {/* Skills Tab */}
                <TabsContent value="skills">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills I can teach</CardTitle>
                      <CardDescription>
                        These are skills that you can offer to teach others
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {skills.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full"
                          >
                            <span>{skill}</span>
                            {isEditing && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 p-0 hover:bg-transparent"
                                onClick={() => handleRemoveSkill(skill)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {isEditing && (
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a new skill"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddSkill();
                              }
                            }}
                          />
                          <Button onClick={handleAddSkill}>Add</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Interests Tab */}
                <TabsContent value="interests">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills I want to learn</CardTitle>
                      <CardDescription>
                        These are skills that you're interested in learning
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {interests.map((interest) => (
                          <div
                            key={interest}
                            className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full"
                          >
                            <span>{interest}</span>
                            {isEditing && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 p-0 hover:bg-transparent"
                                onClick={() => handleRemoveInterest(interest)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {isEditing && (
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a new interest"
                            value={newInterest}
                            onChange={(e) => setNewInterest(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddInterest();
                              }
                            }}
                          />
                          <Button onClick={handleAddInterest}>Add</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Listings Tab */}
                <TabsContent value="listings">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>My Skill Listings</CardTitle>
                        <CardDescription>
                          Skills you've listed for teaching
                        </CardDescription>
                      </div>
                      <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add New Skill
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userSkills.map((skill) => (
                          <div
                            key={skill.id}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium text-lg">{skill.title}</h3>
                                <Badge variant="outline" className="mt-1 capitalize">
                                  {skill.category}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <div className="text-yellow-600 flex items-center justify-end">
                                  <span className="font-medium mr-1">{skill.rating}</span>
                                  <svg
                                    className="w-4 h-4 text-yellow-500 fill-yellow-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                    />
                                  </svg>
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                  {skill.students} students
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-3">{skill.description}</p>
                            <div className="flex justify-between items-center">
                              <div>
                                <span className={skill.isPaid ? "font-medium" : "text-green-600 font-medium"}>
                                  {skill.isPaid ? `$${skill.price} USD` : "Free"}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
