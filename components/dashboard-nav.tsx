"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Search, MessageSquare, Calendar, Settings, Users, BookOpen, Award } from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Explore Skills",
    href: "/dashboard/explore",
    icon: Search,
  },
  {
    title: "My Skills",
    href: "/dashboard/skills",
    icon: BookOpen,
  },
  {
    title: "Requests",
    href: "/dashboard/requests",
    icon: Users,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    title: "Sessions",
    href: "/dashboard/sessions",
    icon: Calendar,
  },
  {
    title: "Achievements",
    href: "/dashboard/achievements",
    icon: Award,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2 py-4">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn("w-full justify-start gap-2", pathname === item.href && "bg-muted")}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  )
}

