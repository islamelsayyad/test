
"use client"

import React, { useState } from "react"
import { Plus, Calendar as CalendarIcon, List, Clock, MapPin, ChevronLeft, ChevronRight, MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { bookingRequests as allBookings } from "@/lib/mock-data"
import type { BookingRequest } from "@/lib/types"
import { BookingFormDialog } from "./booking-form-dialog"
import { BookingDetailDialog } from "./booking-detail-dialog"

const hours = Array.from({ length: 13 }, (_, i) => i + 8) // 8 AM to 8 PM

export function SchedulingContent() {
  const [bookings, setBookings] = useState<BookingRequest[]>(allBookings)
  const [formOpen, setFormOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar")

  const handleApprove = (id: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "approved" as const } : b)))
    setDetailOpen(false)
  }

  const handleReject = (id: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "rejected" as const, reason: "Rejected by admin" } : b)))
    setDetailOpen(false)
  }

  const handleCreate = (booking: BookingRequest) => {
    setBookings((prev) => [...prev, booking])
    setFormOpen(false)
  }

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date("2026-02-13") 
    d.setDate(d.getDate() + (i - 2)) 
    return d.toISOString().split("T")[0]
  })

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-8 bg-[#F8FAFC]">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <div className="h-10 w-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 shadow-sm border border-violet-200/50">
                <CalendarIcon className="h-6 w-6" />
             </div>
             <h1 className="text-3xl font-black tracking-tight text-slate-900">Operations Schedule</h1>
          </div>
          <p className="text-slate-500 font-medium ml-14">
            Master planning board for classes, maintenance, and facility usage.
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)} className="h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-xl shadow-slate-900/20 px-6 transition-all hover:scale-105 active:scale-95 border-2 border-transparent">
            <Plus className="mr-2 h-4 w-4" />
            New Block
        </Button>
      </div>

      {/* Glassy Toolbar */}
      <div className="sticky top-0 z-20 mb-6 py-3 bg-[#F8FAFC]/95 backdrop-blur-md">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center justify-between">
            {/* Date Nav */}
            <div className="flex items-center gap-2 bg-white rounded-2xl p-1 shadow-sm w-fit ring-1 ring-slate-100 border-2 border-slate-200">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all border-none"><ChevronLeft className="h-5 w-5" /></Button>
                <div className="px-4 text-center">
                    <span className="text-sm font-black text-slate-900 leading-none">Feb 8 - Feb 14, 2026</span>
                </div>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all border-none"><ChevronRight className="h-5 w-5" /></Button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v as "calendar" | "list")} className="bg-white rounded-2xl p-1 shadow-sm ring-1 ring-slate-100 border-2 border-slate-200">
                    <ToggleGroupItem value="calendar" aria-label="Calendar view" className="text-xs font-bold px-4 py-2 h-10 rounded-xl data-[state=on]:bg-slate-100 data-[state=on]:text-slate-900 border-none transition-all">WEEK</ToggleGroupItem>
                    <ToggleGroupItem value="day" aria-label="Day view" className="text-xs font-bold px-4 py-2 h-10 rounded-xl data-[state=on]:bg-slate-100 data-[state=on]:text-slate-900 border-none transition-all">DAY</ToggleGroupItem>
                    <ToggleGroupItem value="list" aria-label="List view" className="text-xs font-bold px-4 py-2 h-10 rounded-xl data-[state=on]:bg-slate-100 data-[state=on]:text-slate-900 border-none transition-all">LIST</ToggleGroupItem>
                </ToggleGroup>

                <Select defaultValue="all">
                    <SelectTrigger className="h-12 px-4 min-w-[140px] border-2 border-slate-200 bg-white shadow-sm rounded-xl font-bold text-slate-700 text-xs transition-all hover:border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"><SelectValue placeholder="All Labs" /></SelectTrigger>
                    <SelectContent className="rounded-xl border-2 border-slate-100 shadow-xl"><SelectItem value="all" className="font-bold">Facility: All Labs</SelectItem></SelectContent>
                </Select>
                <Select defaultValue="all">
                    <SelectTrigger className="h-12 px-4 min-w-[140px] border-2 border-slate-200 bg-white shadow-sm rounded-xl font-bold text-slate-700 text-xs transition-all hover:border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"><SelectValue placeholder="All Types" /></SelectTrigger>
                    <SelectContent className="rounded-xl border-2 border-slate-100 shadow-xl"><SelectItem value="all" className="font-bold">Event Type: All</SelectItem></SelectContent>
                </Select>
            </div>
        </div>
      </div>

      {viewMode === "list" ? (
        <Table>
            <TableHeader>
                <TableRow className="border-b-2 border-slate-100 hover:bg-transparent">
                    <TableHead className="w-[120px] pl-8 h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">
                        Status
                    </TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Date & Time</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">User / Group</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Purpose</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Facility</TableHead>
                    <TableHead className="text-right pr-8 h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bookings.map((booking) => (
                    <TableRow key={booking.id} onClick={() => { setSelectedBooking(booking); setDetailOpen(true) }} className="cursor-pointer group hover:bg-slate-50 border-b-2 border-slate-50 last:border-0">
                        <TableCell className="pl-8 py-4">
                            <Badge className={`rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-none border-2 ${
                                booking.status === 'approved' ? 'bg-blue-600 text-white border-blue-600' : 
                                booking.status === 'pending' ? 'bg-amber-100 text-amber-700 border-amber-100' :
                                booking.status === 'rejected' ? 'bg-red-100 text-red-700 border-red-100' :
                                'bg-slate-100 text-slate-500 border-slate-100'
                            }`}>
                                {booking.status === 'approved' ? 'Session' : booking.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-900">{new Date(booking.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                                <span className="text-[10px] font-medium text-slate-500 mt-0.5 flex items-center gap-1"><Clock className="h-3 w-3" /> {booking.startTime} - {booking.endTime}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-[10px] border border-slate-200 shadow-sm">
                                    {booking.userName.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-slate-700">{booking.userName}</span>
                                    {booking.groupName && <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">{booking.groupName}</span>}
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <span className="text-xs font-bold text-slate-600 line-clamp-1 max-w-[200px]">{booking.purpose}</span>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                {booking.labName}
                            </div>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      ) : (
        <Card className="rounded-[2.5rem] border-2 border-slate-200 shadow-sm overflow-hidden bg-white ring-4 ring-slate-50/50">
          <CardContent className="overflow-x-auto p-0 scrollbar-hide">
            <div className="min-w-[1000px]">
              {/* Header */}
              <div className="grid grid-cols-[60px_repeat(7,1fr)] bg-white border-b-2 border-slate-100 sticky top-0 z-10 shadow-sm">
                <div className="p-4 text-[10px] font-bold text-slate-400 text-center flex items-center justify-center border-r border-slate-50 bg-slate-50/50">
                    <Clock className="h-4 w-4" />
                </div>
                {weekDates.map((date) => {
                  const d = new Date(date + "T12:00:00")
                  const isToday = date === "2026-02-13" 
                  return (
                    <div key={date} className={`p-4 text-center border-r border-slate-50 last:border-r-0 relative group ${isToday ? "bg-violet-50/30" : "bg-white"}`}>
                      <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isToday ? "text-violet-600" : "text-slate-400"}`}>{d.toLocaleDateString("en-US", { weekday: "short" })}</div>
                      <div className={`text-xl font-black ${isToday ? "text-violet-600" : "text-slate-900"}`}>{d.getDate()}</div>
                      {isToday && <div className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />}
                    </div>
                  )
                })}
              </div>

              {/* Grid */}
              <div className="bg-[linear-gradient(to_right,rgba(241,245,249,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(241,245,249,0.6)_1px,transparent_1px)] bg-[size:100%_80px]">
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-[60px_repeat(7,1fr)] h-20 group">
                  {/* Time Label */}
                  <div className="p-2 text-[10px] font-bold text-slate-400 border-r border-slate-50 text-center relative bg-white/50 backdrop-blur-[1px]">
                    <span className="-top-2.5 absolute left-1/2 -translate-x-1/2 bg-white px-1.5 py-0.5 rounded-md border border-slate-100 shadow-sm z-20">{hour}:00</span>
                  </div>
                  
                  {weekDates.map((date, idx) => {
                    const isToday = date === "2026-02-13"
                    const slotBookings = bookings.filter((b) => {
                      if (b.date !== date) return false
                      const startHour = parseInt(b.startTime.split(":")[0])
                      const endHour = parseInt(b.endTime.split(":")[0])
                      return hour >= startHour && hour < endHour
                    })
                    
                    return (
                      <div key={date} className={`relative border-r border-slate-50 last:border-r-0 p-1 transition-colors hover:bg-slate-50/50 ${isToday ? "bg-violet-50/10" : ""}`}>
                        {slotBookings.map((booking) => {
                          const startHour = parseInt(booking.startTime.split(":")[0])
                          if (startHour !== hour) return null 
                          
                          const duration = parseInt(booking.endTime.split(":")[0]) - startHour
                          const height = duration * 80 - 6 // minus padding/margin
                          
                          // Refined Event Styles
                          const isExam = booking.purpose.toLowerCase().includes('exam') || booking.purpose.toLowerCase().includes('test');
                          const isMaint = booking.status === 'pending' || booking.purpose.toLowerCase().includes('maintenance');
                          const isPrivate = booking.purpose.toLowerCase().includes('private') || booking.purpose.toLowerCase().includes('thesis');
                          
                          let cardClasses = "bg-indigo-50/90 border-l-[4px] border-indigo-500 text-indigo-900 hover:bg-indigo-100 hover:shadow-xl hover:shadow-indigo-200/40";
                          if(isExam) cardClasses = "bg-rose-50/90 border-l-[4px] border-rose-500 text-rose-900 hover:bg-rose-100 hover:shadow-xl hover:shadow-rose-200/40";
                          if(isMaint) cardClasses = "bg-amber-50/90 border-l-[4px] border-amber-500 text-amber-900 hover:bg-amber-100 hover:shadow-xl hover:shadow-amber-200/40 pattern-diagonal-lines";
                          if(isPrivate) cardClasses = "bg-slate-100/90 border-l-[4px] border-slate-500 text-slate-900 hover:bg-slate-200 hover:shadow-xl hover:shadow-slate-200/40";

                          return (
                            <button
                              key={booking.id}
                              className={`absolute top-0.5 left-1 right-1 rounded-xl p-3 text-left z-10 transition-all flex flex-col overflow-hidden backdrop-blur-sm ${cardClasses} group/evt shadow-sm border-t border-r border-b border-black/5 animate-in zoom-in-95 duration-300`}
                              style={{ height: `${height}px` }}
                              onClick={() => { setSelectedBooking(booking); setDetailOpen(true) }}
                            >
                              <div className="font-bold text-[11px] leading-tight line-clamp-2">{booking.purpose}</div>
                              
                              <div className="mt-auto pt-1 flex items-center gap-1.5 text-[10px] font-bold opacity-70 uppercase tracking-wide group-hover/evt:opacity-100 transition-opacity">
                                  {isMaint ? <Wrench className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                                  <span className="truncate">{booking.labName}</span>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <BookingFormDialog open={formOpen} onOpenChange={setFormOpen} onSubmit={handleCreate} />
      <BookingDetailDialog
        booking={selectedBooking}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  )
}

function Wrench(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    )
  }
