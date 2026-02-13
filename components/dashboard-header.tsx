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
    <header className="sticky top-0 z-30 flex h-14 items-center px-4 lg:px-6 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="flex items-center gap-3 w-full">
        <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground h-8 w-8 rounded-md transition-colors" />
            <Separator orientation="vertical" className="h-5 hidden md:block" />
            
            <div className="hidden md:block">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        {breadcrumbs?.map((b, i) => (
                            <React.Fragment key={i}>
                                <BreadcrumbSeparator>
                                    <Slash className="h-3.5 w-3.5 text-border -rotate-12" />
                                </BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    {i === breadcrumbs.length - 1 ? (
                                        <BreadcrumbPage className="font-medium text-foreground text-sm">{b.label}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={b.href} className="text-muted-foreground hover:text-foreground text-sm transition-colors">{b.label}</BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
        
        <div className="flex-1 max-w-md mx-auto">
            <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 bg-muted/50 hover:bg-muted rounded-md border border-transparent hover:border-border transition-colors cursor-text h-9">
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Search...</span>
                <kbd className="ml-auto flex items-center gap-0.5 text-[10px] text-muted-foreground font-mono bg-background px-1.5 py-0.5 rounded border border-border">
                    <Command className="h-2.5 w-2.5" />K
                </kbd>
            </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative h-8 w-8 text-muted-foreground hover:text-foreground rounded-md">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 flex h-1.5 w-1.5 rounded-full bg-destructive"></span>
                <span className="sr-only">Notifications</span>
            </Button>
            
            <Link href="/profile">
              <div className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-md hover:bg-muted transition-colors cursor-pointer">
                  <div className="hidden text-right sm:block leading-none">
                      <p className="text-sm font-medium text-foreground">{currentUser.firstName}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{currentUser.role === 'master' ? 'Admin' : currentUser.role}</p>
                  </div>
                  <Avatar className="h-7 w-7 border border-border rounded-full">
                      <AvatarImage src={currentUser.avatar} alt={`${currentUser.firstName} ${currentUser.lastName}`} />
                      <AvatarFallback className="bg-muted text-muted-foreground font-medium text-xs">
                      {currentUser.firstName[0]}
                      </AvatarFallback>
                  </Avatar>
              </div>
            </Link>
        </div>
      </div>
    </header>
  )
}
