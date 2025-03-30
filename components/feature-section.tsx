import { BookOpen, MessageCircle, Users, Video } from "lucide-react"

export function FeatureSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need to Exchange Skills</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides all the tools you need to connect with others, share your expertise, and learn new
              skills.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Skill Matching</h3>
            <p className="text-center text-muted-foreground">
              Find people with complementary skills to exchange knowledge.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Real-time Chat</h3>
            <p className="text-center text-muted-foreground">
              Communicate directly with other users to plan your skill exchange.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Video className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Video Sessions</h3>
            <p className="text-center text-muted-foreground">
              Conduct skill exchange sessions through integrated video calls.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Skill Validation</h3>
            <p className="text-center text-muted-foreground">
              Verify your expertise through our skill evaluation system.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

