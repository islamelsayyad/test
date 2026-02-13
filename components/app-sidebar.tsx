"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FlaskConical,
  Calendar,
  Wrench,
  Users,
  UsersRound,
  FileText,
  Palmtree,
  Settings,
  LogOut,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

const moduleItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Laboratories", url: "/labs", icon: FlaskConical },
  { title: "Scheduling", url: "/scheduling", icon: Calendar, badge: 3 },
  { title: "Equipment", url: "/equipment", icon: Wrench, badge: 86 },
  { title: "Researchers", url: "/users", icon: Users },
  { title: "Cohorts", url: "/groups", icon: UsersRound, badge: 9 },
  { title: "Policies", url: "/allowance", icon: FileText },
  { title: "Holidays", url: "/holidays", icon: Palmtree },
]

const systemItems = [
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="p-5 pb-4">
        <Link href="/dashboard" className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg transition-colors hover:bg-sidebar-accent">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <FlaskConical className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold tracking-tight text-sidebar-primary-foreground leading-none">LabNexus</p>
            <p className="text-[10px] text-sidebar-foreground/50 mt-0.5">Research OS</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/40 mb-1">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {moduleItems.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/")
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive} 
                      tooltip={item.title}
                      className={`h-9 rounded-lg px-3 transition-all duration-200 ${
                        isActive 
                          ? "bg-accent text-accent-foreground font-medium shadow-sm" 
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      <Link href={item.url} className="flex items-center gap-2.5">
                        <item.icon className={`h-4 w-4 ${isActive ? "text-accent-foreground" : "text-sidebar-foreground/60"}`} />
                        <span className="text-[13px]">{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className={`ml-auto h-5 min-w-5 justify-center px-1.5 rounded-full text-[10px] font-medium shadow-none border-none ${isActive ? 'bg-accent-foreground/20 text-accent-foreground' : 'bg-sidebar-accent text-sidebar-foreground/70'}`}>
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="px-3 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/40 mb-1">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {systemItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive} 
                      tooltip={item.title}
                      className={`h-9 rounded-lg px-3 transition-all duration-200 ${
                        isActive 
                          ? "bg-accent text-accent-foreground font-medium shadow-sm" 
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      <Link href={item.url} className="flex items-center gap-2.5">
                        <item.icon className={`h-4 w-4 ${isActive ? "text-accent-foreground" : "text-sidebar-foreground/60"}`} />
                        <span className="text-[13px]">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-9 rounded-lg px-3 text-sidebar-foreground/60 hover:bg-destructive/10 hover:text-red-400 transition-all duration-200">
              <Link href="/">
                <LogOut className="h-4 w-4" />
                <span className="text-[13px]">Sign Out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
