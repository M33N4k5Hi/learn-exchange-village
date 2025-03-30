import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TestimonialSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Users Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from people who have successfully exchanged skills on our platform.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          <Card className="border-0 bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2 text-center">
                  <h3 className="font-bold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Web Developer</p>
                  <p className="text-sm">
                    "I taught JavaScript and learned graphic design in return. The platform made it easy to connect and
                    schedule sessions."
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 fill-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </CardFooter>
          </Card>
          <Card className="border-0 bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="space-y-2 text-center">
                  <h3 className="font-bold">Jane Smith</h3>
                  <p className="text-sm text-muted-foreground">Language Tutor</p>
                  <p className="text-sm">
                    "As a Category 2 user, I've been able to monetize my language skills while helping others learn
                    Spanish."
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 fill-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </CardFooter>
          </Card>
          <Card className="border-0 bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div className="space-y-2 text-center">
                  <h3 className="font-bold">Mike Johnson</h3>
                  <p className="text-sm text-muted-foreground">Photography Enthusiast</p>
                  <p className="text-sm">
                    "I started as a Category 3 learner and now I'm exchanging photography skills with others. The
                    gamification keeps me engaged!"
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <div className="flex space-x-1">
                {[...Array(4)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 fill-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
                <svg
                  className="h-4 w-4 fill-muted stroke-muted-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

