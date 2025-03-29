
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendHorizontal, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Conversation, Message } from "../types";

// Mock conversations
const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    participants: [
      {
        id: "user-1",
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      },
      {
        id: "user-2",
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      },
    ],
    lastMessage: {
      content: "Can we schedule our first JavaScript session for next Monday?",
      createdAt: "2023-09-18T14:30:00Z",
      senderId: "user-2",
    },
    unreadCount: 1,
  },
  {
    id: "conv-2",
    participants: [
      {
        id: "user-1",
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      },
      {
        id: "user-3",
        name: "Maria Garcia",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      },
    ],
    lastMessage: {
      content: "¡Gracias por la clase de hoy! Fue muy útil.",
      createdAt: "2023-09-17T18:15:00Z",
      senderId: "user-1",
    },
    unreadCount: 0,
  },
  {
    id: "conv-3",
    participants: [
      {
        id: "user-1",
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      },
      {
        id: "user-6",
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      },
    ],
    lastMessage: {
      content: "Don't forget to practice those piano scales we went over!",
      createdAt: "2023-09-16T20:45:00Z",
      senderId: "user-6",
    },
    unreadCount: 2,
  },
];

// Mock messages for conversation 1
const mockMessages: Message[] = [
  {
    id: "msg-1",
    sender: {
      id: "user-2",
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    },
    receiver: {
      id: "user-1",
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    },
    content: "Hi John, thanks for signing up for my JavaScript lessons. What's your current experience level?",
    createdAt: "2023-09-17T10:30:00Z",
    isRead: true,
  },
  {
    id: "msg-2",
    sender: {
      id: "user-1",
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    },
    receiver: {
      id: "user-2",
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    },
    content: "Hi Alex! I've dabbled a bit with HTML and CSS, but JavaScript is fairly new to me. I understand some programming concepts from Python though.",
    createdAt: "2023-09-17T10:35:00Z",
    isRead: true,
  },
  {
    id: "msg-3",
    sender: {
      id: "user-2",
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    },
    receiver: {
      id: "user-1",
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    },
    content: "That's a great starting point! We'll begin with the basics and build up from there. When would you like to have our first session?",
    createdAt: "2023-09-17T10:40:00Z",
    isRead: true,
  },
  {
    id: "msg-4",
    sender: {
      id: "user-1",
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    },
    receiver: {
      id: "user-2",
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    },
    content: "Would sometime next week work? I'm pretty flexible on Monday and Wednesday afternoons.",
    createdAt: "2023-09-17T10:45:00Z",
    isRead: true,
  },
  {
    id: "msg-5",
    sender: {
      id: "user-2",
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    },
    receiver: {
      id: "user-1",
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    },
    content: "Monday works great for me. Shall we say 3pm? We'll need about 90 minutes for the first session.",
    createdAt: "2023-09-17T11:00:00Z",
    isRead: true,
  },
  {
    id: "msg-6",
    sender: {
      id: "user-2",
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    },
    receiver: {
      id: "user-1",
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    },
    content: "Can we schedule our first JavaScript session for next Monday?",
    createdAt: "2023-09-18T14:30:00Z",
    isRead: false,
  },
];

const MessagesPage = () => {
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [messages] = useState<Message[]>(mockMessages);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // In a real app, this would send an API request
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
    });
    
    setNewMessage("");
  };

  const getOtherParticipant = (conversation: Conversation) => {
    return conversation.participants.find(p => p.id !== "user-1") || conversation.participants[0];
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="h-[calc(100vh-64px-64px)] max-h-[calc(100vh-64px-64px)] flex">
          {/* Conversations sidebar */}
          <div className="w-full max-w-xs border-r border-gray-200 bg-white flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search conversations..."
                  className="pl-10"
                />
              </div>
            </div>
            
            <ScrollArea className="flex-grow">
              {conversations.map((conversation) => {
                const otherParticipant = getOtherParticipant(conversation);
                const isSelected = selectedConversation?.id === conversation.id;
                
                return (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      isSelected ? "bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={otherParticipant.avatar} />
                          <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conversation.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium truncate">{otherParticipant.name}</h3>
                          {conversation.lastMessage && (
                            <span className="text-xs text-gray-500">
                              {formatTime(conversation.lastMessage.createdAt)}
                            </span>
                          )}
                        </div>
                        {conversation.lastMessage && (
                          <p className={`text-sm truncate ${
                            conversation.unreadCount > 0 ? "font-medium text-gray-900" : "text-gray-500"
                          }`}>
                            {conversation.lastMessage.senderId === "user-1" ? "You: " : ""}
                            {conversation.lastMessage.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollArea>
          </div>
          
          {/* Chat area */}
          {selectedConversation ? (
            <div className="flex-grow flex flex-col">
              {/* Chat header */}
              <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={getOtherParticipant(selectedConversation).avatar} />
                  <AvatarFallback>{getOtherParticipant(selectedConversation).name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium">{getOtherParticipant(selectedConversation).name}</h2>
                </div>
              </div>
              
              {/* Messages */}
              <ScrollArea className="flex-grow p-4 bg-gray-50">
                <div className="space-y-4">
                  {messages.map((message, i) => {
                    const isUserMessage = message.sender.id === "user-1";
                    const showDate = i === 0 || formatDate(messages[i-1].createdAt) !== formatDate(message.createdAt);
                    
                    return (
                      <div key={message.id}>
                        {showDate && (
                          <div className="text-center my-4">
                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                              {formatDate(message.createdAt)}
                            </span>
                          </div>
                        )}
                        <div className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}>
                          <div className="flex items-end gap-2 max-w-[70%]">
                            {!isUserMessage && (
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={message.sender.avatar} />
                                <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )}
                            <div>
                              <div
                                className={`p-3 rounded-lg ${
                                  isUserMessage
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-white border border-gray-200"
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatTime(message.createdAt)}
                              </p>
                            </div>
                            {isUserMessage && (
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={message.sender.avatar} />
                                <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
              
              {/* Message input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-grow"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    size="icon"
                  >
                    <SendHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center bg-gray-50">
              <div className="text-center p-6">
                <h2 className="text-xl font-semibold mb-2">No conversation selected</h2>
                <p className="text-gray-500">Select a conversation from the sidebar to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MessagesPage;
