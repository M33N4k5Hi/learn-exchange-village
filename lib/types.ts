import { Models } from 'appwrite'

export type User = Models.User<Models.Preferences>

export interface Skill {
  id: string
  name: string
  description: string
  level: string
  isPaid: boolean
  userId: string
  createdAt: Date
}

export interface SkillRequest {
  id: string
  fromUserId: string
  toUserId: string
  skillId: string
  message: string
  status: 'pending' | 'approved' | 'rejected'
  isPaid: boolean
  createdAt: Date
} 