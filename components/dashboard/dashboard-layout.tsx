"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { LayoutDashboard, CheckSquare, Calendar, BarChart3, GitBranch, Menu, X, Sparkles, Settings, Trophy } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const routes = [
    {
      href: "/dashboard",
      label: "仪表盘",
      icon: LayoutDashboard,
    },
    {
      href: "/tasks",
      label: "任务",
      icon: CheckSquare,
    },
    {
      href: "/ai-decompose",
      label: "AI 任务分解",
      icon: Sparkles,
    },
    {
      href: "/calendar",
      label: "日历",
      icon: Calendar,
    },
    {
      href: "/analytics",
      label: "分析",
      icon: BarChart3,
    },
    {
      href: "/achievements",
      label: "成就",
      icon: Trophy,
    },
    {
      href: "/settings",
      label: "设置",
      icon: Settings,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link href="/dashboard" className="flex items-center gap-2">
              <GitBranch className="h-6 w-6" />
              <span className="text-xl font-bold">AutoPlan</span>
            </Link>
          </div>
          <ModeToggle />
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 w-64 transform border-r bg-background pt-16 transition-transform duration-300 ease-in-out md:translate-x-0 md:pt-16",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="space-y-4 py-4">
            <div className="px-4 py-2">
              <h2 className="text-lg font-semibold tracking-tight">导航</h2>
            </div>
            <nav className="space-y-1 px-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === route.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className={cn("flex-1 transition-all duration-300 ease-in-out", sidebarOpen ? "md:ml-64" : "md:ml-64")}>
          <div className="container py-6 md:py-8">{children}</div>
        </main>
      </div>
    </div>
  )
}