"use client"

import { useEffect, useState } from "react"
import { useAppwrite, type SkillRequest } from "@/lib/appwrite-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Users } from "lucide-react"

export default function RequestsPage() {
  const { user, getSkillRequests, updateSkillRequestStatus } = useAppwrite()
  const [sentRequests, setSentRequests] = useState<SkillRequest[]>([])
  const [receivedRequests, setReceivedRequests] = useState<SkillRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (user) {
          const [sent, received] = await Promise.all([
            getSkillRequests(user.id, "sent"),
            getSkillRequests(user.id, "received"),
          ])
          setSentRequests(sent)
          setReceivedRequests(received)
        }
      } catch (error) {
        console.error("Error fetching requests:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [user, getSkillRequests])

  const handleUpdateStatus = async (requestId: string, status: "approved" | "rejected") => {
    setActionLoading(requestId)

    try {
      await updateSkillRequestStatus(requestId, status)

      // Update local state
      setReceivedRequests((prev) =>
        prev.map((request) => (request.id === requestId ? { ...request, status } : request)),
      )
    } catch (error) {
      console.error(`Error ${status} request:`, error)
    } finally {
      setActionLoading(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "approved":
        return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Skill Requests</h2>
        <p className="text-muted-foreground">Manage your sent and received skill exchange requests.</p>
      </div>

      <Tabs defaultValue="received" className="space-y-4">
        <TabsList>
          <TabsTrigger value="received">Received Requests</TabsTrigger>
          <TabsTrigger value="sent">Sent Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Requests From Others</CardTitle>
              <CardDescription>People who want to learn from you</CardDescription>
            </CardHeader>
            <CardContent>
              {receivedRequests.length > 0 ? (
                <div className="space-y-4">
                  {receivedRequests.map((request) => (
                    <div key={request.id} className="rounded-lg border p-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <h4 className="font-medium">From: {request.fromUserId.substring(0, 8)}...</h4>
                          </div>
                          {getStatusBadge(request.status)}
                        </div>
                        <p className="text-sm">{request.message}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline">Skill ID: {request.skillId.substring(0, 8)}...</Badge>
                          {request.isPaid ? (
                            <Badge className="bg-green-500 hover:bg-green-600">${request.price}/hr</Badge>
                          ) : (
                            <Badge variant="secondary">Free</Badge>
                          )}
                          <Badge variant="outline">Schedule: {request.preferredSchedule}</Badge>
                        </div>

                        {request.status === "pending" && (
                          <div className="flex gap-2 mt-2">
                            <Button
                              size="sm"
                              onClick={() => handleUpdateStatus(request.id, "approved")}
                              disabled={actionLoading === request.id}
                            >
                              {actionLoading === request.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Approve"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateStatus(request.id, "rejected")}
                              disabled={actionLoading === request.id}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Users className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No requests received</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    When someone requests to learn from you, it will appear here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Sent Requests</CardTitle>
              <CardDescription>Requests you've sent to learn from others</CardDescription>
            </CardHeader>
            <CardContent>
              {sentRequests.length > 0 ? (
                <div className="space-y-4">
                  {sentRequests.map((request) => (
                    <div key={request.id} className="rounded-lg border p-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <h4 className="font-medium">To: {request.toUserId.substring(0, 8)}...</h4>
                          </div>
                          {getStatusBadge(request.status)}
                        </div>
                        <p className="text-sm">{request.message}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline">Skill ID: {request.skillId.substring(0, 8)}...</Badge>
                          {request.isPaid ? (
                            <Badge className="bg-green-500 hover:bg-green-600">${request.price}/hr</Badge>
                          ) : (
                            <Badge variant="secondary">Free</Badge>
                          )}
                          <Badge variant="outline">Schedule: {request.preferredSchedule}</Badge>
                        </div>

                        {request.status === "approved" && (
                          <div className="mt-2">
                            <Button size="sm">Schedule Session</Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Users className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No requests sent</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    When you request to learn from someone, it will appear here.
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

