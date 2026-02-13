"use client"

import React, { useState, useEffect } from "react"
import { Users, FlaskConical, Calendar, AlertTriangle, TrendingUp, TrendingDown, Plus, ArrowRight, Clock, CheckCircle2, MoreHorizontal, Wrench } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { dashboardStats, recentActivities, bookingRequests, equipment as allEquipment, currentUser } from "@/lib/mock-data"
import Link from "next/link"

const kpiCards = [
  {
    title: "Total Users",
    value: dashboardStats.totalUsers,
    subtitle: "Active researchers",
    trend: dashboardStats.usersTrend,
    icon: Users,
    href: "/users",
  },
  {
    title: "Active Labs",
    value: dashboardStats.activeLabs,
    subtitle: "Operational facilities",
    trend: dashboardStats.labsTrend,
    icon: FlaskConical,
    href: "/labs",
  },
  {
    title: "Scheduled Sessions",
    value: dashboardStats.scheduledSessions,
    subtitle: "Upcoming today",
    trend: dashboardStats.sessionsTrend,
    icon: Calendar,
    href: "/scheduling",
  },
  {
    title: "Equipment Alerts",
    value: dashboardStats.equipmentAlerts,
    subtitle: "Attention needed",
    trend: dashboardStats.alertsTrend,
    icon: AlertTriangle,
    href: "/equipment",
  },
]

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 18) return "Good afternoon"
  return "Good evening"
}

