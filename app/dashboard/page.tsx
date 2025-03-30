"use client"

import { useEffect, useState } from "react"
import { useAppwrite } from "@/lib/appwrite-auth-provider"
import { type Skill, type SkillRequest } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen, Calendar, MessageSquare, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function DashboardPage() {
  const { user, logout } = useAppwrite()
  const [skills, setSkills] = useState<Skill[]>([])
  const [requests, setRequests] = useState<SkillRequest[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: Implement skill and request fetching
        setSkills([])
        setRequests([])
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        toast.error("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchData()
    }
  }, [user])

  const pendingRequests = requests.filter((request) => request.status === "pending")

  const getCategoryName = () => {
    const isGuest = user?.$id.includes('anonymous')
    if (isGuest) return "Guest User"
    return "Member" // You can expand this based on your user roles
  }

  const getCategoryColor = () => {
    const isGuest = user?.$id.includes('anonymous')
    if (isGuest) return "bg-yellow-500"
    return "bg-blue-500"
  }

  if (!user) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={`${getCategoryColor()} hover:${getCategoryColor()}`}>
            {getCategoryName()}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Skills</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skills.length}</div>
            <p className="text-xs text-muted-foreground">
              {skills.length > 0 ? `${skills.filter((s) => s.isPaid).length} paid skills` : "Add your first skill"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests.length}</div>
            <p className="text-xs text-muted-foreground">
              {pendingRequests.length > 0 ? "Waiting for your response" : "No pending requests"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No upcoming sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No unread messages</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Welcome, {user.name}!</CardTitle>
              <CardDescription>
                {user.$id.includes('anonymous') 
                  ? "You are currently browsing as a guest user" 
                  : "You are logged in with a full account"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.$id.includes('anonymous') ? (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-yellow-800">
                      As a guest user, you have limited access to features. 
                      Create an account to unlock full functionality!
                    </p>
                  </div>
                ) : (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800">
                      You have full access to all features!
                    </p>
                  </div>
                )}
                <Button 
                  variant="destructive" 
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent actions on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-blue-500/10 p-2">
                      <Users className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm">You joined as {getCategoryName()}</p>
                      <p className="text-xs text-muted-foreground">Just now</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks you can perform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Link href="/dashboard/skills/add">
                    <Button className="w-full" variant="outline">
                      Add a New Skill
                    </Button>
                  </Link>
                  <Link href="/dashboard/explore">
                    <Button className="w-full" variant="outline">
                      Explore Skills
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Skills</CardTitle>
                <CardDescription>Skills you can teach or exchange</CardDescription>
              </div>
              <Link href="/dashboard/skills/add">
                <Button>Add Skill</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {skills.length > 0 ? (
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <h4 className="font-medium">{skill.name}</h4>
                        <p className="text-sm text-muted-foreground">{skill.description}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline">{skill.level}</Badge>
                          {skill.isPaid ? (
                            <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>
                          ) : (
                            <Badge variant="secondary">Free</Badge>
                          )}
                        </div>
                      </div>
                      <Link href={`/dashboard/skills/${skill.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No skills added yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Add skills that you can teach or exchange with others.
                  </p>
                  <Link href="/dashboard/skills/add" className="mt-4">
                    <Button>Add Your First Skill</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skill Requests</CardTitle>
              <CardDescription>Requests from users who want to learn from you</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingRequests.length > 0 ? (
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="rounded-lg border p-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Request from User ID: {request.fromUserId}</h4>
                          <Badge variant="outline">Pending</Badge>
                        </div>
                        <p className="text-sm">{request.message}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline">Skill ID: {request.skillId}</Badge>
                          {request.isPaid ? (
                            <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>
                          ) : (
                            <Badge variant="secondary">Free</Badge>
                          )}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <Button size="sm">
                            Approve
                          </Button>
                          <Button variant="outline" size="sm">
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Users className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No pending requests</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    When someone requests to learn from you, it will appear here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

