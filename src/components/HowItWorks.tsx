
import { 
  UserPlus, Search, MessageSquare, Award 
} from "lucide-react";

const steps = [
  {
    title: "Create an Account",
    description: "Sign up and build your profile highlighting your skills and what you want to learn.",
    icon: <UserPlus className="h-10 w-10" />
  },
  {
    title: "Find Skills",
    description: "Browse through available skills or search for specific topics that interest you.",
    icon: <Search className="h-10 w-10" />
  },
  {
    title: "Connect & Learn",
    description: "Send requests to connect with teachers and start learning through our platform.",
    icon: <MessageSquare className="h-10 w-10" />
  },
  {
    title: "Share & Grow",
    description: "Teach others what you're good at and earn recognition in our community.",
    icon: <Award className="h-10 w-10" />
  }
];

const HowItWorks = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">How SkillSwap Works</h2>
          <p className="mt-4 text-xl text-gray-500">Simple steps to start sharing knowledge and learning new skills</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-6 text-primary">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              <div className="mt-6 text-primary font-bold text-xl">
                Step {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
