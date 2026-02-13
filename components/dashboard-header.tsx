
"use client"

import React from "react"
import { Bell, Search, Command, Slash } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { currentUser } from "@/lib/mock-data"
import Link from "next/link"

interface DashboardHeaderProps {
  title?: string
  breadcrumbs?: { label: string; href?: string }[]
}

export function DashboardHeader({ title, breadcrumbs }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center px-6 lg:px-8 transition-all bg-white/80 backdrop-blur-xl border-b-2 border-slate-200/60 supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center gap-4 md:gap-6 w-full max-w-[1600px] mx-auto">
        <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 h-10 w-10 rounded-xl transition-all" />
            <Separator orientation="vertical" className="h-6 bg-slate-200 hidden md:block" />
            
            {/* Breadcrumbs */}
            <div className="hidden md:block">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard" className="text-slate-500 hover:text-slate-900 font-bold text-xs uppercase tracking-wide transition-colors">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        {breadcrumbs?.map((b, i) => (
                            <React.Fragment key={i}>
                                <BreadcrumbSeparator>
                                    <Slash className="h-3 w-3 text-slate-300 -rotate-12" />
                                </BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    {i === breadcrumbs.length - 1 ? (
                                        <BreadcrumbPage className="font-black text-slate-900 text-sm tracking-tight">{b.label}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={b.href} className="text-slate-500 hover:text-slate-900 font-bold text-xs uppercase tracking-wide transition-colors">{b.label}</BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
        
        {/* Central Search Bar - "Jump to command..." */}
        <div className="flex-1 max-w-md mx-auto">
            <div className="hidden md:flex items-center gap-3 px-4 py-2.5 bg-slate-100/50 hover:bg-white focus-within:bg-white rounded-2xl border-2 border-transparent hover:border-slate-200 focus-within:border-indigo-500/20 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all cursor-text group h-12 shadow-sm">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                  type="text" 
                  className="bg-transparent border-none outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400 w-full"
                  placeholder="Jump to command..."
                />
                <kbd className="ml-auto flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200 text-[10px] text-slate-400 font-black font-mono group-hover:text-slate-500 shadow-sm">
                    <Command className="h-3 w-3" />K
                </kbd>
            </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative h-10 w-10 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border-2 border-transparent hover:border-indigo-100">
                <Bell className="h-5 w-5" />
                <span className="absolute top-3 right-3 flex h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
                <span className="sr-only">Notifications</span>
            </Button>
            
            <div className="pl-2">
                <Link href="/profile">
                <div className="flex items-center gap-3 pl-1 pr-1 py-1 rounded-full hover:bg-slate-100/80 transition-all cursor-pointer group border border-transparent hover:border-slate-200">
                    <div className="hidden text-right sm:block leading-none">
                        <p className="text-sm font-black text-slate-700 group-hover:text-slate-900 transition-colors">{currentUser.firstName}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{currentUser.role === 'master' ? 'Admin' : currentUser.role}</p>
                    </div>
                    <Avatar className="h-9 w-9 border-2 border-white shadow-sm group-hover:scale-105 transition-transform rounded-full ring-1 ring-slate-100">
                        <AvatarImage src={currentUser.avatar} alt={`${currentUser.firstName} ${currentUser.lastName}`} />
                        <AvatarFallback className="bg-slate-900 text-white font-bold text-xs">
                        {currentUser.firstName[0]}
                        </AvatarFallback>
                    </Avatar>
                </div>
                </Link>
            </div>
        </div>
      </div>
    </header>
  )
}
