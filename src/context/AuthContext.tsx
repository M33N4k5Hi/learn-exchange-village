
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development
const mockUser: User = {
  id: "user-1",
  name: "Jane Doe",
  email: "jane@example.com",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
  bio: "I'm a software developer with a passion for teaching others how to code. I also enjoy learning new languages in my spare time.",
  role: "both",
  skills: ["JavaScript", "React", "Node.js", "Spanish"],
  interests: ["French", "Piano", "Watercolor Painting"],
  rating: 4.8,
  createdAt: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading user data
  useEffect(() => {
    const loadUser = async () => {
      try {
        // In a real app, this would be an API call to validate the token
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // For development only - comment this out in production
          setUser(mockUser);
          localStorage.setItem("user", JSON.stringify(mockUser));
        }
      } catch (error) {
        console.error("Failed to load user", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to authenticate
      // For now, we'll just set the mock user
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to register
      const newUser = {
        ...mockUser,
        name,
        email,
      };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to update the user profile
      const updatedUser = { ...user, ...data } as User;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Profile update failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
