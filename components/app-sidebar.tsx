
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
  Search as SearchIcon
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
    <Sidebar className="border-none bg-[#F8FAFC]">
      <SidebarHeader className="p-6 pb-2">
        <Link href="/dashboard" className="flex items-center gap-3 group px-2 py-2 rounded-2xl transition-colors">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 shadow-xl shadow-slate-900/20 transition-all group-hover:scale-105 group-hover:bg-indigo-600 group-hover:shadow-indigo-500/30 border-2 border-transparent">
            <FlaskConical className="h-6 w-6 text-white" />
            <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 bg-white rounded-full flex items-center justify-center border-2 border-slate-50">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-xl font-black tracking-tight text-slate-900 leading-none group-hover:text-indigo-900 transition-colors">LabNexus</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1.5 group-hover:text-indigo-400 transition-colors">
              Research OS
            </p>
          </div>
        </Link>
      </SidebarHeader>

      {/* Mobile Search - Visible on Sidebar for style */}
      <div className="px-6 pb-4 md:hidden">
        <button className="flex h-11 w-full items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-3 text-sm text-slate-400 transition-all hover:border-indigo-200 hover:text-slate-600 group active:scale-[0.98] shadow-sm">
          <SearchIcon className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          <span className="font-bold text-xs tracking-wide text-slate-500 group-hover:text-slate-700">Jump to...</span>
        </button>
      </div>

      <SidebarContent className="px-4 gap-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-400/80 mb-2 mt-2">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {moduleItems.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/")
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive} 
                      tooltip={item.title}
                      className={`h-12 rounded-2xl px-4 transition-all duration-300 group/menu-btn border-2 ${
                        isActive 
                          ? "bg-slate-900 text-white font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 border-transparent" 
                          : "text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm font-bold bg-transparent border-transparent hover:border-slate-100"
                      }`}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className={`h-5 w-5 transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover/menu-btn:text-slate-600"}`} />
                        <span className="text-sm tracking-tight">{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className={`ml-auto h-6 min-w-6 justify-center px-1.5 rounded-lg text-[10px] font-black shadow-none border-none ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 group-hover/menu-btn:bg-slate-200'}`}>
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
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-400/80 mb-2">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {systemItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive} 
                      tooltip={item.title}
                      className={`h-12 rounded-2xl px-4 transition-all duration-300 group/menu-btn border-2 ${
                        isActive 
                          ? "bg-slate-900 text-white font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 border-transparent" 
                          : "text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm font-bold bg-transparent border-transparent hover:border-slate-100"
                      }`}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className={`h-5 w-5 transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover/menu-btn:text-slate-600"}`} />
                        <span className="text-sm tracking-tight">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 pt-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-12 rounded-2xl px-4 text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all font-bold hover:shadow-sm group bg-transparent border-2 border-transparent hover:border-rose-100">
              <Link href="/">
                <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm tracking-tight">Sign Out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
