"use client"

import { useAppwrite } from "@/lib/appwrite-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Award, Star, Trophy, Users, BookOpen, MessageSquare, Calendar } from "lucide-react"

export default function AchievementsPage() {
  const { user } = useAppwrite()

  // Mock achievements data
  const achievements = [
    {
      id: "new-member",
      name: "New Member",
      description: "Joined the SkillSwap platform",
      icon: Users,
      earned: true,
      date: "Just now",
    },
    {
      id: "profile-complete",
      name: "Profile Complete",
      description: "Completed your profile information",
      icon: Star,
      earned: user?.bio ? true : false,
      progress: user?.bio ? 100 : 50,
    },
    {
      id: "first-skill",
      name: "Skill Master",
      description: "Added your first skill",
      icon: BookOpen,
      earned: false,
      progress: 0,
    },
    {
      id: "first-exchange",
      name: "Knowledge Exchange",
      description: "Completed your first skill exchange",
      icon: Calendar,
      earned: false,
      progress: 0,
    },
    {
      id: "first-review",
      name: "Feedback Champion",
      description: "Received your first 5-star review",
      icon: Star,
      earned: false,
      progress: 0,
    },
    {
      id: "messaging",
      name: "Communicator",
      description: "Sent 10 messages",
      icon: MessageSquare,
      earned: false,
      progress: 0,
    },
  ]

  // Mock leaderboard data
  const leaderboard = [
    { id: "1", name: "Jane Smith", xp: 1250, category: 1 },
    { id: "2", name: "John Doe", xp: 980, category: 2 },
    { id: "3", name: "Mike Johnson", xp: 820, category: 1 },
    { id: "4", name: "Sarah Williams", xp: 750, category: 2 },
    { id: "5", name: "David Brown", xp: 620, category: 3 },
  ]

  const getCategoryBadge = (category: number) => {
    switch (category) {
      case 1:
        return <Badge className="bg-blue-500 hover:bg-blue-600">Exchanger</Badge>
      case 2:
        return <Badge className="bg-green-500 hover:bg-green-600">Tutor</Badge>
      case 3:
        return <Badge className="bg-purple-500 hover:bg-purple-600">Learner</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Achievements & Leaderboard</h2>
        <p className="text-muted-foreground">Track your progress and see how you rank against other users.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" /> Your XP
            </CardTitle>
            <CardDescription>Your experience points and level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{user?.xp || 0}</p>
                <p className="text-sm text-muted-foreground">Total XP</p>
              </div>
              <div>
                <p className="text-xl font-medium">Level {Math.floor((user?.xp || 0) / 100) + 1}</p>
                <p className="text-sm text-muted-foreground">{100 - ((user?.xp || 0) % 100)} XP to next level</p>
              </div>
            </div>
            <Progress className="mt-4" value={(user?.xp || 0) % 100} />

            <div className="mt-6 rounded-lg border p-4">
              <h3 className="font-medium">How to earn more XP</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <BookOpen className="h-3 w-3 text-primary" />
                  </div>
                  <span>Add skills (+10 XP each)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Calendar className="h-3 w-3 text-primary" />
                  </div>
                  <span>Complete skill exchanges (+25 XP each)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Star className="h-3 w-3 text-primary" />
                  </div>
                  <span>Receive 5-star reviews (+15 XP each)</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" /> Leaderboard
            </CardTitle>
            <CardDescription>Top users by XP</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboard.map((user, index) => (
                <div key={user.id} className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm font-medium">{user.xp} XP</p>
                    </div>
                    <div className="flex items-center gap-2">{getCategoryBadge(user.category)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" /> Badges & Achievements
          </CardTitle>
          <CardDescription>Milestones you've reached on your journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`rounded-lg border p-4 ${achievement.earned ? "bg-primary/5 border-primary/20" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`rounded-full p-2 ${achievement.earned ? "bg-primary/10" : "bg-muted"}`}>
                    <achievement.icon
                      className={`h-5 w-5 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>

                    {achievement.earned ? (
                      <p className="mt-2 text-xs text-primary">Earned {achievement.date}</p>
                    ) : achievement.progress !== undefined ? (
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-1" />
                      </div>
                    ) : (
                      <p className="mt-2 text-xs text-muted-foreground">Not yet earned</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

