"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppwrite } from "@/lib/appwrite-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SkillSelector } from "@/components/skill-selector"

export default function OnboardingPage() {
  const { user, updateUser, uploadProfilePhoto } = useAppwrite()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.profilePhotoUrl || null)
  const [formData, setFormData] = useState({
    bio: user?.bio || "",
    age: user?.age || "",
    gender: user?.gender || "",
    phone: user?.phone || "",
    skills: [] as string[],
    skillsToLearn: [] as string[],
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setProfilePhoto(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Upload profile photo if selected
      if (profilePhoto) {
        await uploadProfilePhoto(profilePhoto)
      }

      // Determine user category based on skills
      let category = 3 // Default to Learner (Category 3)

      if (formData.skills.length > 0 && formData.skillsToLearn.length > 0) {
        category = 1 // Skill Exchanger (Category 1)
      } else if (formData.skills.length > 0 && formData.skillsToLearn.length === 0) {
        category = 2 // Paid Tutor (Category 2)
      }

      // Update user profile
      await updateUser({
        bio: formData.bio,
        age: formData.age ? Number.parseInt(formData.age) : undefined,
        gender: formData.gender,
        phone: formData.phone,
        category: category as 1 | 2 | 3,
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
          <CardDescription>Tell us more about yourself to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={previewUrl || "/placeholder.svg?height=96&width=96"} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <Label htmlFor="picture" className="cursor-pointer">
                  <div className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
                    <Upload className="h-4 w-4" />
                    Upload Photo
                  </div>
                  <Input id="picture" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </Label>
                {previewUrl && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setProfilePhoto(null)
                      setPreviewUrl(null)
                    }}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Your age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Skills You Have</Label>
                <SkillSelector
                  selectedSkills={formData.skills}
                  onChange={(skills) => setFormData((prev) => ({ ...prev, skills }))}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Skills You Want to Learn</Label>
                <SkillSelector
                  selectedSkills={formData.skillsToLearn}
                  onChange={(skills) => setFormData((prev) => ({ ...prev, skillsToLearn: skills }))}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skillsToLearn.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border p-4 bg-muted/50">
                <h3 className="font-medium mb-2">Your User Category</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Based on your skills selection, you will be categorized as:
                </p>
                {formData.skills.length > 0 && formData.skillsToLearn.length > 0 ? (
                  <Badge className="bg-blue-500 hover:bg-blue-600">Category 1: Skill Exchanger</Badge>
                ) : formData.skills.length > 0 && formData.skillsToLearn.length === 0 ? (
                  <Badge className="bg-green-500 hover:bg-green-600">Category 2: Paid Tutor</Badge>
                ) : (
                  <Badge className="bg-purple-500 hover:bg-purple-600">Category 3: Learner</Badge>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Complete Profile"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

