
import React, { createContext, useContext, useState, useEffect } from "react";
import { Skill, SkillCategory } from "../types";

interface SkillsContextType {
  skills: Skill[];
  featuredSkills: Skill[];
  isLoading: boolean;
  error: string | null;
  searchSkills: (query: string) => Skill[];
  filterByCategory: (category: SkillCategory) => Skill[];
  getSkillById: (id: string) => Skill | undefined;
}

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

// Mock skills for development
const mockSkills: Skill[] = [
  {
    id: "skill-1",
    title: "JavaScript Programming",
    description: "Learn JavaScript from basics to advanced concepts. I'll cover ES6+, async programming, and modern frameworks.",
    category: "programming",
    price: 25,
    isPaid: true,
    owner: {
      id: "user-2",
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      rating: 4.9,
    },
    rating: 4.8,
    reviews: [
      {
        id: "review-1",
        userId: "user-3",
        userName: "Maria Garcia",
        userAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
        rating: 5,
        comment: "Alex is an amazing teacher! I learned so much in just a few sessions.",
        createdAt: "2023-08-15T10:30:00Z",
      }
    ],
    createdAt: "2023-07-01T14:30:00Z",
  },
  {
    id: "skill-2",
    title: "Spanish Conversation",
    description: "Practice your Spanish speaking skills with a native speaker. All levels welcome!",
    category: "languages",
    price: null,
    isPaid: false,
    owner: {
      id: "user-4",
      name: "Sofia Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      rating: 4.7,
    },
    rating: 4.7,
    reviews: [
      {
        id: "review-2",
        userId: "user-5",
        userName: "David Kim",
        userAvatar: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
        rating: 4.5,
        comment: "Sofia is patient and makes learning fun. My Spanish has improved a lot!",
        createdAt: "2023-09-05T15:45:00Z",
      }
    ],
    createdAt: "2023-06-15T09:45:00Z",
  },
  {
    id: "skill-3",
    title: "Piano Basics",
    description: "Start your musical journey with piano fundamentals. I'll teach you notes, scales, and your first songs.",
    category: "music",
    price: 30,
    isPaid: true,
    owner: {
      id: "user-6",
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      rating: 4.8,
    },
    rating: 4.9,
    reviews: [
      {
        id: "review-3",
        userId: "user-7",
        userName: "Emma Wilson",
        userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
        rating: 5,
        comment: "Michael is incredibly talented and a great teacher. Highly recommend!",
        createdAt: "2023-09-10T11:20:00Z",
      }
    ],
    createdAt: "2023-05-20T13:15:00Z",
  },
  {
    id: "skill-4",
    title: "Digital Illustration",
    description: "Learn to create beautiful digital illustrations using Procreate or Adobe Illustrator.",
    category: "design",
    price: 20,
    isPaid: true,
    owner: {
      id: "user-8",
      name: "Olivia Taylor",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      rating: 4.6,
    },
    rating: 4.7,
    reviews: [
      {
        id: "review-4",
        userId: "user-9",
        userName: "James Brown",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
        rating: 4.5,
        comment: "Olivia's teaching style is clear and inspiring. I've created some amazing artwork thanks to her guidance.",
        createdAt: "2023-09-18T14:10:00Z",
      }
    ],
    createdAt: "2023-07-10T16:40:00Z",
  },
  {
    id: "skill-5",
    title: "Healthy Cooking",
    description: "Learn to prepare delicious, nutritious meals on a budget. Includes meal planning and prep tips.",
    category: "cooking",
    price: null,
    isPaid: false,
    owner: {
      id: "user-10",
      name: "Robert Martinez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      rating: 4.9,
    },
    rating: 4.8,
    reviews: [
      {
        id: "review-5",
        userId: "user-11",
        userName: "Sarah Johnson",
        userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
        rating: 5,
        comment: "Robert's recipes are amazing! My family loves everything I've made from his lessons.",
        createdAt: "2023-09-20T09:30:00Z",
      }
    ],
    createdAt: "2023-06-05T10:20:00Z",
  },
  {
    id: "skill-6",
    title: "Yoga for Beginners",
    description: "Start your yoga journey with gentle, accessible poses and breathing techniques for all body types.",
    category: "fitness",
    price: 15,
    isPaid: true,
    owner: {
      id: "user-12",
      name: "Priya Patel",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      rating: 4.9,
    },
    rating: 4.9,
    reviews: [
      {
        id: "review-6",
        userId: "user-13",
        userName: "Thomas Wilson",
        userAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
        rating: 5,
        comment: "Priya is a fantastic teacher, very attentive and supportive. My flexibility has improved so much!",
        createdAt: "2023-09-25T16:15:00Z",
      }
    ],
    createdAt: "2023-08-01T08:30:00Z",
  },
];

export const SkillsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [featuredSkills, setFeaturedSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        // In a real app, this would be an API call
        setSkills(mockSkills);
        // Select a few skills as featured
        setFeaturedSkills(mockSkills.slice(0, 3));
      } catch (err) {
        setError("Failed to fetch skills");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const searchSkills = (query: string): Skill[] => {
    if (!query.trim()) return skills;
    
    const lowercaseQuery = query.toLowerCase();
    return skills.filter(
      skill => 
        skill.title.toLowerCase().includes(lowercaseQuery) || 
        skill.description.toLowerCase().includes(lowercaseQuery)
    );
  };

  const filterByCategory = (category: SkillCategory): Skill[] => {
    return skills.filter(skill => skill.category === category);
  };

  const getSkillById = (id: string): Skill | undefined => {
    return skills.find(skill => skill.id === id);
  };

  return (
    <SkillsContext.Provider
      value={{
        skills,
        featuredSkills,
        isLoading,
        error,
        searchSkills,
        filterByCategory,
        getSkillById,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
};

export const useSkills = () => {
  const context = useContext(SkillsContext);
  if (context === undefined) {
    throw new Error("useSkills must be used within a SkillsProvider");
  }
  return context;
};
