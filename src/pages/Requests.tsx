
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Request, RequestStatus } from "../types";

// Mock data for the requests
const mockRequests: Request[] = [
  {
    id: "req-1",
    skill: {
      id: "skill-1",
      title: "JavaScript Programming",
    },
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
    message: "I'm interested in learning JavaScript to build web applications. I have some basic programming knowledge but haven't used JavaScript before.",
    status: "pending",
    createdAt: "2023-09-15T14:30:00Z",
  },
  {
    id: "req-2",
    skill: {
      id: "skill-2",
      title: "Spanish Conversation",
    },
    sender: {
      id: "user-3",
      name: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    },
    receiver: {
      id: "user-1",
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    },
    message: "Hola! I would like to practice Spanish conversation with a native speaker. I'm at an intermediate level.",
    status: "accepted",
    createdAt: "2023-09-16T10:15:00Z",
  },
  {
    id: "req-3",
    skill: {
      id: "skill-3",
      title: "Piano Basics",
    },
    sender: {
      id: "user-1",
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    },
    receiver: {
      id: "user-6",
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
    message: "I've always wanted to learn piano. I don't have any musical background but I'm very motivated to learn.",
    status: "completed",
    createdAt: "2023-09-10T09:45:00Z",
  },
  {
    id: "req-4",
    skill: {
      id: "skill-4",
      title: "Digital Illustration",
    },
    sender: {
      id: "user-5",
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126",
    },
    receiver: {
      id: "user-1",
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    },
    message: "I would like to learn digital illustration for my graphic design projects. I have experience with Photoshop but not with illustration specifically.",
    status: "rejected",
    createdAt: "2023-09-18T16:30:00Z",
  },
];

const statusColors: Record<RequestStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

const statusIcons: Record<RequestStatus, React.ReactNode> = {
  pending: <Clock className="h-4 w-4" />,
  accepted: <CheckCircle className="h-4 w-4" />,
  rejected: <XCircle className="h-4 w-4" />,
  completed: <CheckCircle className="h-4 w-4" />,
};

const Requests = () => {
  const [requests] = useState<Request[]>(mockRequests);
  const [activeTab, setActiveTab] = useState<"received" | "sent">("received");
  const { toast } = useToast();

  const receivedRequests = requests.filter(req => req.receiver.id === "user-1");
  const sentRequests = requests.filter(req => req.sender.id === "user-1");

  const handleAccept = (requestId: string) => {
    // In a real app, this would call an API
    toast({
      title: "Request accepted",
      description: "You have accepted the skill request.",
    });
  };

  const handleReject = (requestId: string) => {
    // In a real app, this would call an API
    toast({
      title: "Request rejected",
      description: "You have rejected the skill request.",
    });
  };

  const handleMessage = (userName: string) => {
    toast({
      title: "Message sent",
      description: `Your message has been sent to ${userName}.`,
    });
  };

  const handleComplete = (requestId: string) => {
    toast({
      title: "Request completed",
      description: "The skill exchange has been marked as completed.",
    });
  };

  const renderRequestCard = (request: Request, isReceived: boolean) => (
    <Card key={request.id} className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{request.skill.title}</CardTitle>
            <CardDescription>
              {isReceived 
                ? `Request from ${request.sender.name}` 
                : `Request to ${request.receiver.name}`}
            </CardDescription>
          </div>
          <Badge className={statusColors[request.status]}>
            <span className="flex items-center gap-1">
              {statusIcons[request.status]}
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage src={isReceived ? request.sender.avatar : request.receiver.avatar} />
            <AvatarFallback>
              {isReceived ? request.sender.name.charAt(0) : request.receiver.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">
              {isReceived ? request.sender.name : request.receiver.name}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(request.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700">{request.message}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {isReceived && request.status === "pending" && (
          <>
            <Button 
              variant="outline" 
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => handleReject(request.id)}
            >
              Decline
            </Button>
            <Button onClick={() => handleAccept(request.id)}>
              Accept
            </Button>
          </>
        )}
        
        {request.status === "accepted" && (
          <>
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => handleMessage(isReceived ? request.sender.name : request.receiver.name)}
            >
              <MessageSquare className="h-4 w-4" />
              Message
            </Button>
            {isReceived && (
              <Button onClick={() => handleComplete(request.id)}>
                Mark Complete
              </Button>
            )}
          </>
        )}
        
        {request.status === "completed" && (
          <Button 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={() => handleMessage(isReceived ? request.sender.name : request.receiver.name)}
          >
            <MessageSquare className="h-4 w-4" />
            Message
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Skill Requests</h1>
          
          <Tabs defaultValue="received" onValueChange={(v) => setActiveTab(v as "received" | "sent")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="received">Received Requests</TabsTrigger>
              <TabsTrigger value="sent">Sent Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="received" className="mt-0">
              {receivedRequests.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium">No received requests</h3>
                  <p className="text-gray-500 mt-2">
                    You haven't received any skill requests yet.
                  </p>
                </div>
              ) : (
                receivedRequests.map(request => renderRequestCard(request, true))
              )}
            </TabsContent>
            
            <TabsContent value="sent" className="mt-0">
              {sentRequests.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium">No sent requests</h3>
                  <p className="text-gray-500 mt-2">
                    You haven't sent any skill requests yet.
                  </p>
                </div>
              ) : (
                sentRequests.map(request => renderRequestCard(request, false))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Requests;
