import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CategorySection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">User Categories</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform has three user categories to accommodate different skill exchange preferences.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Badge className="w-fit bg-blue-500 hover:bg-blue-600">Category 1</Badge>
              <CardTitle className="text-xl">Skill Exchangers</CardTitle>
              <CardDescription>Exchange skills for free or paid with other users</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Teach and learn from others</li>
                <li>Set your own rates or exchange for free</li>
                <li>Connect with Category 1 & 3 users</li>
                <li>Build a reputation through reviews</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Badge className="w-fit bg-green-500 hover:bg-green-600">Category 2</Badge>
              <CardTitle className="text-xl">Paid Tutors</CardTitle>
              <CardDescription>Provide skills exclusively for payment</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Monetize your expertise</li>
                <li>Set competitive rates</li>
                <li>Access premium features</li>
                <li>Verified skill validation</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Badge className="w-fit bg-purple-500 hover:bg-purple-600">Category 3</Badge>
              <CardTitle className="text-xl">Learners</CardTitle>
              <CardDescription>Access both paid & free skills</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Learn from experienced users</li>
                <li>Choose free or paid options</li>
                <li>Track your learning progress</li>
                <li>Upgrade to Category 1 anytime</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

