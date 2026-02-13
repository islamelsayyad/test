"use client"

import React, { useState } from "react"
import { Plus, Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight, MoreHorizontal, Wrench } from "lucide-react"
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

const hours = Array.from({ length: 13 }, (_, i) => i + 8)

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
    <div className="flex-1 overflow-auto p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Operations Schedule</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Master planning board for classes, maintenance, and facility usage.
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)} className="h-9 px-3.5 text-sm font-medium bg-foreground text-background hover:bg-foreground/90">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            New Block
        </Button>
      </div>

      <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center justify-between">
          <div className="flex items-center gap-1 bg-card rounded-md border border-border p-0.5 w-fit">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md text-muted-foreground hover:text-foreground"><ChevronLeft className="h-4 w-4" /></Button>
              <span className="px-3 text-sm font-medium text-foreground">Feb 8 - Feb 14, 2026</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md text-muted-foreground hover:text-foreground"><ChevronRight className="h-4 w-4" /></Button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
              <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v as "calendar" | "list")}>
                  <ToggleGroupItem value="calendar" className="h-9 px-3 text-sm rounded-md">Week</ToggleGroupItem>
                  <ToggleGroupItem value="day" className="h-9 px-3 text-sm rounded-md">Day</ToggleGroupItem>
                  <ToggleGroupItem value="list" className="h-9 px-3 text-sm rounded-md">List</ToggleGroupItem>
              </ToggleGroup>

              <Select defaultValue="all">
                  <SelectTrigger className="h-9 px-3 min-w-[130px] text-sm"><SelectValue placeholder="All Labs" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All Labs</SelectItem></SelectContent>
              </Select>
              <Select defaultValue="all">
                  <SelectTrigger className="h-9 px-3 min-w-[130px] text-sm"><SelectValue placeholder="All Types" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All Types</SelectItem></SelectContent>
              </Select>
          </div>
      </div>

      {viewMode === "list" ? (
        <div className="border border-border rounded-lg overflow-hidden">
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[100px] pl-5 h-10 text-xs font-medium text-muted-foreground">Status</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Date & Time</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">User / Group</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Purpose</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Facility</TableHead>
                    <TableHead className="text-right pr-5 h-10 text-xs font-medium text-muted-foreground">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bookings.map((booking) => (
                    <TableRow key={booking.id} onClick={() => { setSelectedBooking(booking); setDetailOpen(true) }} className="cursor-pointer">
                        <TableCell className="pl-5 py-3">
                            <Badge variant="outline" className={`text-[11px] font-medium px-1.5 py-0 rounded ${
                                booking.status === 'approved' ? 'text-blue-600 border-blue-200 bg-blue-50' : 
                                booking.status === 'pending' ? 'text-amber-600 border-amber-200 bg-amber-50' :
                                booking.status === 'rejected' ? 'text-destructive border-destructive/20 bg-destructive/5' :
                                'text-muted-foreground'
                            }`}>
                                {booking.status === 'approved' ? 'Session' : booking.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-col">
                                <span className="text-sm text-foreground">{new Date(booking.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                                <span className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1"><Clock className="h-3 w-3" /> {booking.startTime} - {booking.endTime}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2.5">
                                <div className="h-7 w-7 rounded-md bg-muted flex items-center justify-center text-muted-foreground font-medium text-[10px]">
                                    {booking.userName.charAt(0)}
                                </div>
                                <div>
                                    <span className="text-sm text-foreground">{booking.userName}</span>
                                    {booking.groupName && <span className="block text-xs text-muted-foreground">{booking.groupName}</span>}
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm text-foreground line-clamp-1 max-w-[200px]">{booking.purpose}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {booking.labName}
                            </span>
                        </TableCell>
                        <TableCell className="text-right pr-5">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground rounded-md">
                                <MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
      ) : (
        <Card className="overflow-hidden">
          <CardContent className="overflow-x-auto p-0">
            <div className="min-w-[900px]">
              {/* Header */}
              <div className="grid grid-cols-[56px_repeat(7,1fr)] bg-card border-b border-border sticky top-0 z-10">
                <div className="p-3 flex items-center justify-center border-r border-border text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                </div>
                {weekDates.map((date) => {
                  const d = new Date(date + "T12:00:00")
                  const isToday = date === "2026-02-13" 
                  return (
                    <div key={date} className={`p-3 text-center border-r border-border last:border-r-0 ${isToday ? "bg-blue-50/50" : ""}`}>
                      <div className={`text-[11px] uppercase tracking-wider mb-0.5 ${isToday ? "text-blue-600 font-medium" : "text-muted-foreground"}`}>{d.toLocaleDateString("en-US", { weekday: "short" })}</div>
                      <div className={`text-lg font-semibold ${isToday ? "text-blue-600" : "text-foreground"}`}>{d.getDate()}</div>
                    </div>
                  )
                })}
              </div>

              {/* Grid */}
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-[56px_repeat(7,1fr)] h-16 border-b border-border last:border-b-0">
                  <div className="p-1.5 text-[10px] text-muted-foreground border-r border-border text-center relative">
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-card px-1 text-[10px]">{hour}:00</span>
                  </div>
                  
                  {weekDates.map((date) => {
                    const isToday = date === "2026-02-13"
                    const slotBookings = bookings.filter((b) => {
                      if (b.date !== date) return false
                      const startHour = parseInt(b.startTime.split(":")[0])
                      const endHour = parseInt(b.endTime.split(":")[0])
                      return hour >= startHour && hour < endHour
                    })
                    
                    return (
                      <div key={date} className={`relative border-r border-border last:border-r-0 p-0.5 hover:bg-muted/30 transition-colors ${isToday ? "bg-blue-50/20" : ""}`}>
                        {slotBookings.map((booking) => {
                          const startHour = parseInt(booking.startTime.split(":")[0])
                          if (startHour !== hour) return null 
                          
                          const duration = parseInt(booking.endTime.split(":")[0]) - startHour
                          const height = duration * 64 - 4
                          
                          const isPending = booking.status === 'pending'
                          const isRejected = booking.status === 'rejected'

                          return (
                            <button
                              key={booking.id}
                              className={`absolute top-0.5 left-0.5 right-0.5 rounded-md p-2 text-left z-10 transition-colors flex flex-col overflow-hidden border-l-[3px] text-xs ${
                                isRejected ? "bg-destructive/5 border-destructive/40 text-destructive hover:bg-destructive/10" :
                                isPending ? "bg-amber-50 border-amber-400 text-amber-800 hover:bg-amber-100" :
                                "bg-blue-50 border-blue-500 text-blue-800 hover:bg-blue-100"
                              }`}
                              style={{ height: `${height}px` }}
                              onClick={() => { setSelectedBooking(booking); setDetailOpen(true) }}
                            >
                              <span className="font-medium leading-tight line-clamp-2">{booking.purpose}</span>
                              <span className="mt-auto text-[10px] opacity-70 flex items-center gap-1 truncate">
                                  <MapPin className="h-2.5 w-2.5" />
                                  {booking.labName}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              ))}
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