export function DashboardContent() {
  const [greeting, setGreeting] = useState("Welcome")
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setGreeting(getGreeting())
    setNow(new Date())
  }, [])

  const pendingBookings = bookingRequests.filter((b) => b.status === "pending")
  const todaySessions = bookingRequests.filter((b) => b.status === "approved")
  const calibrationDue = allEquipment.filter((e) => {
    const cal = new Date(e.nextCalibration)
    const ref = now ?? new Date("2026-02-13")
    const diffDays = (cal.getTime() - ref.getTime()) / (1000 * 60 * 60 * 24)
    return diffDays < 90
  })

  return (
    <div className="flex-1 overflow-auto p-6 lg:p-8">
      {/* Greeting Section */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
              {greeting}, <span className="text-foreground font-medium">{currentUser.firstName}</span>. {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" asChild className="h-9 px-3.5 text-sm font-medium bg-foreground text-background hover:bg-foreground/90">
            <Link href="/labs">
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              New Lab
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild className="h-9 px-3.5 text-sm font-medium">
            <Link href="/equipment">
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add Asset
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi) => (
          <Link href={kpi.href} key={kpi.title}>
            <Card className="group hover:border-foreground/20 transition-colors h-full">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                   <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-muted text-muted-foreground">
                      <kpi.icon className="h-4.5 w-4.5" />
                   </div>
                   <Badge variant="outline" className={`text-[11px] font-medium px-1.5 py-0.5 rounded-md ${kpi.trend > 0 ? "text-emerald-600 border-emerald-200 bg-emerald-50" : kpi.trend < 0 ? "text-destructive border-destructive/20 bg-destructive/5" : "text-muted-foreground"}`}>
                      {kpi.trend > 0 ? <TrendingUp className="mr-0.5 h-3 w-3" /> : kpi.trend < 0 ? <TrendingDown className="mr-0.5 h-3 w-3" /> : null}
                      {Math.abs(kpi.trend)}%
                   </Badge>
                </div>
                <div className="text-2xl font-semibold text-foreground tracking-tight">{kpi.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{kpi.title}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        
        {/* Today's Sessions */}
        <Card className="lg:col-span-1 bg-foreground text-primary-foreground border-foreground overflow-hidden flex flex-col">
          <div className="p-5 h-full flex flex-col">
             <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-lg font-semibold tracking-tight leading-none mb-2">Today{"'"}s Sessions</h3>
                    <div className="inline-flex items-center bg-primary-foreground/10 px-2 py-1 rounded-md text-primary-foreground/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5" />
                        <span className="text-xs">{todaySessions.length} events scheduled</span>
                    </div>
                </div>
                <Link href="/scheduling" className="h-8 w-8 flex items-center justify-center bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-md transition-colors">
                    <ArrowRight className="h-4 w-4 text-primary-foreground" />
                </Link>
             </div>

             <div className="space-y-2 flex-1">
                {todaySessions.slice(0, 3).map((session) => (
                    <div key={session.id} className="flex items-center gap-3 p-2.5 bg-primary-foreground/5 rounded-lg hover:bg-primary-foreground/10 transition-colors">
                        <div className="flex flex-col items-center justify-center w-10 h-10 bg-primary-foreground text-foreground rounded-md shrink-0 leading-none">
                            <span className="text-[9px] font-medium uppercase text-foreground/60">{new Date(session.date).toLocaleDateString("en-US", { month: "short" })}</span>
                            <span className="text-sm font-semibold">{new Date(session.date).getDate()}</span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm truncate text-primary-foreground">{session.purpose}</p>
                            <p className="text-xs text-primary-foreground/50 mt-0.5 flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {session.startTime}
                            </p>
                        </div>
                    </div>
                ))}
                {todaySessions.length === 0 && (
                    <div className="h-full flex items-center justify-center py-8 text-center text-primary-foreground/40 text-sm">
                        No sessions scheduled today
                    </div>
                )}
             </div>
          </div>
        </Card>

        {/* Pending Bookings */}
        <Card className="lg:col-span-1 overflow-hidden flex flex-col">
          <CardHeader className="pb-3 pt-5 px-5 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
                Pending Requests
                {pendingBookings.length > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-foreground text-[10px] font-medium text-background px-1.5">
                    {pendingBookings.length}
                  </span>
                )}
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md text-muted-foreground hover:text-foreground" asChild>
                <Link href="/scheduling"><MoreHorizontal className="h-4 w-4" /></Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-1">
            <div className="space-y-1">
              {pendingBookings.slice(0, 4).map((booking) => (
                <div key={booking.id} className="flex items-center gap-3 p-2.5 hover:bg-muted rounded-md transition-colors cursor-pointer">
                  <Avatar className="h-8 w-8 border border-border rounded-md">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-muted text-muted-foreground font-medium text-[10px] rounded-md">
                      {booking.userName.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground">{booking.userName}</p>
                    <p className="truncate text-xs text-muted-foreground">{booking.labName}</p>
                  </div>
                  <div className="text-right">
                     <span className="block text-[11px] text-muted-foreground">{new Date(booking.date).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</span>
                     <Badge variant="outline" className="mt-0.5 text-[10px] font-medium px-1.5 py-0 rounded">Review</Badge>
                  </div>
                </div>
              ))}
              {pendingBookings.length === 0 && (
                <div className="py-10 text-center flex flex-col items-center justify-center h-full">
                    <CheckCircle2 className="h-8 w-8 text-muted-foreground/30 mb-2" />
                    <p className="text-sm font-medium text-foreground">All caught up</p>
                    <p className="text-xs text-muted-foreground mt-0.5">No pending requests to review.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Calibration Due */}
        <Card className="lg:col-span-1 overflow-hidden flex flex-col">
          <CardHeader className="pb-3 pt-5 px-5 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
                Calibration Due
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md text-muted-foreground hover:text-foreground" asChild>
                <Link href="/equipment"><MoreHorizontal className="h-4 w-4" /></Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-1">
            <div className="space-y-1">
              {calibrationDue.slice(0, 4).map((eq) => {
                const ref = now ?? new Date("2026-02-13")
                const daysUntil = Math.ceil(
                  (new Date(eq.nextCalibration).getTime() - ref.getTime()) / (1000 * 60 * 60 * 24)
                )
                const isOverdue = daysUntil < 0
                const isSoon = daysUntil <= 30
                return (
                  <div key={eq.id} className="flex items-center gap-3 p-2.5 hover:bg-muted rounded-md transition-colors cursor-pointer">
                    <div className={`h-8 w-8 rounded-md flex items-center justify-center ${isOverdue ? "bg-destructive/10 text-destructive" : isSoon ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>
                        <Wrench className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-foreground">{eq.name}</p>
                      <p className="text-xs text-muted-foreground">{eq.labName}</p>
                    </div>
                    <Badge variant="outline" className={`text-[10px] font-medium px-1.5 py-0 rounded ${isOverdue ? "text-destructive border-destructive/20" : isSoon ? "text-amber-600 border-amber-200" : "text-emerald-600 border-emerald-200"}`}>
                      {isOverdue ? `${Math.abs(daysUntil)}d overdue` : `${daysUntil}d left`}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card className="mt-4 overflow-hidden">
        <CardHeader className="pb-3 pt-5 px-5 border-b border-border">
          <CardTitle className="text-sm font-medium text-foreground">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[280px]">
            <div className="divide-y divide-border">
              {recentActivities.map((activity) => {
                const ref = now ?? new Date("2026-02-13")
                const timeAgo = getRelativeTime(activity.timestamp, ref)
                return (
                  <div key={activity.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-muted/50 transition-colors">
                    <Avatar className="h-7 w-7 border border-border rounded-full mt-0.5">
                      <AvatarImage src={activity.userAvatar} />
                      <AvatarFallback className="bg-muted text-muted-foreground font-medium text-[10px]">
                        {activity.userName.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-foreground leading-relaxed">
                        <span className="font-medium">{activity.userName}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>{" "}
                        <span className="font-medium text-foreground">{activity.resource}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{timeAgo}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

function getRelativeTime(timestamp: string, ref: Date) {
  const date = new Date(timestamp)
  const diff = ref.getTime() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins} min${mins !== 1 ? "s" : ""} ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days !== 1 ? "s" : ""} ago`
}
