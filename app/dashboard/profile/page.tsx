"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAppwrite, type Skill } from "@/lib/appwrite-provider"

export default function ProfilePage() {
  const { user, updateUser, uploadProfilePhoto, getSkills } = useAppwrite()
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.profilePhotoUrl || null)
  const [userSkills, setUserSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    age: user?.age?.toString() || "",
    gender: user?.gender || "",
    phone: user?.phone || "",
  })

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        if (user) {
          const skills = await getSkills(user.id)
          setUserSkills(skills)
        }
      } catch (error) {
        console.error("Error fetching skills:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [user, getSkills])

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
      
      // Update user profile
      await updateUser({
        name: formData.name,
        bio: formData.bio,
        age: formData.age ? Number.parseInt(formData.age) : undefined,
        gender: formData.gender,
        phone: formData.phone,
      })
      
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsSubmitting(false)
    }

