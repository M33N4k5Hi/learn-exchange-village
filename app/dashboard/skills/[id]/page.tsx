"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAppwrite, type Skill, type User } from "@/lib/appwrite-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, ArrowLeft, Edit, Trash } from "lucide-react"
import { format } from "date-fns"

export default function SkillDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { getSkills, user, createSkillRequest } = useAppwrite()
  const [skill, setSkill] = useState<Skill | null>(null)
  const [skillOwner, setSkillOwner] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOwner, setIsOwner] = useState(false)
  const [requestDialogOpen, setRequestDialogOpen] = useState(false)
  const [requestData, setRequestData] = useState({
    message: "",
    isPaid: false,
    price: "",
    preferredSchedule: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const skillId = params.id as string

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const skills = await getSkills()
        const foundSkill = skills.find((s) => s.id === skillId)

        if (foundSkill) {
          setSkill(foundSkill)
          setIsOwner(foundSkill.userId === user?.id)
        } else {
          router.push("/dashboard/skills")
        }
      } catch (error) {
        console.error("Error fetching skill:", error)
      } finally {
        setLoading(false)
      }
    }

    if (skillId) {
      fetchSkill()
    }
  }, [skillId, getSkills, router, user])

  const handleRequestSubmit = async () => {
    if (!skill || !user) return

    setIsSubmitting(true)

    try {
      await createSkillRequest({
        fromUserId: user.id,
        toUserId: skill.userId,
        skillId: skill.id,
        message: requestData.message,
        isPaid: skill.isPaid,
        price: skill.price,
        preferredSchedule: requestData.preferredSchedule,
      })

      setRequestDialogOpen(false)
      // Show success message or redirect
    } catch (error) {
      console.error("Error sending request:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!skill) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p>Skill not found</p>
        <Button className="mt-4" onClick={() => router.push("/dashboard/skills")}>
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">{skill.name}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Details</CardTitle>
              <CardDescription>Information about this skill</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Description</h3>
                <p className="mt-1 text-muted-foreground">{skill.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{skill.category}</Badge>
                <Badge variant="outline">{skill.level}</Badge>
                {skill.isPaid ? (
                  <Badge className="bg-green-500 hover:bg-green-600">${skill.price}/hr</Badge>
                ) : (
                  <Badge variant="secondary">Free</Badge>
                )}
              </div>

              <div>
                <h3 className="font-medium">Added on</h3>
                <p className="mt-1 text-sm text-muted-foreground">{format(skill.createdAt, "MMMM d, yyyy")}</p>
              </div>
            </CardContent>
            {isOwner && (
              <CardFooter className="border-t bg-muted/50 flex justify-between">
                <Button variant="outline" className="gap-2">
                  <Edit className="h-4 w-4" /> Edit Skill
                </Button>
                <Button variant="destructive" className="gap-2">
                  <Trash className="h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            )}
          </Card>

          {!isOwner && (
            <Card>
              <CardHeader>
                <CardTitle>Request This Skill</CardTitle>
                <CardDescription>Send a request to learn this skill</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">Send Request</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Request to Learn {skill.name}</DialogTitle>
                      <DialogDescription>
                        Send a request to the skill owner to schedule a learning session.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Introduce yourself and explain why you want to learn this skill"
                          value={requestData.message}
                          onChange={(e) => setRequestData({ ...requestData, message: e.target.value })}
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="schedule">Preferred Schedule</Label>
                        <Select
                          value={requestData.preferredSchedule}
                          onValueChange={(value) => setRequestData({ ...requestData, preferredSchedule: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select preferred time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekday-morning">Weekday Mornings</SelectItem>
                            <SelectItem value="weekday-afternoon">Weekday Afternoons</SelectItem>
                            <SelectItem value="weekday-evening">Weekday Evenings</SelectItem>
                            <SelectItem value="weekend-morning">Weekend Mornings</SelectItem>
                            <SelectItem value="weekend-afternoon">Weekend Afternoons</SelectItem>
                            <SelectItem value="weekend-evening">Weekend Evenings</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {skill.isPaid && (
                        <div className="rounded-lg border p-3 bg-muted/50">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Price per hour</span>
                            <Badge className="bg-green-500 hover:bg-green-600">${skill.price}</Badge>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">
                            You'll be able to make the payment after your request is approved.
                          </p>
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleRequestSubmit} disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                          </>
                        ) : (
                          "Send Request"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Owner</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 font-medium">User ID: {skill.userId.substring(0, 8)}...</h3>
              <p className="mt-1 text-sm text-muted-foreground">{isOwner ? "This is your skill" : "Skill owner"}</p>
              {!isOwner && (
                <Button variant="outline" className="mt-4 w-full">
                  View Profile
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ratings & Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < (skill.rating || 0) ? "fill-primary" : "fill-muted stroke-muted-foreground"
                      }`}
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
                <p className="mt-2 text-sm text-muted-foreground">
                  {skill.rating ? `${skill.rating} out of 5` : "No ratings yet"}
                </p>
              </div>

              <div className="mt-4 rounded-lg border p-4">
                <p className="text-center text-sm text-muted-foreground">
                  No reviews yet. Reviews will appear here after skill exchanges.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

