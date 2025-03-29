
export type UserRole = "teacher" | "learner" | "both";
export type SkillCategory = 
  | "programming" 
  | "languages" 
  | "music" 
  | "cooking" 
  | "design" 
  | "business" 
  | "fitness" 
  | "art" 
  | "academic"
  | "other";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: UserRole;
  skills: string[];
  interests: string[];
  rating: number;
  createdAt: string;
};

export type Skill = {
  id: string;
  title: string;
  description: string;
  category: SkillCategory;
  price: number | null;
  isPaid: boolean;
  owner: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  rating: number;
  reviews: Review[];
  createdAt: string;
};

export type Review = {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type RequestStatus = "pending" | "accepted" | "rejected" | "completed";

export type Request = {
  id: string;
  skill: {
    id: string;
    title: string;
  };
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  receiver: {
    id: string;
    name: string;
    avatar?: string;
  };
  message: string;
  status: RequestStatus;
  createdAt: string;
};

export type Message = {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  receiver: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
  isRead: boolean;
};

export type Conversation = {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  lastMessage?: {
    content: string;
    createdAt: string;
    senderId: string;
  };
  unreadCount: number;
};
