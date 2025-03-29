
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    content: "SkillSwap has completely transformed how I learn. I've been able to master Spanish by teaching programming in return. The community is incredibly supportive!",
    name: "Emily Chen",
    role: "Software Developer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    rating: 5
  },
  {
    id: 2,
    content: "As a music teacher, I wanted to learn graphic design but couldn't afford expensive courses. Here, I exchanged piano lessons for design tutorials. Win-win!",
    name: "Marcus Johnson",
    role: "Piano Teacher",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    rating: 5
  },
  {
    id: 3,
    content: "The platform is intuitive and the messaging system makes it easy to coordinate lessons. I've learned three new skills in just two months!",
    name: "Sophia Rodriguez",
    role: "Marketing Specialist",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">What Our Community Says</h2>
          <p className="mt-4 text-xl text-gray-500">Hear from members who have experienced the power of skill exchange</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-gradient-to-br from-white to-accent/30 p-8 rounded-lg shadow-sm flex flex-col"
            >
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 flex-grow">"{testimonial.content}"</p>
              
              <div className="flex items-center mt-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
