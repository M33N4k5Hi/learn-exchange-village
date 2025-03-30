"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAppwrite } from "@/lib/appwrite-auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Github, Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Icons } from "@/components/icons"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login, googleLogin, githubLogin, guestLogin } = useAppwrite()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isGuest = searchParams.get('guest') === 'true'

  useEffect(() => {
    if (isGuest) {
      handleGuestLogin()
    }
  }, [isGuest])

  useEffect(() => {
    const error = searchParams.get('error')
    if (error === 'account_exists') {
      toast.error("An account with this email already exists. Please log in with your existing account.")
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await googleLogin()
    } catch (error) {
      console.error('Google login error:', error)
    }
  }

  const handleGithubLogin = async () => {
    try {
      await githubLogin()
    } catch (error) {
      console.error('GitHub login error:', error)
    }
  }

  const handleGuestLogin = async () => {
    try {
      setIsLoading(true)
      await guestLogin()
      router.push('/dashboard')
    } catch (error) {
      console.error('Guest login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isGuest || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>{isGuest ? "Guest Login" : "Logging In"}</CardTitle>
            <CardDescription>
              {isGuest ? "Logging you in as a guest..." : "Processing your login..."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Login to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In
                </Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Button variant="outline" type="button" onClick={handleGoogleLogin}>
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="outline" type="button" onClick={handleGithubLogin}>
                <Icons.gitHub className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" type="button" onClick={handleGuestLogin}>
                <Icons.user className="mr-2 h-4 w-4" />
                Continue as Guest
              </Button>
            </div>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/auth/register" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

