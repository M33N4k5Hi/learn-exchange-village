import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Share Your Skills, Grow Together
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join our community to exchange skills, teach others, and learn something new. Connect with people who
                share your interests and expand your knowledge.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/auth/register">
                <Button size="lg" className="w-full">
                  Get Started
                </Button>
              </Link>
              <Link href="/explore">
                <Button size="lg" variant="outline" className="w-full">
                  Explore Skills
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              alt="Skill Swap Marketplace"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="310"
              src="/placeholder.svg?height=620&width=620"
              width="550"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

