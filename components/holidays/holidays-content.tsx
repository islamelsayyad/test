
"use client"

import React, { useState } from "react"
import { Plus, Calendar as CalendarIcon, Repeat, Pencil, Trash2, MapPin, Sparkles, Wrench, Clock, Palmtree } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { holidays as allHolidays, labs } from "@/lib/mock-data"
import type { Holiday } from "@/lib/types"
import { HolidayFormDialog } from "./holiday-form-dialog"

const typeConfig: Record<string, { color: string; icon: any; label: string }> = {
  public: { color: "bg-indigo-50 text-indigo-700 border-indigo-100", icon: CalendarIcon, label: "Public Holiday" },
  maintenance: { color: "bg-amber-50 text-amber-700 border-amber-100", icon: Wrench, label: "Maintenance" },
  special: { color: "bg-purple-50 text-purple-700 border-purple-100", icon: Sparkles, label: "Special Event" },
}

export function HolidaysContent() {
  const [holidaysList, setHolidaysList] = useState<Holiday[]>(allHolidays)
  const [formOpen, setFormOpen] = useState(false)
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null)

  const handleCreate = (holiday: Holiday) => {
    setHolidaysList((prev) => [...prev, holiday])
    setFormOpen(false)
  }

  const handleUpdate = (updated: Holiday) => {
    setHolidaysList((prev) => prev.map((h) => (h.id === updated.id ? updated : h)))
    setEditingHoliday(null)
    setFormOpen(false)
  }

  const handleDelete = (id: string) => {
    setHolidaysList((prev) => prev.filter((h) => h.id !== id))
  }

  const sortedHolidays = [...holidaysList].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-8 bg-[#F8FAFC]">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 shadow-sm border border-green-200/50">
                <Palmtree className="h-6 w-6" />
             </div>
             <h1 className="text-3xl font-black tracking-tight text-slate-900">Holidays & Closures</h1>
          </div>
          <p className="text-slate-500 font-medium ml-14">
            Manage lab closure dates and maintenance windows.
          </p>
        </div>
        <Button onClick={() => { setEditingHoliday(null); setFormOpen(true) }} className="h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20 font-bold px-6 transition-all hover:scale-105 active:scale-95 border-2 border-transparent">
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="grid gap-6 max-w-5xl mx-auto lg:mx-0">
        {sortedHolidays.map((holiday) => {
          const startDate = new Date(holiday.startDate + "T12:00:00")
          const endDate = new Date(holiday.endDate + "T12:00:00")
          const isSingleDay = holiday.startDate === holiday.endDate
          const affectedLabNames = holiday.affectedLabs.includes("all")
            ? "All Facilities"
            : holiday.affectedLabs.map((id) => labs.find((l) => l.id === id)?.name || id).join(", ")
          
          const config = typeConfig[holiday.type] || typeConfig.public

          return (
            <div key={holiday.id} className="group relative flex flex-col sm:flex-row bg-white rounded-[2.5rem] border-2 border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all hover:-translate-y-1 overflow-hidden">
                
                {/* Date Ticket Stub - The visual hook */}
                <div className="flex-shrink-0 w-full sm:w-40 bg-slate-50 border-b-2 sm:border-b-0 sm:border-r-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-6 text-center group-hover:bg-slate-100/50 transition-colors relative">
                   {/* Punch hole visuals - Improved */}
                   <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-[#F8FAFC] shadow-[inset_-1px_0_2px_rgba(0,0,0,0.05)] hidden sm:block" />
                   <div className="absolute -right-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white shadow-[inset_1px_0_2px_rgba(0,0,0,0.05)] hidden sm:block" />

                   <span className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
                      {startDate.toLocaleDateString("en-US", { month: "long" })}
                   </span>
                   <span className="text-6xl font-black text-slate-900 leading-none tracking-tighter">
                      {startDate.getDate()}
                   </span>
                   <span className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-wide bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
                      {startDate.toLocaleDateString("en-US", { weekday: "long" })}
                   </span>
                </div>

                <div className="flex-1 p-8 flex flex-col justify-center relative">
                  <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" onClick={() => { setEditingHoliday(holiday); setFormOpen(true) }}>
                        <Pencil className="h-4 w-4" />
                     </Button>
                     <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(holiday.id)}>
                        <Trash2 className="h-4 w-4" />
                     </Button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Badge variant="outline" className={`${config.color} border-2 text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg`}>
                        <config.icon className="mr-1.5 h-3 w-3" />
                        {config.label}
                    </Badge>
                    {holiday.recurring && (
                      <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-bold text-[10px] rounded-lg border-2 border-slate-200">
                        <Repeat className="mr-1 h-3 w-3" /> Yearly
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-700 transition-colors pr-12 tracking-tight">{holiday.name}</h3>
                  
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm font-bold text-slate-500">
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <Clock className="h-4 w-4 text-indigo-400" />
                      {isSingleDay
                        ? "Full Day Event"
                        : `${startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {affectedLabNames}
                    </div>
                  </div>
                  
                  {holiday.description && (
                    <p className="text-xs text-slate-400 mt-5 font-medium leading-relaxed max-w-xl border-t border-slate-50 pt-4">{holiday.description}</p>
                  )}
                </div>
            </div>
          )
        })}
        {sortedHolidays.length === 0 && (
          <div className="py-24 text-center rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white/50">
             <div className="h-20 w-20 bg-slate-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-slate-300 transform rotate-3">
                <CalendarIcon className="h-10 w-10" />
             </div>
             <p className="text-slate-900 font-black text-xl">No events scheduled</p>
             <p className="text-slate-500 text-sm font-medium mt-2 max-w-xs mx-auto">Add holidays or maintenance windows to automatically block lab bookings during those periods.</p>
          </div>
        )}
      </div>

      <HolidayFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        holiday={editingHoliday}
        onSubmit={editingHoliday ? handleUpdate : handleCreate}
      />
    </div>
  )
}
