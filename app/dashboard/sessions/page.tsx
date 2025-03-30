"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video } from "lucide-react"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export default function SessionsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Mock data for demonstration
  const upcomingSessions = [
    {
      id: "1",
      title: "JavaScript Basics",
      with: "John Doe",
      date: "2025-04-02T14:00:00",
      duration: 60,
      isPaid: true,
      price: 25,
    },
    {
      id: "2",
      title: "React Hooks Deep Dive",
      with: "Jane Smith",
      date: "2025-04-05T10:30:00",
      duration: 90,
      isPaid: true,
      price: 35,
    },
  ]

  const pastSessions = [
    {
      id: "3",
      title: "CSS Grid Layout",
      with: "Mike Johnson",
      date: "2025-03-25T15:00:00",
      duration: 60,
      isPaid: false,
      reviewed: true,
    },
    {
      id: "4",
      title: "Node.js Fundamentals",
      with: "Sarah Williams",
      date: "2025-03-20T11:00:00",
      duration: 120,
      isPaid: true,
      price: 40,
      reviewed: false,
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Sessions</h2>
        <p className="text-muted-foreground">Manage your upcoming and past skill exchange sessions.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((session) => (
                <Card key={session.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{session.title}</CardTitle>
                      {session.isPaid ? (
                        <Badge className="bg-green-500 hover:bg-green-600">${session.price}</Badge>
                      ) : (
                        <Badge variant="secondary">Free</Badge>
                      )}
                    </div>
                    <CardDescription>Session with {session.with}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(session.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{formatTime(session.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{session.duration} minutes</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button className="gap-2">
                          <Video className="h-4 w-4" /> Join Session
                        </Button>
                        <Button variant="outline">Reschedule</Button>
                        <Button variant="outline" className="text-destructive">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Upcoming Sessions</CardTitle>
                  <CardDescription>You don't have any scheduled sessions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    When you schedule a session with another user, it will appear here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastSessions.length > 0 ? (
              pastSessions.map((session) => (
                <Card key={session.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{session.title}</CardTitle>
                      {session.isPaid ? (
                        <Badge className="bg-green-500 hover:bg-green-600">${session.price}</Badge>
                      ) : (
                        <Badge variant="secondary">Free</Badge>
                      )}
                    </div>
                    <CardDescription>Session with {session.with}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(session.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{formatTime(session.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{session.duration} minutes</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!session.reviewed && <Button>Leave Review</Button>}
                        <Button variant="outline">View Recording</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Past Sessions</CardTitle>
                  <CardDescription>You haven't completed any sessions yet.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    After you complete a session, it will appear here for you to review.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>View and schedule your sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarComponent mode="single" selected={date} onSelect={setDate} className="rounded-md border" />

            <div className="mt-4 space-y-2">
              <h3 className="font-medium">Sessions on {date?.toLocaleDateString()}</h3>
              {upcomingSessions.some((session) => new Date(session.date).toDateString() === date?.toDateString()) ? (
                upcomingSessions
                  .filter((session) => new Date(session.date).toDateString() === date?.toDateString())
                  .map((session) => (
                    <div key={session.id} className="rounded-lg border p-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{session.title}</p>
                        <p className="text-sm">{formatTime(session.date)}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">With {session.with}</p>
                    </div>
                  ))
              ) : (
                <p className="text-sm text-muted-foreground">No sessions scheduled for this day.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

