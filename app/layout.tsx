import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppwriteAuthProvider } from "@/lib/appwrite-auth-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Skill Swap Marketplace",
  description: "Exchange, teach, or learn skills for free or paid",
  generator: 'v0.dev'
}

function RootLayoutInner({ children }: { children: React.ReactNode }) {
  return (
    <AppwriteAuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <Toaster />
      </ThemeProvider>
    </AppwriteAuthProvider>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RootLayoutInner>
          {children}
        </RootLayoutInner>
      </body>
    </html>
  )
}



import './globals.css'