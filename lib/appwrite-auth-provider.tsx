"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { Client, Account, Models, ID } from "appwrite"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

const account = new Account(client)

type User = Models.User<Models.Preferences>

interface AppwriteContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  googleLogin: () => Promise<void>
  githubLogin: () => Promise<void>
  guestLogin: () => Promise<void>
}

const AppwriteContext = createContext<AppwriteContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  googleLogin: async () => {},
  githubLogin: async () => {},
  guestLogin: async () => {},
})

export function AppwriteAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.getSession('current')
        if (session) {
          const currentUser = await account.get()
          setUser(currentUser)
        }
      } catch (error) {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      await account.createSession(email, password)
      const user = await account.get()
      setUser(user)
      router.push('/dashboard')
    } catch (error: any) {
      toast.error("Login failed: " + (error.message || "Please check your credentials"))
      throw error
    }
  }

  const logout = async () => {
    try {
      await account.deleteSession('current')
      setUser(null)
      router.push('/auth/login')
    } catch (error: any) {
      toast.error("Logout failed: " + error.message)
      console.error('Logout error:', error)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      await account.create(ID.unique(), email, password, name)
      await login(email, password)
    } catch (error: any) {
      if (error.type === 'user_already_exists') {
        toast.error("An account with this email already exists. Please try logging in instead.")
      } else {
        toast.error("Registration failed: " + error.message)
      }
      throw error
    }
  }

  const googleLogin = async () => {
    try {
      alert()
      // Delete any existing session first
      try {
        await account.deleteSession('current')
      } catch (error) {
        // Ignore error if no session exists
      }

      // Redirect to Google OAuth
      const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
      const failureUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/login?error=account_exists`

      // Use the correct OAuth endpoint
      const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1'
      const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
      window.location.href = `${endpoint}/account/oauth2/google?project=${projectId}&success=${encodeURIComponent(redirectUrl)}&failure=${encodeURIComponent(failureUrl)}&scopes=profile,email`
    } catch (error: any) {
      toast.error("Google login failed: " + error.message)
      console.error('Google login error:', error)
    }
  }

  const githubLogin = async () => {
    try {
      // Delete any existing session first
      try {
        await account.deleteSession('current')
      } catch (error) {
        // Ignore error if no session exists
      }

      // Redirect to GitHub OAuth
      const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
      const failureUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/login?error=account_exists`

      // Use the correct OAuth endpoint
      const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1'
      const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
      window.location.href = `${endpoint}/account/oauth2/github?project=${projectId}&success=${encodeURIComponent(redirectUrl)}&failure=${encodeURIComponent(failureUrl)}&scopes=user:email`
    } catch (error: any) {
      toast.error("GitHub login failed: " + error.message)
      console.error('GitHub login error:', error)
    }
  }

  const guestLogin = async () => {
    try {
      // First, try to delete any existing session first
      try {
        await account.deleteSession('current')
      } catch (error) {
        // Ignore error if no session exists
      }

      // Create anonymous session
      await account.createAnonymousSession()
      const user = await account.get()
      setUser(user)
      router.push('/dashboard')
    } catch (error: any) {
      toast.error("Guest login failed: " + error.message)
      console.error('Guest login error:', error)
      throw error
    }
  }

  return (
    <AppwriteContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        register,
        googleLogin,
        githubLogin,
        guestLogin,
      }}
    >
      {children}
    </AppwriteContext.Provider>
  )
}

export const useAppwrite = () => {
  const context = useContext(AppwriteContext)
  if (!context) {
    throw new Error("useAppwrite must be used within an AppwriteAuthProvider")
  }
  return context
} 