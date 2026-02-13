
"use client"

import React, { useState, useEffect } from "react"
import { Users, FlaskConical, Calendar, AlertTriangle, TrendingUp, TrendingDown, Plus, ArrowRight, Clock, CheckCircle2, LayoutDashboard, MoreHorizontal, Wrench } from "lucide-react"
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
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    title: "Active Labs",
    value: dashboardStats.activeLabs,
    subtitle: "Operational facilities",
    trend: dashboardStats.labsTrend,
    icon: FlaskConical,
    href: "/labs",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
  {
    title: "Scheduled Sessions",
    value: dashboardStats.scheduledSessions,
    subtitle: "Upcoming today",
    trend: dashboardStats.sessionsTrend,
    icon: Calendar,
    href: "/scheduling",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    title: "Equipment Alerts",
    value: dashboardStats.equipmentAlerts,
    subtitle: "Attention needed",
    trend: dashboardStats.alertsTrend,
    icon: AlertTriangle,
    href: "/equipment",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
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
    <div className="flex-1 overflow-auto p-6 lg:p-10 bg-[#F8FAFC]">
      {/* Greeting Section */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-in fade-in slide-in-from-top-4 duration-500">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 ring-4 ring-indigo-50">
                <LayoutDashboard className="h-5 w-5" />
             </div>
             <h1 className="text-3xl font-black tracking-tight text-slate-900">Dashboard</h1>
          </div>
          <div className="ml-14 flex flex-col">
            <p className="text-slate-500 font-medium text-base">
                {greeting}, <span className="text-slate-900 font-bold">{currentUser.firstName}</span>.
            </p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button size="sm" asChild className="rounded-xl shadow-lg shadow-indigo-900/10 bg-slate-900 hover:bg-slate-800 h-11 px-5 font-bold text-sm transition-all hover:scale-105 active:scale-95 border border-transparent">
            <Link href="/labs">
              <Plus className="mr-2 h-4 w-4" />
              New Lab
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild className="rounded-xl h-11 px-5 font-bold text-sm hover:bg-white hover:text-indigo-600 hover:shadow-md transition-all bg-white text-slate-600 border-2 border-slate-100 hover:border-indigo-100">
            <Link href="/equipment">
              <Plus className="mr-2 h-4 w-4" />
              Add Asset
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi, i) => (
          <Link href={kpi.href} key={kpi.title}>
            <div className={`group relative bg-white p-6 rounded-[2rem] border-2 border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 hover:-translate-y-1 overflow-hidden h-full animate-in fade-in slide-in-from-bottom-4 fill-mode-both`} style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex justify-between items-start mb-6 relative z-10">
                 <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${kpi.bg} ${kpi.color} border ${kpi.border} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <kpi.icon className="h-7 w-7" />
                 </div>
                 <Badge variant="outline" className={`font-black px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wide border-2 ${kpi.trend > 0 ? "bg-emerald-50 text-emerald-700 border-emerald-100" : kpi.trend < 0 ? "bg-rose-50 text-rose-700 border-rose-100" : "bg-slate-50 text-slate-600 border-slate-100"}`}>
                    {kpi.trend > 0 ? <TrendingUp className="mr-1 h-3 w-3" /> : kpi.trend < 0 ? <TrendingDown className="mr-1 h-3 w-3" /> : null}
                    {Math.abs(kpi.trend)}%
                 </Badge>
              </div>
              <div className="relative z-10">
                 <div className="text-4xl font-black text-slate-900 tracking-tighter mb-1">{kpi.value}</div>
                 <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{kpi.title}</div>
              </div>
              {/* Decorative background element */}
              <div className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-[0.03] ${kpi.color.replace('text-', 'bg-')} blur-3xl group-hover:opacity-[0.08] transition-opacity duration-500`} />
            </div>
          </Link>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Today's Sessions - Hero Card Style */}
        <Card className="lg:col-span-1 rounded-[2rem] border-0 shadow-2xl shadow-indigo-900/20 overflow-hidden flex flex-col bg-slate-900 text-white relative group h-full">
          {/* Abstract BG */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-40 group-hover:opacity-50 transition-opacity duration-700" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-30 group-hover:opacity-40 transition-opacity duration-700" />
          
          <div className="p-8 relative z-10 h-full flex flex-col">
             <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-3xl font-black tracking-tight leading-none mb-4">Today{"'"}s<br/>Sessions</h3>
                    <div className="inline-flex items-center bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/5 shadow-inner">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
                        <span className="text-slate-200 text-xs font-bold">{todaySessions.length} events scheduled</span>
                    </div>
                </div>
                <Link href="/scheduling" className="h-12 w-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl transition-all border border-white/10 hover:scale-110 active:scale-95 shadow-lg group/btn">
                    <ArrowRight className="h-6 w-6 text-white group-hover/btn:-rotate-45 transition-transform duration-300" />
                </Link>
             </div>

             <div className="space-y-3 flex-1">
                {todaySessions.slice(0, 3).map((session) => (
                    <div key={session.id} className="flex items-center gap-4 p-3.5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all backdrop-blur-sm group/item shadow-sm">
                        <div className="flex flex-col items-center justify-center w-12 h-12 bg-white text-slate-900 rounded-xl shrink-0 font-bold leading-none shadow-lg border-2 border-transparent group-hover/item:border-indigo-200/50 transition-colors">
                            <span className="text-[9px] font-black uppercase text-slate-400 mb-0.5 tracking-wide">{new Date(session.date).toLocaleDateString("en-US", { month: "short" })}</span>
                            <span className="text-lg font-black">{new Date(session.date).getDate()}</span>
                        </div>
                        <div className="min-w-0">
                            <p className="font-bold text-sm truncate text-white group-hover/item:text-indigo-200 transition-colors">{session.purpose}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1 flex items-center gap-1.5">
                                <Clock className="h-3 w-3 text-indigo-300" /> {session.startTime}
                            </p>
                        </div>
                    </div>
                ))}
                {todaySessions.length === 0 && (
                    <div className="h-full flex items-center justify-center py-8 text-center text-slate-400 font-medium bg-white/5 rounded-3xl border border-white/5 border-dashed">
                        No sessions scheduled today
                    </div>
                )}
             </div>
          </div>
        </Card>

        {/* Pending Bookings - List Style */}
        <Card className="lg:col-span-1 rounded-[2rem] border-2 border-slate-100 shadow-sm overflow-hidden flex flex-col bg-white">
          <CardHeader className="pb-4 pt-8 px-8 border-b-2 border-slate-50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-black text-slate-900 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm">
                    <Clock className="h-5 w-5" /> 
                </div>
                Pending
                {pendingBookings.length > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-blue-600 text-[10px] font-bold text-white px-1.5 shadow-sm shadow-blue-200">
                    {pendingBookings.length}
                  </span>
                )}
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" asChild>
                <Link href="/scheduling"><MoreHorizontal className="h-5 w-5" /></Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 flex-1 bg-white">
            <div className="space-y-3">
              {pendingBookings.slice(0, 4).map((booking) => (
                <div key={booking.id} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors border-2 border-transparent hover:border-slate-100 group cursor-pointer">
                  <Avatar className="h-10 w-10 border-2 border-white shadow-sm ring-2 ring-slate-100 group-hover:ring-blue-100 transition-all rounded-xl">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-[10px] rounded-xl">
                      {booking.userName.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{booking.userName}</p>
                    <p className="truncate text-xs text-slate-500 font-bold mt-0.5">
                      {booking.labName}
                    </p>
                  </div>
                  <div className="text-right">
                     <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">{new Date(booking.date).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</span>
                     <Badge variant="outline" className="mt-1 border-blue-100 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border-2">Review</Badge>
                  </div>
                </div>
              ))}
              {pendingBookings.length === 0 && (
                <div className="py-12 text-center flex flex-col items-center justify-center h-full">
                    <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-slate-300 border-2 border-slate-100">
                        <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <p className="text-sm font-bold text-slate-900">All caught up!</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">No pending requests to review.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Calibration Due - Alert Style */}
        <Card className="lg:col-span-1 rounded-[2rem] border-2 border-slate-100 shadow-sm overflow-hidden flex flex-col bg-white">
          <CardHeader className="pb-4 pt-8 px-8 border-b-2 border-slate-50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-black text-slate-900 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100 shadow-sm">
                    <AlertTriangle className="h-5 w-5" /> 
                </div>
                Calibration
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors" asChild>
                <Link href="/equipment"><MoreHorizontal className="h-5 w-5" /></Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 flex-1 bg-white">
            <div className="space-y-3">
              {calibrationDue.slice(0, 4).map((eq) => {
                const ref = now ?? new Date("2026-02-13")
                const daysUntil = Math.ceil(
                  (new Date(eq.nextCalibration).getTime() - ref.getTime()) / (1000 * 60 * 60 * 24)
                )
                const isOverdue = daysUntil < 0
                const isSoon = daysUntil <= 30
                return (
                  <div key={eq.id} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors border-2 border-transparent hover:border-slate-100 group cursor-pointer">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center border-2 shadow-sm group-hover:scale-105 transition-transform ${isOverdue ? "bg-rose-50 border-rose-100 text-rose-600" : isSoon ? "bg-amber-50 border-amber-100 text-amber-600" : "bg-emerald-50 border-emerald-100 text-emerald-600"}`}>
                        <Wrench className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">{eq.name}</p>
                      <p className="text-xs text-slate-500 font-bold mt-0.5">{eq.labName}</p>
                    </div>
                    <Badge variant="outline" className={`font-black px-2 py-0.5 rounded-md text-[9px] uppercase tracking-wide border-2 ${isOverdue ? "bg-rose-50 text-rose-700 border-rose-200" : isSoon ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
                      {isOverdue ? `${Math.abs(daysUntil)}d Overdue` : `${daysUntil}d Left`}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card className="mt-6 rounded-[2rem] border-2 border-slate-100 shadow-sm overflow-hidden bg-white">
        <CardHeader className="pb-4 pt-8 px-8 border-b-2 border-slate-50">
          <CardTitle className="text-lg font-black text-slate-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[280px]">
            <div className="divide-y-2 divide-slate-50 relative">
                {/* Continuous Line visual */}
               <div className="absolute top-0 bottom-0 left-[41px] w-[2px] bg-slate-100 z-0 hidden sm:block" />

              {recentActivities.map((activity, index) => {
                const ref = now ?? new Date("2026-02-13")
                const timeAgo = getRelativeTime(activity.timestamp, ref)
                return (
                  <div key={activity.id} className="flex items-start gap-5 p-6 hover:bg-slate-50/80 transition-colors group relative z-10">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm ring-2 ring-slate-100 rounded-xl group-hover:scale-105 transition-transform bg-white z-10">
                      <AvatarImage src={activity.userAvatar} />
                      <AvatarFallback className="bg-slate-100 text-slate-600 font-bold text-xs rounded-xl">
                        {activity.userName.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="text-sm text-slate-900 leading-relaxed">
                        <span className="font-bold hover:text-indigo-600 cursor-pointer transition-colors">{activity.userName}</span>{" "}
                        <span className="text-slate-500 font-medium">{activity.action}</span>{" "}
                        <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100 hover:bg-indigo-100 transition-colors cursor-pointer inline-block mt-1 sm:mt-0 text-xs shadow-sm">{activity.resource}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Clock className="h-3 w-3 text-slate-300" />
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{timeAgo}</p>
                      </div>
                    </div>
                    <div className="h-9 w-9 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400 group-hover:bg-white group-hover:shadow-sm transition-all group-hover:text-indigo-500 group-hover:border-indigo-100">
                        {activity.type === 'booking' ? <Calendar className="h-4 w-4" /> : activity.type === 'equipment' ? <FlaskConical className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
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
